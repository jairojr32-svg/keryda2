import React, { useEffect, useRef, useState } from 'react';
import { GoldCornerCurveTopRight, GoldCornerCurveBottomLeft } from './BrandOrnament';
import { RotatingGoldSeal } from './CustomLuxuryCursor';

interface HeroSectionProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [fraseRevealed, setFraseRevealed] = useState(false);

  const heroRef = useRef<HTMLElement | null>(null);
  const fraseRef = useRef<HTMLElement | null>(null);
  const cloudCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Revelação cinematográfica de abertura (#hero) e revelação por scroll (#frase)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setHeroRevealed(true);
    }, 90);

    const fraseEl = fraseRef.current;
    if (!fraseEl || typeof IntersectionObserver === 'undefined') {
      setFraseRevealed(true);
      return () => window.clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setFraseRevealed(true);
          }
        });
      },
      { threshold: 0.22 }
    );

    observer.observe(fraseEl);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Nuvem de partículas douradas interativa no #hero (caso não exista canvas global em App.tsx)
  useEffect(() => {
    const canvas = cloudCanvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    // Se App.tsx já injetou um canvas global de nuvem de partículas, evitamos duplicidade
    const globalCloud = document.querySelector(
      'canvas#cloud-canvas, canvas.cloud-canvas, canvas.webgl-cloud'
    );
    if (globalCloud && globalCloud !== canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId: number | null = null;
    let width = 0;
    let height = 0;

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const PARTICLE_COUNT = 130;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 140 + Math.random() * 260;
      return {
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        size: 0.8 + Math.random() * 1.9,
        alpha: 0.2 + Math.random() * 0.65,
        speed: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      pointer.tx = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointer.ty = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.58 + pointer.x * 28;
      const centerY = height * 0.48 + pointer.y * 20;
      const rotY = elapsed * 0.15 + pointer.x * 0.35;
      const rotX = Math.sin(elapsed * 0.25) * 0.12 - pointer.y * 0.25;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const floatOffset = Math.sin(elapsed * p.speed + p.phase) * 8;

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.z * cosY + p.x * sinY;
        const y1 = (p.y + floatOffset) * cosX - z1 * sinX;
        const z2 = z1 * cosX + (p.y + floatOffset) * sinX;

        const fov = 560;
        const scale = fov / (fov + z2 + 320);
        if (scale <= 0) continue;

        const sx = centerX + x1 * scale * 2.1;
        const sy = centerY + y1 * scale * 2.1;
        const r = Math.max(0.6, p.size * scale * 1.45);
        const opacity = Math.min(0.85, Math.max(0.08, p.alpha * scale));

        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 201, 155, ${opacity.toFixed(3)})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    rafId = window.requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const strength = parseFloat(el.getAttribute('data-magnetic') || '0.3');
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate3d(0px, 0px, 0)';
  };

  const handleScrollToSpecialties = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target =
      document.querySelector('#solucoes') || document.querySelector('#tratamentos');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToFrase = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector('#frase');
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* ==========================================================================
          SEÇÃO #hero — ABERTURA MONUMENTAL WOLFSTONE + RETRATO DRA. KÉRYDA RAMOS
          ========================================================================== */}
      <section
        id="hero"
        ref={heroRef}
        data-cloud="2.4,0.15"
        className={`relative min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-16 overflow-hidden flex flex-col justify-between ${
          heroRevealed ? 'is-revealed' : ''
        }`}
      >
        {/* Nuvem de Partículas Douradas Interativa ao Fundo */}
        <canvas
          ref={cloudCanvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 w-full h-full z-0 opacity-85"
        />

        {/* Halo Radial Sutil e Curvas Douradas Oficiais do Cartão KR */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(65% 55% at 62% 45%, rgba(197, 155, 100, 0.11) 0%, rgba(4, 11, 22, 0) 70%)',
          }}
        />
        <GoldCornerCurveTopRight className="hidden md:block pointer-events-none absolute top-24 right-7 w-52 lg:w-72 opacity-40 z-0" />
        <GoldCornerCurveBottomLeft className="hidden md:block pointer-events-none absolute bottom-16 left-7 w-64 lg:w-80 opacity-30 z-0" />

        {/* Container Central */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 sm:px-10 lg:px-14 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* COLUNA ESQUERDA (7 Colunas): Eyebrow .mono + Título Monumental .display + Lead Inter + 2 Botões Magnéticos */}
            <div className="lg:col-span-7 space-y-8">
              {/* Eyebrow .mono text-gold-300 */}
              <div className="inline-flex items-center gap-3.5 scroll-fade-up is-revealed">
                <span className="w-8 h-[1px] bg-gold-400/70" aria-hidden="true" />
                <p className="mono text-gold-300">
                  Odontologia Estética, Preventiva &amp; Reabilitação · CRO-GO 22911 · UFG
                </p>
              </div>

              {/* Título Monumental .display (text-[52px] sm:text-[78px] lg:text-[98px]) */}
              <h1 className="display text-[52px] sm:text-[78px] lg:text-[98px] text-[#F4F1EA]">
                <span className="line-mask">
                  <span
                    className="line-inner"
                    style={{ transitionDelay: '80ms' }}
                  >
                    Proteja e ilumine
                  </span>
                </span>
                <span className="line-mask">
                  <span
                    className="line-inner"
                    style={{ transitionDelay: '200ms' }}
                  >
                    seu <em>Sorriso.</em>
                  </span>
                </span>
              </h1>

              {/* Parágrafo lead limpo em Inter */}
              <p
                className="font-sans font-light text-base sm:text-lg text-alabaster-100/80 max-w-xl leading-relaxed scroll-fade-up is-revealed"
                style={{ transitionDelay: '320ms' }}
              >
                Realizamos{' '}
                <strong className="font-medium text-white">
                  clareamento dental seguro
                </strong>
                ,{' '}
                <strong className="font-medium text-white">
                  limpeza profunda (profilaxia)
                </strong>
                ,{' '}
                <strong className="font-medium text-white">
                  restaurações e facetas em resina composta
                </strong>{' '}
                e{' '}
                <strong className="font-medium text-white">
                  coroas em porcelana pura
                </strong>{' '}
                para pacientes que exigem naturalidade, conforto e{' '}
                <strong className="font-medium text-gold-300">
                  excelência de longo prazo
                </strong>
                . Você confiante em cada detalhe.
              </p>

              {/* Dois botões com data-magnetic="0.3" */}
              <div
                className="flex flex-wrap items-center gap-4 pt-2 scroll-fade-up is-revealed"
                style={{ transitionDelay: '440ms' }}
              >
                <button
                  type="button"
                  data-magnetic="0.3"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  onClick={() =>
                    onOpenBooking('Avaliação Odontológica com a Dra. Kéryda Ramos')
                  }
                  className="pill"
                >
                  <span>Fale conosco</span>
                </button>

                <a
                  href="#solucoes"
                  data-magnetic="0.3"
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  onClick={handleScrollToSpecialties}
                  className="pill pill--ghost"
                >
                  <span>Conhecer especialidades</span>
                </a>
              </div>
            </div>

            {/* COLUNA DIREITA (5 Colunas): Retrato Editorial da Dra. Kéryda Ramos integrado à atmosfera Wolfstone */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-[440px]">
                {/* Selo Giratório Oficial KR no Topo Direito */}
                <div className="hidden sm:block absolute -top-7 -right-6 z-30">
                  <RotatingGoldSeal size="md" />
                </div>

                {/* Moldura Editorial da Dra. Kéryda Ramos */}
                <div className="relative p-3 sm:p-4 rounded-2xl border border-gold-400/35 bg-[#061326]/85 backdrop-blur-md shadow-[0_30px_80px_-20px_rgba(0,0,0,0.75)]">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-navy-950">
                    <img
                      src="/assets/dra-keryda-retrato.jpg"
                      alt="Dra. Kéryda Ramos — Cirurgiã-Dentista CRO-GO 22911 · UFG"
                      fetchPriority="high"
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-1000 hover:scale-[1.02]"
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#040B16] via-[#040B16]/45 to-transparent"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Assinatura Editorial na Base do Retrato */}
                  <div className="pt-4 pb-1.5 px-2 flex items-center justify-between gap-4 border-t border-gold-400/20 mt-3">
                    <div>
                      <span className="font-sans text-sm sm:text-base font-semibold tracking-[0.16em] uppercase text-white block leading-none">
                        KÉRYDA RAMOS
                      </span>
                      <span className="mono text-[10px] sm:text-[11px] text-gold-300 block mt-1.5">
                        CRO-GO 22911 · UFG
                      </span>
                    </div>

                    <img
                      src="/assets/kr-monograma-ouro.png"
                      alt="Monograma KR"
                      className="w-9 h-9 object-contain shrink-0"
                    />
                  </div>
                </div>

                {/* Detalhe Flutuante Macro Sorriso Natural */}
                <div className="hidden sm:flex items-center gap-3.5 absolute -bottom-5 -left-7 z-30 rounded-2xl bg-[#040B16]/90 backdrop-blur-xl border border-gold-400/35 p-3 pr-5 max-w-[280px] shadow-2xl">
                  <img
                    src="/assets/smile-macro-hero.jpg"
                    alt="Detalhe macro de sorriso natural esculpido"
                    className="w-14 h-14 rounded-xl object-cover border border-gold-400/40 shrink-0"
                  />
                  <div>
                    <span className="mono text-[10px] text-gold-300 block">
                      Biomimética &amp; Brilho
                    </span>
                    <span className="font-sans font-light text-xs text-alabaster-100/90 leading-snug block mt-0.5">
                      Translucidez e textura fiéis ao dente natural.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador inferior .mono: scroll ↓ */}
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-5 sm:px-10 lg:px-14 pt-12 flex items-center justify-between">
          <a
            href="#frase"
            onClick={handleScrollToFrase}
            className="mono text-gold-300/90 hover:text-gold-300 transition-colors inline-flex items-center gap-2"
          >
            <span>scroll ↓</span>
          </a>

          <span className="hidden sm:inline-block mono text-alabaster-100/50">
            GOIÂNIA · ATENDIMENTO COM HORA MARCADA
          </span>
        </div>
      </section>

      {/* ==========================================================================
          SEÇÃO #frase — IMPACTO EDITORIAL PALAVRA POR PALAVRA (data-cloud="0,0")
          ========================================================================== */}
      <section
        id="frase"
        ref={fraseRef}
        data-cloud="0,0"
        className={`relative py-28 lg:py-36 px-5 sm:px-10 border-t border-b border-gold-400/15 overflow-hidden ${
          fraseRevealed ? 'is-revealed' : ''
        }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="display text-4xl sm:text-6xl lg:text-7xl text-center max-w-4xl mx-auto">
            <span className="block">
              {['Sorriso', 'não', 'se', 'improvisa.'].map((word, idx) => (
                <React.Fragment key={word + idx}>
                  <span
                    className="word-reveal"
                    style={{ transitionDelay: `${idx * 90}ms` }}
                  >
                    {word}
                  </span>
                  {idx < 3 ? ' ' : ''}
                </React.Fragment>
              ))}
            </span>

            <span className="block mt-2 sm:mt-3">
              {['Se', 'esculpe', 'com'].map((word, idx) => (
                <React.Fragment key={word + idx}>
                  <span
                    className="word-reveal"
                    style={{ transitionDelay: `${(idx + 4) * 90}ms` }}
                  >
                    {word}
                  </span>{' '}
                </React.Fragment>
              ))}
              <em>
                {['técnica', 'e', 'naturalidade.'].map((word, idx) => (
                  <React.Fragment key={word + idx}>
                    <span
                      className="word-reveal"
                      style={{ transitionDelay: `${(idx + 7) * 90}ms` }}
                    >
                      {word}
                    </span>
                    {idx < 2 ? ' ' : ''}
                  </React.Fragment>
                ))}
              </em>
            </span>
          </h2>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
