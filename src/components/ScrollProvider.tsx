import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "../lib/scrollState";

export function ScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.25,
    });

    lenis.on("scroll", (e: any) => {
      const limit = e.limit || 1;
      scrollState.progress = Math.min(1, Math.max(0, e.scroll / limit));
      scrollState.velocity = e.velocity || 0;
      ScrollTrigger.update();
    });

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const splitLines = (el: HTMLElement): HTMLElement[] => {
      const parts = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = "";
      const inners: HTMLElement[] = [];
      parts.forEach((part) => {
        const mask = document.createElement("span");
        mask.className = "line-mask";
        const inner = document.createElement("span");
        inner.className = "line-inner";
        inner.innerHTML = part.trim();
        mask.appendChild(inner);
        el.appendChild(mask);
        inners.push(inner);
      });
      return inners;
    };

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-lines]").forEach((el) => {
        const inners = splitLines(el);
        const isIntro = el.hasAttribute("data-intro-lines");
        if (isIntro) {
          gsap.set(inners, { yPercent: 118 });
          gsap.to(inners, {
            yPercent: 0,
            duration: 1.15,
            ease: "power4.out",
            stagger: 0.1,
            delay: 0.2,
          });
        }
      });

      const splitWords = (el: HTMLElement): HTMLElement[] => {
        const words = el.textContent?.split(/(\s+)/) ?? [];
        el.innerHTML = "";
        const spans: HTMLElement[] = [];
        words.forEach((w) => {
          if (w.trim() === "") {
            el.appendChild(document.createTextNode(w));
            return;
          }
          const s = document.createElement("span");
          s.className = "word";
          s.textContent = w;
          el.appendChild(s);
          spans.push(s);
        });
        return spans;
      };

      gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
        const words = splitWords(el);
        const isIntro = el.hasAttribute("data-intro-words");
        const fromVars: gsap.TweenVars = {
          opacity: 0,
          yPercent: 80,
        };
        const toVars: gsap.TweenVars = {
          opacity: 1,
          yPercent: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.03,
        };
        gsap.set(words, fromVars);
        if (isIntro) {
          gsap.to(words, { ...toVars, delay: 0.45 });
        } else {
          gsap.to(words, {
            ...toVars,
            scrollTrigger: {
              trigger: el,
              start: "top 86%",
              end: "top 55%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((m) => {
        const row = m.querySelector(".marquee__row");
        if (!row) return;
        gsap.fromTo(
          row,
          { xPercent: 6 },
          {
            xPercent: -40,
            ease: "none",
            scrollTrigger: {
              trigger: m,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      });

      gsap.from("[data-intro]", {
        yPercent: 30,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.3,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = parseFloat(el.dataset.delay || "0");
        gsap.from(el, {
          yPercent: 18,
          opacity: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            end: "top 45%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = parseFloat(el.dataset.parallax || "60");
        gsap.to(el, {
          yPercent: -amount / 10,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      const lightObj = { v: 0 };
      const bridge = document.querySelector(".cream-bridge");
      if (bridge) {
        gsap.to(lightObj, {
          v: 1,
          ease: "none",
          scrollTrigger: {
            trigger: bridge,
            start: "top 85%",
            end: "bottom 55%",
            scrub: true,
          },
          onUpdate: () => {
            scrollState.light = lightObj.v;
            document.documentElement.style.setProperty("--light", lightObj.v.toFixed(3));
            document.body.classList.toggle("is-cream", lightObj.v > 0.5);
          },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-cloud]").forEach((el) => {
        const [cx, cy] = (el.dataset.cloud || "0,0").split(",").map(Number);
        const set = () => {
          scrollState.cloudX = cx;
          scrollState.cloudY = cy;
        };
        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: set,
          onEnterBack: set,
        });
      });

      const firstCream = document.querySelector("#provas");
      const header = document.querySelector(".site-header");
      if (firstCream && header) {
        ScrollTrigger.create({
          trigger: firstCream,
          start: "top 72px",
          end: "max",
          onToggle: (self) => header.classList.toggle("is-light", self.isActive),
        });
      }
    });

    // Otimizado: usa apenas transform GPU (zero filter:blur em textos gigantes por frame)
    // e só toca no DOM quando a velocidade de scroll realmente muda.
    let skew = 0;
    let wasSkewed = false;
    const skewEls = gsap.utils.toArray<HTMLElement>(".display");
    const skewTick = () => {
      const target = Math.max(-1.0, Math.min(1.0, scrollState.velocity * 0.032));
      skew += (target - skew) * 0.12;

      if (Math.abs(skew) > 0.015) {
        const tf = `skewY(${skew.toFixed(2)}deg)`;
        for (const el of skewEls) {
          el.style.transform = tf;
        }
        wasSkewed = true;
      } else if (wasSkewed) {
        for (const el of skewEls) {
          el.style.transform = "";
        }
        wasSkewed = false;
      }

      const targetE = Math.min(1, Math.abs(scrollState.velocity) * 0.09);
      const k = targetE > scrollState.energy ? 0.2 : 0.035;
      scrollState.energy += (targetE - scrollState.energy) * k;
      scrollState.velocity *= 0.86;
    };
    gsap.ticker.add(skewTick);

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      scrollState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      scrollState.pointerActive = true;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const refreshTimer = setTimeout(refresh, 600);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(refreshTimer);
      window.removeEventListener("pointermove", onPointer);
      ctx.revert();
      gsap.ticker.remove(tick);
      gsap.ticker.remove(skewTick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}

export default ScrollProvider;
