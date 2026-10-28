import React, { useEffect, useRef, useState } from 'react';

export interface ScrollEngineState {
  progress: number;
  velocity: number;
  pointerX: number;
  pointerY: number;
  pointerActive: boolean;
  energy: number;
  light: number;
  cloudX: number;
  cloudY: number;
}

export const scrollState: ScrollEngineState = {
  progress: 0,
  velocity: 0,
  pointerX: 0,
  pointerY: 0,
  pointerActive: false,
  energy: 0,
  light: 0,
  cloudX: 2.2,
  cloudY: 0.1,
};

/* ==========================================================================
   2. WORD BLUR REVEAL ([data-words] / .word-reveal)
   ========================================================================== */

export const WordBlurText: React.FC<{
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}> = ({ text, className = '', as: Tag = 'p' }) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -6% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [text]);

  const words = text.trim().split(/\s+/);

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLParagraphElement & HTMLHeadingElement>}
      data-words
      className={className}
    >
      {words.map((word, idx) => (
        <React.Fragment key={`${word}-${idx}`}>
          <span
            className="word-reveal"
            style={{ transitionDelay: `${idx * 35}ms` }}
          >
            {word}
          </span>
          {idx < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Tag>
  );
};

/* ==========================================================================
   HELPERS PARA AMOSTRAGEM DO MONOGRAMA KR & GEOMETRIAS 3D
   ========================================================================== */

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function generateFallbackKRPoints(count: number, scale = 1): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.random();
    let x = 0;
    let y = 0;

    if (r < 0.16) {
      // K haste vertical esquerda
      x = -0.78 + (Math.random() - 0.5) * 0.11;
      y = (Math.random() - 0.5) * 1.5;
    } else if (r < 0.3) {
      // K diagonal superior
      const t = Math.random();
      x = -0.72 + t * 0.58 + (Math.random() - 0.5) * 0.08;
      y = -0.05 + t * 0.78 + (Math.random() - 0.5) * 0.08;
    } else if (r < 0.44) {
      // K diagonal inferior
      const t = Math.random();
      x = -0.68 + t * 0.62 + (Math.random() - 0.5) * 0.08;
      y = 0.02 - t * 0.78 + (Math.random() - 0.5) * 0.08;
    } else if (r < 0.6) {
      // R haste vertical
      x = 0.08 + (Math.random() - 0.5) * 0.11;
      y = (Math.random() - 0.5) * 1.5;
    } else if (r < 0.78) {
      // R bojo superior curvo
      const angle = (Math.random() - 0.5) * Math.PI;
      x = 0.12 + Math.cos(angle) * 0.52 + (Math.random() - 0.5) * 0.07;
      y = 0.36 + Math.sin(angle) * 0.38 + (Math.random() - 0.5) * 0.07;
    } else if (r < 0.92) {
      // R perna diagonal inferior
      const t = Math.random();
      x = 0.16 + t * 0.56 + (Math.random() - 0.5) * 0.08;
      y = 0.02 - t * 0.77 + (Math.random() - 0.5) * 0.08;
    } else {
      // Anel elíptico couture ao redor do monograma
      const theta = Math.random() * Math.PI * 2;
      x = Math.cos(theta) * 1.18;
      y = Math.sin(theta) * 1.18;
    }

    pts.push({
      x: x * scale,
      y: y * scale,
      z: (Math.random() - 0.5) * 0.34 * scale,
    });
  }
  return pts;
}

function sampleKRMonogramFromImage(
  img: HTMLImageElement,
  count: number,
  scale = 1.45
): Vec3[] {
  try {
    const size = 220;
    const offscreen = document.createElement('canvas');
    offscreen.width = size;
    offscreen.height = size;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return generateFallbackKRPoints(count, scale);

    ctx.clearRect(0, 0, size, size);
    const pad = size * 0.08;
    ctx.drawImage(img, pad, pad, size - pad * 2, size - pad * 2);
    const imgData = ctx.getImageData(0, 0, size, size).data;

    const candidates: { x: number; y: number; weight: number }[] = [];
    for (let y = 0; y < size; y += 2) {
      for (let x = 0; x < size; x += 2) {
        const idx = (y * size + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];
        const a = imgData[idx + 3];
        const luma = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

        if (a > 48 && luma > 0.18) {
          candidates.push({
            x: (x / size - 0.5) * 2,
            y: -(y / size - 0.5) * 2,
            weight: luma * (a / 255),
          });
        }
      }
    }

    if (candidates.length < 80) {
      return generateFallbackKRPoints(count, scale);
    }

    const result: Vec3[] = [];
    for (let i = 0; i < count; i++) {
      const sample =
        candidates[Math.floor(Math.random() * candidates.length)];
      const jitterX = (Math.random() - 0.5) * 0.025;
      const jitterY = (Math.random() - 0.5) * 0.025;
      result.push({
        x: (sample.x + jitterX) * scale,
        y: (sample.y + jitterY) * scale,
        z: (Math.random() - 0.5) * 0.32 * (0.5 + sample.weight * 0.8),
      });
    }
    return result;
  } catch {
    return generateFallbackKRPoints(count, scale);
  }
}

/**
 * Forma 1: Silhueta 3D de Coroa Dental Anatômica Esculpida
 * (Cúspides oclusais, equador protético convexo, linha cervical e raízes anatômicas)
 */
function generateDentalCrownPoints(count: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const u = Math.random(); // 0 (topo oclusal) -> 1 (ápice radicular)
    const theta = Math.random() * Math.PI * 2;

    const y = 1.32 - u * 2.64;
    let x = 0;
    let z = 0;
    let yOffset = 0;

    if (u < 0.16) {
      // Mesa oclusal com 4 cúspides anatômicas suaves
      const rFrac = Math.sqrt(u / 0.16);
      const cuspMod =
        1 + 0.18 * Math.cos(theta * 2) + 0.08 * Math.cos(theta * 4);
      const radius = 0.88 * rFrac * cuspMod;
      x = Math.cos(theta) * radius;
      z = Math.sin(theta) * radius * 0.82;
      const cuspPeak =
        Math.pow(Math.sin(theta * 2), 2) * 0.24 * rFrac -
        (1 - rFrac) * 0.16;
      yOffset = cuspPeak;
    } else if (u < 0.62) {
      // Corpo da coroa dental (equador protético até linha cervical)
      const crownT = (u - 0.16) / 0.46;
      const bulge = Math.sin(crownT * Math.PI) * 0.26;
      const taper = 1 - crownT * 0.28;
      const anatomicalSquareness = 1 + 0.09 * Math.cos(theta * 4);
      const radius = (0.88 * taper + bulge) * anatomicalSquareness;
      const shell = 0.88 + Math.random() * 0.12;
      x = Math.cos(theta) * radius * shell;
      z = Math.sin(theta) * radius * 0.82 * shell;
      yOffset = (1 - crownT) * 0.14 * Math.cos(theta * 2);
    } else {
      // Furca e 2 raízes cônicas convergindo para os ápices
      const rootT = (u - 0.62) / 0.38;
      const branchSign = i % 2 === 0 ? 1 : -1;
      const rootCenter = branchSign * (0.18 + rootT * 0.28);
      const rootRadius = (1 - rootT * 0.82) * 0.36;
      x = rootCenter + Math.cos(theta) * rootRadius;
      z = Math.sin(theta) * rootRadius * 0.85;
    }

    pts.push({
      x: x * 1.15,
      y: (y + yOffset) * 1.05,
      z: z * 1.15,
    });
  }
  return pts;
}

/**
 * Forma 2: Diamante Lapidado 3D (Brilhante / Octaedro de Porcelana)
 */
function generateCutDiamondPoints(count: number): Vec3[] {
  const pts: Vec3[] = [];
  const facets = 12;

  for (let i = 0; i < count; i++) {
    const section = Math.random();
    const facetIdx = Math.floor(Math.random() * facets);
    const angleStep = (Math.PI * 2) / facets;
    const baseAngle = facetIdx * angleStep;
    const localT = Math.random();
    const theta = baseAngle + localT * angleStep;

    const chord =
      Math.cos(angleStep * 0.5) / Math.cos((localT - 0.5) * angleStep);

    let y = 0;
    let radius = 0;

    if (section < 0.16) {
      // Mesa superior octogonal plana (Table)
      y = 0.92;
      radius = Math.sqrt(Math.random()) * 0.72 * chord;
    } else if (section < 0.44) {
      // Coroa facetada superior (Crown)
      const t = (section - 0.16) / 0.28;
      y = 0.92 - t * 0.52;
      radius = (0.72 + t * 0.64) * chord;
    } else if (section < 0.52) {
      // Rondízio (Girdle)
      y = 0.4 + (Math.random() - 0.5) * 0.06;
      radius = 1.36 * chord;
    } else {
      // Pavilhão inferior convergindo para o Culet
      const t = (section - 0.52) / 0.48;
      y = 0.4 - t * 1.78;
      radius = (1 - t) * 1.36 * chord;
    }

    const edgeSnap = Math.random() < 0.35 ? 1 : 0.94 + Math.random() * 0.06;

    pts.push({
      x: Math.cos(theta) * radius * edgeSnap,
      y,
      z: Math.sin(theta) * radius * edgeSnap,
    });
  }
  return pts;
}

/**
 * Forma 3: Estrela Editorial de 4 Pontas 3D (Bússola / Brilho Couture)
 */
function generateFourPointStarPoints(count: number): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i < count; i++) {
    const arm = i % 4;
    const armAngle = (arm * Math.PI) / 2;
    const r = Math.random();

    if (r < 0.78) {
      const dist = Math.pow(Math.random(), 0.72) * 1.62;
      const taper = Math.pow(1 - dist / 1.65, 1.55);
      const spread = (Math.random() - 0.5) * 2 * 0.42 * taper;
      const thickness =
        (1 - Math.abs(spread) / (0.44 * taper + 0.001)) * 0.38 * taper;
      const zSign = Math.random() < 0.5 ? 1 : -1;

      const localX = dist;
      const localY = spread;

      const x = localX * Math.cos(armAngle) - localY * Math.sin(armAngle);
      const y = localX * Math.sin(armAngle) + localY * Math.cos(armAngle);
      const z = zSign * thickness + (Math.random() - 0.5) * 0.06;

      pts.push({ x, y, z });
    } else {
      const diagAngle = armAngle + Math.PI / 4;
      const dist = Math.pow(Math.random(), 0.85) * 0.82;
      const taper = Math.pow(1 - dist / 0.85, 1.4);
      const spread = (Math.random() - 0.5) * 0.24 * taper;

      const x = dist * Math.cos(diagAngle) - spread * Math.sin(diagAngle);
      const y = dist * Math.sin(diagAngle) + spread * Math.cos(diagAngle);
      const z = (Math.random() - 0.5) * 0.28 * taper;

      pts.push({ x, y, z });
    }
  }
  return pts;
}

/* ==========================================================================
   3. KR PRELOADER (MÓDULO 8618 DA WOLFSTONE ADAPTADO)
   ========================================================================== */

interface PreloaderParticle {
  startX: number;
  startY: number;
  targetNormX: number;
  targetNormY: number;
  size: number;
  alpha: number;
  speedOffset: number;
  isPearl: boolean;
}

export const KRPreloader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [percent, setPercent] = useState(0);
  const [fading, setFading] = useState(false);
  const [unmounted, setUnmounted] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PARTICLE_TOTAL = 1400;
    const DURATION_MS = 2200;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setCanvasSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setCanvasSize();

    // Inicializa com fallback geométrico imediato
    const initialCoords = generateFallbackKRPoints(PARTICLE_TOTAL, 1);

    const particles: PreloaderParticle[] = Array.from(
      { length: PARTICLE_TOTAL },
      (_, idx) => {
        const edgeAngle =
          (idx / PARTICLE_TOTAL) * Math.PI * 2 + (Math.random() - 0.5) * 0.35;
        const outerRadius =
          Math.max(width, height) * (0.58 + Math.random() * 0.45);
        return {
          startX: width * 0.5 + Math.cos(edgeAngle) * outerRadius,
          startY: height * 0.5 + Math.sin(edgeAngle) * outerRadius,
          targetNormX: initialCoords[idx].x,
          targetNormY: -initialCoords[idx].y,
          size: 0.9 + Math.random() * 1.65,
          alpha: 0.45 + Math.random() * 0.55,
          speedOffset: Math.random() * 0.22,
          isPearl: Math.random() < 0.24,
        };
      }
    );

    // Amostra /assets/kr-monograma-ouro.png via getImageData assim que disponível
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/assets/kr-monograma-ouro.png';
    img.onload = () => {
      const sampled = sampleKRMonogramFromImage(img, PARTICLE_TOTAL, 1);
      for (let i = 0; i < PARTICLE_TOTAL; i++) {
        particles[i].targetNormX = sampled[i].x;
        particles[i].targetNormY = -sampled[i].y;
      }
    };

    let rafId = 0;
    let isClosing = false;
    let fadeTimer = 0;
    let unmountTimer = 0;
    const startTime = performance.now();

    const triggerDismiss = () => {
      if (isClosing) return;
      isClosing = true;
      setPercent(100);
      setFading(true);
      unmountTimer = window.setTimeout(() => {
        setUnmounted(true);
      }, 720);
    };

    const render = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / DURATION_MS);
      const easedCount = 1 - Math.pow(1 - rawProgress, 2.4);
      const currentPct = Math.min(100, Math.round(easedCount * 100));
      setPercent(currentPct);

      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.46;
      const monogramScale = Math.min(width, height) * 0.23;

      const glowRadius = monogramScale * (0.9 + rawProgress * 0.5);
      const radial = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        glowRadius
      );
      radial.addColorStop(0, `rgba(229, 201, 155, ${0.14 * rawProgress})`);
      radial.addColorStop(0.55, `rgba(197, 155, 100, ${0.05 * rawProgress})`);
      radial.addColorStop(1, 'rgba(4, 11, 22, 0)');
      ctx.fillStyle = radial;
      ctx.beginPath();
      ctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < PARTICLE_TOTAL; i++) {
        const p = particles[i];
        const localT = Math.max(
          0,
          Math.min(
            1,
            (rawProgress - p.speedOffset * 0.5) / (1 - p.speedOffset * 0.5)
          )
        );
        const ease = 1 - Math.pow(1 - localT, 3);

        const tx = cx + p.targetNormX * monogramScale;
        const ty = cy + p.targetNormY * monogramScale;

        const swirlAngle = (1 - ease) * 1.15;
        const dx = p.startX - tx;
        const dy = p.startY - ty;
        const rotX = dx * Math.cos(swirlAngle) - dy * Math.sin(swirlAngle);
        const rotY = dx * Math.sin(swirlAngle) + dy * Math.cos(swirlAngle);

        const x = tx + rotX * (1 - ease);
        const y = ty + rotY * (1 - ease);

        const alpha = p.alpha * (0.25 + 0.75 * ease);
        ctx.fillStyle = p.isPearl
          ? `rgba(245, 242, 235, ${alpha.toFixed(3)})`
          : `rgba(229, 201, 155, ${alpha.toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (rawProgress < 1 && !isClosing) {
        rafId = window.requestAnimationFrame(render);
      } else if (!isClosing) {
        fadeTimer = window.setTimeout(triggerDismiss, 140);
      }
    };

    rafId = window.requestAnimationFrame(render);

    const onKeyDown = () => triggerDismiss();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('keydown', onKeyDown, { once: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(unmountTimer);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  if (unmounted) return null;

  const formattedPercent = String(percent).padStart(3, '0');

  return (
    <div
      className={`preloader ${fading ? 'is-fading' : ''}`}
      onClick={() => {
        setPercent(100);
        setFading(true);
        window.setTimeout(() => setUnmounted(true), 720);
      }}
      role="status"
      aria-label="Carregando experiência Dra. Kéryda Ramos"
    >
      <canvas ref={canvasRef} className="preloader__canvas" />
      <div className="preloader__meta">
        <span className="preloader__brand">
          dra. kéryda ramos · cro-go 22911
        </span>
        <span className="preloader__count">
          {formattedPercent}
          <i>%</i>
        </span>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. PARTICLE FIELD 3D (MÓDULO 1444 DA WOLFSTONE ADAPTADO)
   ========================================================================== */

interface StarLayerParticle {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speedX: number;
  speedY: number;
  layer: 0 | 1 | 2;
  twinkleSeed: number;
}

interface CloudParticleMeta {
  r: number;
  g: number;
  b: number;
  size: number;
  seed: number;
  dispX: number;
  dispY: number;
}

const PALETTE_RGB: [number, number, number][] = [
  [229, 201, 155], // Ouro Champagne #E5C99B
  [197, 155, 100], // Bronze #C59B64
  [245, 242, 235], // Pérola #F5F2EB
  [69, 120, 194],  // Azul Safira #4578C2
];

export const ParticleField3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const CLOUD_COUNT = 2400;
    const STAR_COUNT = 480;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // 3 camadas de estrelas em profundidade que derivam suavemente
    const stars: StarLayerParticle[] = Array.from(
      { length: STAR_COUNT },
      (_, idx) => {
        const layer = (idx % 3) as 0 | 1 | 2;
        const speedFactor = layer === 0 ? 0.08 : layer === 1 ? 0.16 : 0.28;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: layer === 0 ? 0.7 : layer === 1 ? 1.15 : 1.65,
          alpha: layer === 0 ? 0.22 : layer === 1 ? 0.36 : 0.54,
          speedX: (Math.random() - 0.5) * speedFactor,
          speedY: -speedFactor * (0.4 + Math.random() * 0.6),
          layer,
          twinkleSeed: Math.random() * Math.PI * 2,
        };
      }
    );

    // 4 formas 3D interpoladas pelo scroll:
    // Forma 0: Monograma KR
    // Forma 1: Silhueta 3D de Coroa Dental Anatômica
    // Forma 2: Diamante Lapidado 3D
    // Forma 3: Estrela Editorial de 4 Pontas 3D
    const shapes: [Vec3[], Vec3[], Vec3[], Vec3[]] = [
      generateFallbackKRPoints(CLOUD_COUNT, 1.42),
      generateDentalCrownPoints(CLOUD_COUNT),
      generateCutDiamondPoints(CLOUD_COUNT),
      generateFourPointStarPoints(CLOUD_COUNT),
    ];

    // Amostra o monograma real de /assets/kr-monograma-ouro.png para a Forma 0
    const krImg = new Image();
    krImg.crossOrigin = 'anonymous';
    krImg.src = '/assets/kr-monograma-ouro.png';
    krImg.onload = () => {
      shapes[0] = sampleKRMonogramFromImage(krImg, CLOUD_COUNT, 1.45);
    };

    const cloudMeta: CloudParticleMeta[] = Array.from(
      { length: CLOUD_COUNT },
      (_, i) => {
        const roll = Math.random();
        const colorIdx =
          roll < 0.42 ? 0 : roll < 0.72 ? 1 : roll < 0.9 ? 2 : 3;
        const [r, g, b] = PALETTE_RGB[colorIdx];
        return {
          r,
          g,
          b,
          size: 0.95 + (i % 5) * 0.32,
          seed: i * 0.137 + Math.random() * Math.PI * 2,
          dispX: 0,
          dispY: 0,
        };
      }
    );

    let rafId = 0;
    let smoothProgress = scrollState.progress;
    let smoothPointerX = 0;
    let smoothPointerY = 0;

    const render = (now: number) => {
      const time = now * 0.001;

      // Fade-out automático quando entra na zona clara Alabastro (.cream-bridge)
      const globalFade = Math.max(0, 1 - Math.min(1, scrollState.light * 2.2));

      ctx.clearRect(0, 0, width, height);

      if (globalFade <= 0.005) {
        rafId = window.requestAnimationFrame(render);
        return;
      }

      smoothProgress += (scrollState.progress - smoothProgress) * 0.08;
      const normPointerX =
        width > 0 ? (scrollState.pointerX / width - 0.5) * 2 : 0;
      const normPointerY =
        height > 0 ? (scrollState.pointerY / height - 0.5) * 2 : 0;
      smoothPointerX += (normPointerX - smoothPointerX) * 0.06;
      smoothPointerY += (normPointerY - smoothPointerY) * 0.06;

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxDist = Math.hypot(centerX, centerY) || 1;

      /* --------------------------------------------------------------------
         CAMADAS 0, 1, 2: ESTRELAS EM PROFUNDIDADE COM VIGNETTE CENTRAL
         -------------------------------------------------------------------- */
      for (let i = 0; i < STAR_COUNT; i++) {
        const s = stars[i];
        const parallaxBoost = (s.layer + 1) * scrollState.velocity * 0.015;
        s.x += s.speedX;
        s.y += s.speedY - parallaxBoost;

        if (s.x < 0) s.x += width;
        if (s.x > width) s.x -= width;
        if (s.y < 0) s.y += height;
        if (s.y > height) s.y -= height;

        // Esmaece no centro da tela
        const dxCenter = s.x - centerX;
        const dyCenter = s.y - centerY;
        const distRatio = Math.hypot(dxCenter, dyCenter) / maxDist;
        const centerAttenuation = Math.min(
          1,
          Math.max(0.14, Math.pow(distRatio * 1.35, 1.5))
        );

        const twinkle =
          0.75 + 0.25 * Math.sin(time * (1.2 + s.layer * 0.5) + s.twinkleSeed);
        const alpha = s.alpha * centerAttenuation * twinkle * globalFade;

        ctx.fillStyle =
          s.layer === 2
            ? `rgba(229, 201, 155, ${alpha.toFixed(3)})`
            : `rgba(245, 242, 235, ${alpha.toFixed(3)})`;
        ctx.fillRect(s.x, s.y, s.size, s.size);
      }

      /* --------------------------------------------------------------------
         NUVEM 3D DE 2.400 PARTÍCULAS COM MORPHING ENTRE 4 FORMAS
         -------------------------------------------------------------------- */
      const totalTransitions = 3; // 0->1, 1->2, 2->3
      const scaledProg = Math.max(
        0,
        Math.min(totalTransitions - 0.0001, smoothProgress * totalTransitions)
      );
      const shapeIdxA = Math.floor(scaledProg);
      const shapeIdxB = Math.min(totalTransitions, shapeIdxA + 1);
      const segProgress = scaledProg - shapeIdxA;

      const morphT = segProgress * segProgress * (3 - 2 * segProgress);

      // Dispersão com platô no meio da transição entre duas formas
      const m = 1 - Math.abs(segProgress - 0.5) * 2;
      const dispersionPlateau = Math.pow(Math.max(0, m), 0.85);
      const turbulenceAmp =
        dispersionPlateau * 0.92 + Math.min(0.35, scrollState.energy * 0.18);

      // Rotação suave 3D + interação com pointerX / pointerY
      const rotY =
        time * 0.26 + smoothProgress * Math.PI * 2.2 + smoothPointerX * 0.48;
      const rotX =
        Math.sin(time * 0.19) * 0.22 + smoothPointerY * 0.34;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const cloudOriginX =
        width * (0.5 + Math.sin(scrollState.cloudX) * 0.16);
      const cloudOriginY =
        height * (0.5 + scrollState.cloudY * 0.15);
      const baseScale = Math.min(width, height) * 0.25;
      const fov = 3.6;

      const shapeA = shapes[shapeIdxA];
      const shapeB = shapes[shapeIdxB];
      const repelRadius = Math.min(width, height) * 0.18;
      const repelRadiusSq = repelRadius * repelRadius;

      for (let i = 0; i < CLOUD_COUNT; i++) {
        const a = shapeA[i];
        const b = shapeB[i];
        const meta = cloudMeta[i];

        let px = a.x + (b.x - a.x) * morphT;
        let py = a.y + (b.y - a.y) * morphT;
        let pz = a.z + (b.z - a.z) * morphT;

        // Turbulência senoidal 3D
        if (turbulenceAmp > 0.002) {
          const s = meta.seed;
          px += Math.sin(time * 1.7 + s) * Math.cos(s * 1.9) * turbulenceAmp;
          py += Math.cos(time * 1.45 + s * 1.3) * turbulenceAmp;
          pz += Math.sin(time * 2.05 + s * 0.7) * turbulenceAmp;
        }

        const rx = px * cosY - pz * sinY;
        const rz1 = px * sinY + pz * cosY;
        const ry = py * cosX - rz1 * sinX;
        const rz = py * sinX + rz1 * cosX;

        const perspective = fov / (fov + rz + 2.2);
        let screenX = cloudOriginX + rx * baseScale * perspective;
        let screenY = cloudOriginY - ry * baseScale * perspective;

        // Repulsão radial + redemoinho quando o mouse passa perto das partículas
        if (scrollState.pointerActive) {
          const dx = screenX - scrollState.pointerX;
          const dy = screenY - scrollState.pointerY;
          const distSq = dx * dx + dy * dy;

          if (distSq < repelRadiusSq && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = Math.pow(1 - dist / repelRadius, 2);
            const nx = dx / dist;
            const ny = dy / dist;
            const swirlX = -ny;
            const swirlY = nx;

            meta.dispX += (nx * 36 + swirlX * 24) * force * 0.18;
            meta.dispY += (ny * 36 + swirlY * 24) * force * 0.18;
          }
        }

        meta.dispX *= 0.9;
        meta.dispY *= 0.9;

        screenX += meta.dispX;
        screenY += meta.dispY;

        if (
          screenX < -20 ||
          screenX > width + 20 ||
          screenY < -20 ||
          screenY > height + 20
        ) {
          continue;
        }

        const depthAlpha = Math.max(
          0.12,
          Math.min(1, (perspective - 0.45) * 1.65)
        );
        const finalAlpha = depthAlpha * globalFade * 0.85;
        const radius = meta.size * perspective;

        ctx.fillStyle = `rgba(${meta.r}, ${meta.g}, ${meta.b}, ${finalAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = window.requestAnimationFrame(render);
    };

    rafId = window.requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

/* ==========================================================================
   5. WOLFSTONE MOTION CONTROLLER (RAF GLOBAL, SKEW, LIGHT, MAGNETIC, CURSOR)
   ========================================================================== */

export const WolfstoneMotionController: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [cursorHovered, setCursorHovered] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let lastScrollY = window.scrollY;
    let smoothVelocity = 0;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let dotX = targetX;
    let dotY = targetY;
    let ringX = targetX;
    let ringY = targetY;
    let activeMagneticEl: HTMLElement | null = null;

    // IntersectionObserver para .scroll-fade-up e .line-reveal-container
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
    );

    const observeRevealElements = () => {
      const elements = document.querySelectorAll(
        '.scroll-fade-up:not(.is-revealed), .line-reveal-container:not(.is-revealed)'
      );
      elements.forEach((el) => revealObserver.observe(el));
    };

    observeRevealElements();

    const mutationObserver = new MutationObserver(() => {
      observeRevealElements();
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const handlePointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      scrollState.pointerX = e.clientX;
      scrollState.pointerY = e.clientY;
      scrollState.pointerActive = true;

      const targetEl = e.target as HTMLElement | null;
      if (!targetEl) return;

      // Expansão do cursor duplo para 60px sobre links e botões
      const interactive = targetEl.closest(
        'a, button, [role="button"], [data-magnetic], .service-card, input, select, textarea'
      );
      setCursorHovered(Boolean(interactive));

      // Física magnética em todos os elementos [data-magnetic]
      const magEl = targetEl.closest<HTMLElement>('[data-magnetic]');
      if (activeMagneticEl && activeMagneticEl !== magEl) {
        activeMagneticEl.style.transform = 'translate3d(0px, 0px, 0)';
        activeMagneticEl = null;
      }
      if (magEl) {
        activeMagneticEl = magEl;
        const strength = parseFloat(magEl.dataset.magnetic || '0.28') || 0.28;
        const rect = magEl.getBoundingClientRect();
        const cx = rect.left + rect.width * 0.5;
        const cy = rect.top + rect.height * 0.5;
        const dx = (e.clientX - cx) * strength;
        const dy = (e.clientY - cy) * strength;
        magEl.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      }

      // Iluminação spotlight (--mx, --my) em .service-card
      const card = targetEl.closest<HTMLElement>('.service-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${mx.toFixed(1)}%`);
        card.style.setProperty('--my', `${my.toFixed(1)}%`);
      }
    };

    const handlePointerLeaveWindow = () => {
      scrollState.pointerActive = false;
      if (activeMagneticEl) {
        activeMagneticEl.style.transform = 'translate3d(0px, 0px, 0)';
        activeMagneticEl = null;
      }
    };

    const tick = () => {
      const scrollY = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      const rawDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;

      smoothVelocity += (rawDelta - smoothVelocity) * 0.14;
      scrollState.progress = progress;
      scrollState.velocity = smoothVelocity;
      scrollState.energy = Math.min(
        1,
        Math.abs(smoothVelocity) / 42 + scrollState.energy * 0.9
      );

      scrollState.cloudX = 2.2 - progress * Math.PI * 1.65;
      scrollState.cloudY = 0.1 + Math.sin(progress * Math.PI * 2) * 0.22;

      // 1. Efeito de skewY sutil por velocidade do scroll nos elementos .display
      const m = Math.max(-3.2, Math.min(3.2, smoothVelocity * 0.045));
      const displays = document.querySelectorAll<HTMLElement>('.display');
      displays.forEach((el) => {
        if (Math.abs(m) > 0.02) {
          el.style.transform = `skewY(${m.toFixed(3)}deg)`;
        } else {
          el.style.transform = 'skewY(0.000deg)';
        }
      });

      // 2. Medição do elemento .cream-bridge na tela e interpolação de --light (0 a 1)
      const creamBridge = document.querySelector<HTMLElement>('.cream-bridge');
      let light = 0;
      if (creamBridge) {
        const rect = creamBridge.getBoundingClientRect();
        const vh = window.innerHeight;
        const enterProgress = Math.max(
          0,
          Math.min(1, (vh * 0.72 - rect.top) / (vh * 0.45))
        );
        const exitProgress = Math.max(
          0,
          Math.min(1, (rect.bottom - vh * 0.28) / (vh * 0.45))
        );
        light = Math.min(enterProgress, exitProgress);
      }

      scrollState.light = light;
      document.documentElement.style.setProperty('--light', light.toFixed(3));
      document.body.classList.toggle('is-cream', light > 0.5);

      const siteHeader = document.querySelector<HTMLElement>('.site-header');
      if (siteHeader) {
        siteHeader.classList.toggle('is-scrolled', scrollY > 36);
        siteHeader.classList.toggle('is-light', light > 0.5);
      }

      // 3. Atualiza [data-parallax] no scroll
      const parallaxNodes =
        document.querySelectorAll<HTMLElement>('[data-parallax]');
      parallaxNodes.forEach((node) => {
        const speed = parseFloat(node.dataset.parallax || '0.12') || 0.12;
        const rect = node.getBoundingClientRect();
        const centerOffset =
          rect.top + rect.height * 0.5 - window.innerHeight * 0.5;
        const yShift = -centerOffset * speed;
        node.style.transform = `translate3d(0, ${yShift.toFixed(2)}px, 0)`;
      });

      // 4. Atualiza [data-marquee] no scroll
      const marqueeNodes =
        document.querySelectorAll<HTMLElement>('[data-marquee]');
      marqueeNodes.forEach((node) => {
        const dir = node.dataset.marquee === 'reverse' ? 1 : -1;
        const xShift = ((scrollY * 0.18) % 600) * dir;
        node.style.transform = `translate3d(${xShift.toFixed(2)}px, 0, 0)`;
      });

      // 5. Cursor duplo Wolfstone (.cursor-dot + .cursor-ring)
      dotX += (targetX - dotX) * 0.42;
      dotY += (targetY - dotY) * 0.42;
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeaveWindow);

    return () => {
      window.cancelAnimationFrame(rafId);
      revealObserver.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeaveWindow);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot hidden md:block"
        style={{ opacity: cursorHovered ? 0.35 : 1 }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring hidden md:block"
        style={{
          width: cursorHovered ? '60px' : '38px',
          height: cursorHovered ? '60px' : '38px',
          backgroundColor: cursorHovered
            ? 'rgba(229, 201, 155, 0.12)'
            : 'transparent',
          borderColor: cursorHovered
            ? 'rgba(229, 201, 155, 0.88)'
            : undefined,
        }}
        aria-hidden="true"
      />
    </>
  );
};
