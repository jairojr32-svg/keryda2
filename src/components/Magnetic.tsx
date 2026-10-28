import { useEffect } from "react";

/**
 * Atração magnética premium: elementos com [data-magnetic] são levemente
 * puxados em direção ao cursor e reagem à pressão no clique. Sem efeito em
 * toque ou prefers-reduced-motion.
 */
export function Magnetic() {
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
    );
    const cleanups: Array<() => void> = [];

    els.forEach((el) => {
      const strength = parseFloat(el.dataset.magnetic || "0.4");
      el.style.transition = "transform 0.3s cubic-bezier(0.2, 0.7, 0.2, 1)";
      el.style.willChange = "transform";
      let pressed = false;

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        const s = pressed ? 0.96 : 1;
        el.style.transform = `translate(${(mx * strength).toFixed(2)}px, ${(
          my * strength
        ).toFixed(2)}px) scale(${s})`;
      };
      const reset = () => {
        el.style.transform = "translate(0px, 0px) scale(1)";
      };
      const down = () => {
        pressed = true;
        el.style.transform = el.style.transform.replace(/scale\([^)]*\)/, "scale(0.96)");
      };
      const up = () => {
        pressed = false;
        el.style.transform = el.style.transform.replace(/scale\([^)]*\)/, "scale(1)");
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", reset);
      el.addEventListener("pointerdown", down);
      el.addEventListener("pointerup", up);
      cleanups.push(() => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", reset);
        el.removeEventListener("pointerdown", down);
        el.removeEventListener("pointerup", up);
        el.style.transform = "";
        el.style.transition = "";
        el.style.willChange = "";
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}

export default Magnetic;
