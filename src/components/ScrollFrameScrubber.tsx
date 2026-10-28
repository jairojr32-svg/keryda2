import { useEffect, useRef, useState } from "react";
import { scrollState } from "../lib/scrollState";

const TOTAL_FRAMES = 60;
const DURATION_MS = 8000;

const FRAME_URLS = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const padded = String(i).padStart(3, "0");
  return `/frames/frame_${padded}.jpg`;
});

export interface ScrollFrameScrubberProps {
  className?: string;
}

export function ScrollFrameScrubber({ className = "" }: ScrollFrameScrubberProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const timeRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let alive = true;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let readyFlag = false;

    FRAME_URLS.forEach((url, index) => {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (!alive) return;
        if (!readyFlag && index === 0) {
          readyFlag = true;
          setIsReady(true);
        }
      };
      img.src = url;
      images[index] = img;
    });

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (canvas) {
      canvas.width = 640;
      canvas.height = 360;
    }

    let raf = 0;
    let isVisible = false;
    let smoothProgress = scrollState.progress;
    let lastDrawnIndex = -1;

    const drawFrame = (img: HTMLImageElement) => {
      if (!canvas || !ctx || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      const dw = iw * scale;
      const dh = ih * scale;
      const dx = (cw - dw) * 0.5;
      const dy = (ch - dh) * 0.5;
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const tick = () => {
      if (!alive || !isVisible) {
        raf = 0;
        return;
      }

      // Usa scrollState.progress diretamente (zero getBoundingClientRect / zero layout reflow!)
      const targetProgress = Math.min(1, Math.max(0, (scrollState.progress / 0.55) % 1));
      smoothProgress += (targetProgress - smoothProgress) * 0.15;

      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(smoothProgress * (TOTAL_FRAMES - 1)))
      );

      if (frameIndex !== lastDrawnIndex) {
        const img = images[frameIndex] || images[0];
        if (img && img.complete && img.naturalWidth > 0) {
          drawFrame(img);
          lastDrawnIndex = frameIndex;
        }

        const displayFrame = frameIndex + 1;
        const currentMs = Math.round(smoothProgress * DURATION_MS);

        if (labelRef.current) {
          labelRef.current.textContent = `FRAME ${String(displayFrame).padStart(
            3,
            "0"
          )} / 060 · SYNC SCROLL`;
        }
        if (timeRef.current) {
          timeRef.current.textContent = `${String(currentMs).padStart(4, "0")} MS`;
        }
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${smoothProgress.toFixed(3)})`;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const el = containerRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !raf) {
            raf = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.01 }
    );

    if (el) io.observe(el);

    return () => {
      alive = false;
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`scroll-scrubber ${className}`.trim()}
      data-ready={isReady ? "true" : "false"}
      style={{
        position: "relative",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(197, 155, 100, 0.28)",
        background: "#040B16",
        boxShadow: "0 30px 80px -24px rgba(0, 0, 0, 0.65)",
      }}
    >
      <div
        className="scroll-scrubber__viewport"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "16 / 9",
          overflow: "hidden",
          background: "#040B16",
        }}
      >
        <canvas
          ref={canvasRef}
          className="scroll-scrubber__canvas"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
          }}
        />

        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(4,11,22,0.22) 0%, transparent 32%, transparent 65%, rgba(4,11,22,0.78) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1.25rem",
            right: "1.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            pointerEvents: "none",
          }}
        >
          <span
            className="mono"
            style={{
              padding: "0.38rem 0.75rem",
              borderRadius: "999px",
              background: "rgba(4, 11, 22, 0.78)",
              border: "1px solid rgba(197, 155, 100, 0.32)",
              color: "#E5C99B",
            }}
          >
            ESCULTURA 3D · MICRO-PRECISÃO
          </span>
          <span
            ref={timeRef}
            className="mono"
            style={{
              padding: "0.38rem 0.75rem",
              borderRadius: "999px",
              background: "rgba(4, 11, 22, 0.78)",
              border: "1px solid rgba(244, 241, 234, 0.16)",
              color: "#F4F1EA",
            }}
          >
            0000 MS
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1.25rem",
            right: "1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span ref={labelRef} className="mono" style={{ color: "#E5C99B" }}>
              FRAME 001 / 060 · SYNC SCROLL
            </span>
            <span className="mono" style={{ color: "rgba(244,241,234,0.65)" }}>
              ROLE PARA ANIMAR ↕
            </span>
          </div>
          <div
            style={{
              height: "2px",
              width: "100%",
              background: "rgba(255,255,255,0.12)",
              overflow: "hidden",
            }}
          >
            <div
              ref={barRef}
              style={{
                height: "100%",
                width: "100%",
                background: "#C8A26A",
                transformOrigin: "left",
                transform: "scaleX(0)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScrollFrameScrubber;
