import { useEffect, useRef, useState } from "react";

/**
 * Preloader cinematográfico: partículas nascem dispersas no escuro e coalescem
 * no monograma KR (amostrado de /particles/particle_kr.png) enquanto um contador
 * 000→100 sobe no canto. Some e libera o hero. Clique pula; respeita prefers-reduced-motion.
 */
export function Preloader() {
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W = 0;
    let H = 0;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // alvos: pontos amostrados do MONOGRAMA KR (símbolo de abertura)
    const cx = W / 2;
    const cy = H / 2;
    const outer = Math.min(W, H) * 0.5; // raio de referência do brilho/figura
    const WOLF_POINTS = 1500;

    type P = { sx: number; sy: number; tx: number; ty: number; delay: number; sp: number };
    let parts: P[] = [];

    // Constrói parts[] a partir de uma lista de alvos (x,y na tela)
    const buildParts = (targets: { x: number; y: number }[]) => {
      parts = targets.map((t) => {
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.max(W, H) * (0.4 + Math.random() * 0.7);
        return {
          sx: cx + Math.cos(ang) * rad,
          sy: cy + Math.sin(ang) * rad,
          tx: t.x,
          ty: t.y,
          delay: Math.random() * 0.5,
          sp: 0.85 + Math.random() * 0.6,
        };
      });
    };

    // Amostra a forma por luminância (pixels claros = forma) e mapeia p/ tela
    const sampleWolf = (img: HTMLImageElement) => {
      const sw = 200;
      const sh = Math.max(1, Math.round((img.height / img.width) * sw));
      const oc = document.createElement("canvas");
      oc.width = sw;
      oc.height = sh;
      const octx = oc.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, sw, sh);
      const data = octx.getImageData(0, 0, sw, sh).data;
      const cand: number[] = [];
      for (let y = 0; y < sh; y++) {
        for (let x = 0; x < sw; x++) {
          const i = (y * sw + x) * 4;
          if ((data[i] + data[i + 1] + data[i + 2]) / 3 > 62) cand.push(x, y);
        }
      }
      // escala: símbolo ocupa ~50% do menor lado da viewport, centralizado
      const targetH = Math.min(W, H) * 0.5;
      const scale = targetH / sh;
      const targets: { x: number; y: number }[] = [];
      const n = cand.length / 2;
      for (let p = 0; p < WOLF_POINTS; p++) {
        if (n > 0) {
          const c = Math.floor(Math.random() * n) * 2;
          const ix = cand[c];
          const iy = cand[c + 1];
          targets.push({
            x: cx + (ix - sw / 2) * scale,
            y: cy + (iy - sh / 2) * scale,
          });
        } else {
          targets.push({ x: cx, y: cy });
        }
      }
      buildParts(targets);
    };

    const wolfImg = new Image();
    wolfImg.crossOrigin = "anonymous";
    wolfImg.onload = () => {
      sampleWolf(wolfImg);
      raf = requestAnimationFrame(frame);
    };
    wolfImg.onerror = () => finish();
    wolfImg.src = "/particles/particle_kr.png";

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

    const TRAVEL = 1.6;
    const HOLD_UNTIL = reduce ? 0.4 : 3.0;
    let raf = 0;
    let start = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      setFading(true);
      window.setTimeout(() => setDone(true), 720);
    };

    const frame = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1000;

      ctx.clearRect(0, 0, W, H);

      let formed = 0;
      for (const p of parts) {
        const local = Math.max(0, (t - p.delay) * p.sp);
        const prog = Math.min(1, local / TRAVEL);
        const e = easeOutCubic(prog);
        const x = p.sx + (p.tx - p.sx) * e;
        const y = p.sy + (p.ty - p.sy) * e;
        const alpha = 0.25 + 0.75 * e;
        const size = 1.5 - 0.4 * e;
        ctx.beginPath();
        ctx.fillStyle = `rgba(243, 241, 235, ${alpha})`;
        ctx.arc(x, y, Math.max(0.4, size), 0, Math.PI * 2);
        ctx.fill();
        formed += prog;
      }

      // brilho central sutil quando o símbolo se forma
      const formRatio = parts.length > 0 ? formed / parts.length : 0;
      if (formRatio > 0.4) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, outer * 1.6);
        const a = (formRatio - 0.4) * 0.18;
        g.addColorStop(0, `rgba(243, 241, 235, ${a})`);
        g.addColorStop(1, "rgba(243, 241, 235, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }

      // contador 000 → 100
      const cprog = reduce ? 1 : easeInOutSine(Math.min(1, t / (HOLD_UNTIL * 0.92)));
      const val = Math.round(cprog * 100);
      if (countRef.current) {
        countRef.current.textContent = String(val).padStart(3, "0");
      }

      if (t >= HOLD_UNTIL) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const skip = () => finish();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  // trava o scroll enquanto o preloader está ativo
  useEffect(() => {
    if (done) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [done]);

  if (done) return null;

  return (
    <div className={`preloader ${fading ? "is-fading" : ""}`} aria-hidden>
      <canvas ref={canvasRef} className="preloader__canvas" />
      <div className="preloader__meta">
        <span className="preloader__brand">dra. kéryda ramos</span>
        <span className="preloader__count">
          <span ref={countRef}>000</span>
          <i>%</i>
        </span>
      </div>
    </div>
  );
}

export default Preloader;
