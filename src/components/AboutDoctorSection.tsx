import React, { useEffect, useRef } from 'react';
import { DOCTOR_INFO } from '../data/dentalData';

export interface AboutDoctorSectionProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

const MARQUEE_ITEMS = [
  'Clareamento Dental',
  'Limpeza & Profilaxia',
  'Facetas em Resina',
  'Restaurações Estéticas',
  'Coroas em Porcelana',
  'Reabilitação Oral',
  'Prevenção Periodontal',
];

export const AboutDoctorSection: React.FC<AboutDoctorSectionProps> = ({ onOpenBooking }) => {
  const parallaxFrameRef = useRef<HTMLDivElement | null>(null);
  const marqueeRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    let rafId = 0;
    let lastScrollY = window.scrollY;
    let marqueeOffset = 0;
    let scrollVelocity = 0;

    const tick = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      scrollVelocity = scrollVelocity * 0.88 + delta * 0.12;

      // Parallax para about-media__frame [data-parallax="45"]
      const frameEl = parallaxFrameRef.current;
      if (frameEl) {
        const rect = frameEl.getBoundingClientRect();
        const viewportH = window.innerHeight || 1;
        const centerOffset = (rect.top + rect.height * 0.5 - viewportH * 0.5) / viewportH;
        const strength = Number(frameEl.getAttribute('data-parallax') || 45);
        const y = Math.max(-strength, Math.min(strength, -centerOffset * strength));
        frameEl.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`;
      }

      // Marquee horizontal acelerado pelo scroll [data-marquee] -> .marquee__row
      const rowEl = marqueeRowRef.current;
      if (rowEl) {
        const baseSpeed = 0.45;
        const boost = Math.min(8, Math.abs(scrollVelocity) * 0.35);
        const direction = scrollVelocity < -0.5 ? 1 : -1;
        marqueeOffset += direction * (baseSpeed + boost);

        const halfWidth = rowEl.scrollWidth / 2;
        if (halfWidth > 0) {
          if (marqueeOffset <= -halfWidth) {
            marqueeOffset += halfWidth;
          } else if (marqueeOffset > 0) {
            marqueeOffset -= halfWidth;
          }
        }
        rowEl.style.transform = `translate3d(${marqueeOffset.toFixed(2)}px, 0, 0)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const repeatedMarquee = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <section
      id="sobre"
      data-cloud="-2.2,0.1"
      className="relative py-28 lg:py-40 border-b border-gold-500/20 overflow-hidden"
    >
      {/* Âncora auxiliar para compatibilidade de navegação */}
      <div id="sobre-doutora" className="sr-only" aria-hidden="true" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 lg:px-16 space-y-20 lg:space-y-28">
        {/* TOPO EDITORIAL: Eyebrow .mono + Subtítulo + Headline .display */}
        <div className="space-y-8 max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <span className="mono text-gold-300 flex items-center gap-3">
              <span className="w-8 h-px bg-gold-400/70 inline-block" aria-hidden="true" />
              consultório &amp; direção clínica
            </span>
            <span className="hidden sm:inline-block text-gold-500/40">—</span>
            <p className="text-sm sm:text-base text-[#F4F1EA]/75 font-light">
              O atendimento odontológico boutique que cuida da saúde, da função e da beleza natural do seu sorriso
            </p>
          </div>

          <h2
            className="display text-4xl sm:text-6xl lg:text-[68px] leading-[0.98] text-[#F4F1EA]"
            data-split="lines"
          >
            <span className="block">Cada tratamento é</span>
            <span className="block">desenhado e executado</span>
            <span className="block">
              <em>exclusivamente para o seu caso</em>
            </span>
          </h2>
        </div>

        {/* TEXTO EDITORIAL EM 2 COLUNAS + TRÍADE .mono text-gold-300 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-6 border-t border-gold-500/20">
          {/* Coluna de Identificação & Tríade */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="mono text-gold-300 block">Direção Clínica</span>
              <h3 className="display text-3xl sm:text-4xl text-[#F4F1EA]">
                {DOCTOR_INFO.name}
              </h3>
              <p className="mono text-gold-400/90 text-[11px] pt-1">
                {DOCTOR_INFO.role} · {DOCTOR_INFO.cro} · UFG
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-gold-500/25 bg-[#061326]/70 backdrop-blur-md space-y-3">
              <span className="mono text-gold-300 block">
                Naturalidade · Técnica · Conforto
              </span>
              <p className="text-xs sm:text-sm text-[#F4F1EA]/75 leading-relaxed font-light">
                Filosofia clínica fundamentada na preservação biológica do esmalte, no rigor
                científico e na escuta individualizada.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() =>
                  onOpenBooking('Consulta de Avaliação com a Dra. Kéryda Ramos (CRO-GO 22911)')
                }
                className="pill"
                data-magnetic
              >
                <span>Agendar avaliação individual</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* 2 Colunas Editoriais sobre a Trajetória da Dra. Kéryda Ramos */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 text-base sm:text-[17px] text-[#F4F1EA]/85 leading-[1.8] font-light">
            <div className="space-y-5">
              <p>
                Cirurgiã-Dentista graduada pela{' '}
                <strong className="font-medium text-[#F4F1EA]">
                  Universidade Federal de Goiás — UFG
                </strong>{' '}
                (<strong className="font-medium text-gold-300">CRO-GO 22911</strong>), a{' '}
                <strong className="font-medium text-[#F4F1EA]">Dra. Kéryda Ramos</strong> construiu
                sua atuação clínica unindo formação acadêmica de excelência, diagnóstico ético e
                domínio atualizado dos materiais restauradores e cerâmicos mais nobres da
                odontologia contemporânea.
              </p>
              <p>
                Longe do modelo de clínicas massificadas, seu consultório foi concebido como um
                espaço de atendimento artesanal e reservado com hora marcada — onde cada paciente é
                acompanhado pessoalmente pela doutora do primeiro exame clínico ao polimento final.
              </p>
            </div>

            <div className="space-y-5 flex flex-col justify-between">
              <div className="space-y-5">
                <p>
                  Com mãos leves, protocolos modernos de controle de sensibilidade e visão de longo
                  prazo, cada intervenção — do clareamento dental seguro e profilaxia por ultrassom
                  às facetas em resina composta e coroas em porcelana pura — respeita a biologia e a
                  identidade facial do paciente.
                </p>
                <p>
                  O resultado é uma odontologia silenciosa e sofisticada: dentes saudáveis, função
                  mastigatória equilibrada e uma estética translúcida que parece ter nascido com
                  você.
                </p>
              </div>

              <div className="pt-4 border-t border-gold-500/20 flex items-center justify-between gap-4">
                <span className="mono text-gold-300">
                  Naturalidade · Técnica · Conforto
                </span>
                <span className="mono text-[#F4F1EA]/60">UFG · {DOCTOR_INFO.cro}</span>
              </div>
            </div>
          </div>
        </div>

        {/* MOLDURA FOTOGRÁFICA PARALLAX (about-media__frame com data-parallax="45") */}
        <div className="about-media space-y-5">
          <div
            ref={parallaxFrameRef}
            className="about-media__frame relative rounded-[24px] p-4 sm:p-6 lg:p-8 border border-gold-500/30 bg-[#051020]/90 shadow-2xl overflow-hidden will-change-transform"
            data-parallax="45"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              {/* Fotografia 1: Retrato Real de Estúdio da Dra. Kéryda Ramos (Jaleco bordado & brasão UFG) */}
              <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-gold-500/35 bg-[#040B16]">
                <div className="aspect-[4/5] w-full h-full overflow-hidden relative">
                  <img
                    src="/assets/dra-keryda-retrato.jpg"
                    alt="Dra. Kéryda Ramos — Cirurgiã-Dentista CRO-GO 22911 formada pela Universidade Federal de Goiás (UFG)"
                    loading="lazy"
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#040B16]/90 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="mono text-[10px] px-3 py-1.5 rounded-full bg-[#040B16]/80 backdrop-blur-md text-gold-300 border border-gold-500/35">
                      CRO-GO 22911
                    </span>
                    <span className="mono text-[10px] px-3 py-1.5 rounded-full bg-[#040B16]/80 backdrop-blur-md text-[#F4F1EA] border border-gold-500/30">
                      UFG
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="display text-2xl sm:text-3xl text-[#F4F1EA] block leading-none">
                        Dra. Kéryda Ramos
                      </span>
                      <span className="mono text-[10px] text-gold-300 block mt-1.5">
                        Cirurgiã-Dentista · Formada pela UFG
                      </span>
                    </div>
                    <img
                      src="/assets/kr-monograma-ouro.png"
                      alt="Monograma KR"
                      className="w-9 h-9 object-contain shrink-0"
                    />
                  </div>
                </div>
              </div>

              {/* Fotografia 2: Ambiente Clínico Boutique em Travertino */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div className="relative group overflow-hidden rounded-2xl border border-gold-500/30 bg-[#040B16] flex-1 min-h-[280px] sm:min-h-[360px]">
                  <img
                    src="/assets/patient-travertine-clinic.jpg"
                    alt="Consultório odontológico boutique da Dra. Kéryda Ramos com arquitetura em travertino e luz natural"
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-[1.03]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#040B16]/85 via-[#040B16]/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-5 left-5 right-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div className="space-y-1">
                      <span className="mono text-gold-300 block">
                        Arquitetura do Cuidado
                      </span>
                      <p className="display text-2xl sm:text-3xl text-[#F4F1EA]">
                        Hora marcada, escuta sem pressa e rigor em biossegurança.
                      </p>
                    </div>
                    <span className="mono text-[10px] text-gold-300/90 shrink-0 px-3 py-1.5 rounded-full border border-gold-400/35 bg-[#040B16]/75">
                      Atendimento Individualizado
                    </span>
                  </div>
                </div>

                {/* Destaques da Estrutura Clínica */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-gold-500/20 bg-[#040B16]/75">
                    <span className="mono text-gold-300 block text-[10px]">01 · Formação</span>
                    <span className="display text-xl text-[#F4F1EA] block mt-1">
                      Graduação UFG
                    </span>
                    <span className="text-xs text-[#F4F1EA]/70 block mt-0.5">
                      Base científica federal e atualização contínua.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-gold-500/20 bg-[#040B16]/75">
                    <span className="mono text-gold-300 block text-[10px]">02 · Exclusividade</span>
                    <span className="display text-xl text-[#F4F1EA] block mt-1">
                      Hora Marcada
                    </span>
                    <span className="text-xs text-[#F4F1EA]/70 block mt-0.5">
                      Tempo reservado exclusivamente para você.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl border border-gold-500/20 bg-[#040B16]/75">
                    <span className="mono text-gold-300 block text-[10px]">03 · Biomimética</span>
                    <span className="display text-xl text-[#F4F1EA] block mt-1">
                      Mãos Leves
                    </span>
                    <span className="text-xs text-[#F4F1EA]/70 block mt-0.5">
                      Controle de sensibilidade e estética natural.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legenda .mono Oficial */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <p className="about-media__caption mono text-gold-300">
              Dra. Kéryda Ramos — Cirurgiã-Dentista CRO-GO 22911 · Formada pela UFG
            </p>
            <span className="mono text-[#F4F1EA]/50">
              Naturalidade · Técnica · Conforto
            </span>
          </div>
        </div>
      </div>

      {/* MARQUEE HORIZONTAL ACELERADO PELO SCROLL (data-marquee) */}
      <div
        className="mt-20 lg:mt-28 pt-10 border-t border-gold-500/20 space-y-5 overflow-hidden"
        data-marquee
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-10 lg:px-16">
          <p className="mono text-gold-300">
            Para quem valoriza saúde bucal e estética sem exageros
          </p>
        </div>

        <div className="relative w-full overflow-hidden py-3 bg-[#030913]/70 border-y border-gold-500/20">
          <div
            ref={marqueeRowRef}
            className="marquee__row flex items-center whitespace-nowrap will-change-transform select-none"
          >
            {repeatedMarquee.map((item, idx) => (
              <span key={idx} className="inline-flex items-center">
                <span className="display text-2xl sm:text-3xl lg:text-4xl text-[#F4F1EA]/90 px-5 sm:px-7">
                  {item}
                </span>
                <span className="text-gold-400 text-lg sm:text-xl" aria-hidden="true">
                  ·
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutDoctorSection;
