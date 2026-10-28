import React, { useState } from 'react';
import { TESTIMONIALS_DATA, FAQ_ITEMS } from '../data/dentalData';

interface TestimonialsAndFaqSectionProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

export const TestimonialsAndFaqSection: React.FC<TestimonialsAndFaqSectionProps> = ({
  onOpenBooking,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section
      id="duvidas"
      className="py-24 lg:py-32 border-b border-current/10 relative overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 lg:px-16 space-y-28">
        {/* ==========================================================================
            PARTE 1: QUEM CONFIA — GRANDES CITAÇÕES EDITORIAIS .DISPLAY + AUTOR .MONO
            ========================================================================== */}
        <div className="space-y-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-current/15">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-3.5">
                <span className="w-8 h-[1px] bg-[#C59B64]" />
                <span className="mono text-[#966D3B]">Quem confia</span>
              </div>

              <h2 className="display text-4xl sm:text-6xl lg:text-7xl">
                A palavra de quem vive a <em>nossa odontologia.</em>
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="font-sans text-base opacity-80 leading-relaxed">
                Relatos reais de pacientes acompanhados pela Dra. Kéryda Ramos em protocolos de
                clareamento, profilaxia, facetas em resina e reabilitação em porcelana.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {TESTIMONIALS_DATA.map((item, idx) => (
              <article
                key={idx}
                className="rounded-3xl border border-[#061325]/12 bg-white/90 text-[#061325] p-8 sm:p-10 shadow-[0_24px_60px_-20px_rgba(4,11,22,0.07)] flex flex-col justify-between space-y-8"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="display text-5xl text-[#C59B64] leading-none">
                      “
                    </span>
                    <span className="mono text-[#966D3B]">0{idx + 1}</span>
                  </div>

                  <blockquote className="display text-2xl sm:text-[28px] leading-[1.28] text-[#061325]">
                    {item.quote}
                  </blockquote>
                </div>

                <footer className="pt-6 border-t border-[#061325]/10 space-y-1.5">
                  <span className="mono text-[#061325] font-medium block">
                    {item.name}
                  </span>
                  <span className="mono text-[#966D3B] block">
                    {item.procedure}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </div>

        {/* ==========================================================================
            PARTE 2: PERGUNTAS FREQUENTES — TUDO QUE VOCÊ PRECISA SABER (MÓDULO 3177)
            ========================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Coluna Editorial Esquerda */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-[1px] bg-[#C59B64]" />
              <span className="mono text-[#966D3B]">Perguntas frequentes</span>
            </div>

            <h3 className="display text-4xl sm:text-6xl leading-[0.98]">
              Tudo que você <em>precisa saber</em>
            </h3>

            <p className="font-sans text-base opacity-80 leading-relaxed">
              Esclarecimentos diretos da Dra. Kéryda Ramos sobre sensibilidade no clareamento,
              durabilidade de resinas e porcelanas, periodicidade da limpeza e consulta inicial.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenBooking('Dúvida Direta com a Dra. Kéryda Ramos')}
                className="pill"
              >
                <span>Falar Diretamente pelo WhatsApp</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          {/* Coluna Direita: Acordeão Numerado 01 a 06 (Módulo 3177 Wolfstone) */}
          <div className="lg:col-span-7 border-t border-current/15 divide-y divide-current/15">
            {FAQ_ITEMS.slice(0, 6).map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const numLabel = `0${idx + 1}`;
              return (
                <div key={idx} className="py-2">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full text-left py-5 flex items-center justify-between gap-6 group"
                  >
                    <div className="flex items-baseline gap-5">
                      <span className="mono text-[#966D3B] shrink-0">
                        {numLabel}
                      </span>
                      <span className="font-sans text-lg sm:text-xl font-medium tracking-tight group-hover:text-[#966D3B] transition-colors leading-snug">
                        {faq.question}
                      </span>
                    </div>

                    <span
                      className={`w-9 h-9 rounded-full border border-current/20 flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#040B16] text-[#E5C99B] border-[#040B16] rotate-180'
                          : 'group-hover:border-[#C59B64]'
                      }`}
                      aria-hidden="true"
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 pb-6'
                        : 'grid-rows-[0fr] opacity-0 pb-0'
                    }`}
                  >
                    <div className="overflow-hidden pl-10 sm:pl-12 pr-4">
                      <p className="font-sans text-base opacity-85 leading-[1.75]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
