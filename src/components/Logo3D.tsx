import { useEffect, useRef } from "react";
import { scrollState } from "../lib/scrollState";

const N = 5; // 5 camadas otimizadas sem filter:brightness por camada (zero custo de GPU)

export function Logo3D() {
  const innerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let rx = 0;
    let ry = 0;
    let t = 0;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      t += 0.016;
      const idleY = Math.sin(t * 0.7) * 5;
      const idleX = Math.cos(t * 0.55) * 3;
      const targetRy = idleY + scrollState.pointerX * 10;
      const targetRx = idleX - scrollState.pointerY * 8;
      ry += (targetRy - ry) * 0.07;
      rx += (targetRx - rx) * 0.07;
      inner.style.transform = `translateZ(-2px) rotateX(${rx.toFixed(
        2
      )}deg) rotateY(${ry.toFixed(2)}deg)`;
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <a
      href="#hero"
      className="logo3d-wrap site-header__logo"
      aria-label="Dra. Kéryda Ramos — início"
    >
      <span className="logo3d" ref={innerRef}>
        {Array.from({ length: N }).map((_, i) => (
          <img
            key={i}
            src="/assets/kr-monograma-ouro.png"
            alt={i === 0 ? "Dra. Kéryda Ramos" : ""}
            aria-hidden={i !== 0}
            className={`logo3d__layer ${i === 0 ? "is-face" : ""}`}
            style={{
              transform: `translateZ(${(-i * 1.4).toFixed(2)}px)`,
              opacity: i === 0 ? 1 : Number((1 - i * 0.18).toFixed(2)),
              zIndex: N - i,
            }}
          />
        ))}
      </span>
    </a>
  );
}

export default Logo3D;
