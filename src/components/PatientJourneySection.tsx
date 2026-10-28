import React from 'react';

interface PatientJourneySectionProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

interface WolfstoneJourneyStep {
  code: string;
  ghostNumber: string;
  title: string;
  description: string;
  detail: string;
}

const WOLFSTONE_STEPS: WolfstoneJourneyStep[] = [
  {
    code: '01 — Etapa',
    ghostNumber: '01',
    title: 'Diagnóstico & Escuta',
    description:
      'Você é atendido diretamente pela Dra. Kéryda Ramos, sem pressa. Avaliamos detalhadamente seus dentes, gengivas, mordida e ouvimos suas expectativas e prioridades clínicas.',
    detail: 'Atendimento individualizado com hora marcada',
  },
  {
    code: '02 — Etapa',
    ghostNumber: '02',
    title: 'Planejamento Transparente',
    description:
      'Explicamos de forma clara e visual o que realmente precisa ser feito — diferenciando o que é prioridade de saúde gengival, recuperação estrutural e refinamento estético.',
    detail: 'Clareza absoluta em cada decisão terapêutica',
  },
  {
    code: '03 — Etapa',
    ghostNumber: '03',
    title: 'Execução de Mãos Leves',
    description:
      'Procedimentos realizados com técnicas anestésicas cuidadosas, isolamento preciso, materiais cerâmicos e resinas nanoparticuladas que respeitam a biologia do seu sorriso.',
    detail: 'Conforto clínico, biossegurança e naturalidade',
  },
  {
    code: '04 — Etapa',
    ghostNumber: '04',
    title: 'Acompanhamento & Prevenção',
    description:
      'Polimento espelhado, ajuste fino da oclusão e programa preventivo periódico para preservar a saúde periodontal, o brilho do clareamento e a integridade das restaurações.',
    detail: 'Longevidade funcional e proteção contínua',
  },
];

export const PatientJourneySection: React.FC<PatientJourneySectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section
      id="jornada"
      className="py-24 lg:py-32 border-t border-b border-current/10 relative overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 lg:px-16 space-y-16">
        {/* Cabeçalho Wolfstone: Eyebrow .mono + Headline .display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-current/15">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3.5">
              <span className="w-8 h-[1px] bg-[#C59B64]" />
              <span className="mono text-[#966D3B]">Como trabalhamos</span>
            </div>

            <h2 className="display text-4xl sm:text-6xl lg:text-7xl">
              Do diagnóstico <em>à transformação</em>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="font-sans text-base opacity-80 leading-relaxed">
              Um método clínico estruturado em quatro etapas para garantir previsibilidade,
              conforto absoluto e preservação máxima da estrutura natural dos seus dentes.
            </p>
          </div>
        </div>

        {/* Lista Numerada com 4 Etapas (01 — Etapa a 04 — Etapa), Número Fantasma Grande em .display e Títulos em Inter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {WOLFSTONE_STEPS.map((step) => (
            <article
              key={step.ghostNumber}
              className="relative rounded-3xl border border-[#061325]/12 bg-white/85 backdrop-blur-md p-7 sm:p-8 text-[#061325] shadow-[0_24px_60px_-20px_rgba(4,11,22,0.07)] overflow-hidden flex flex-col justify-between min-h-[340px] group hover:border-[#C59B64]/60 transition-colors"
            >
              {/* Número Fantasma Grande em .display */}
              <span
                className="display absolute -right-2 -bottom-6 text-[7.5rem] sm:text-[8.5rem] leading-none text-[#C59B64]/12 pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
                aria-hidden="true"
              >
                {step.ghostNumber}
              </span>

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between border-b border-[#061325]/10 pb-4">
                  <span className="mono text-[#966D3B]">{step.code}</span>
                  <span className="w-2 h-2 rounded-full bg-[#C59B64]" />
                </div>

                <h3 className="font-sans text-xl sm:text-2xl font-semibold tracking-tight text-[#061325] leading-snug">
                  {step.title}
                </h3>

                <p className="font-sans text-sm sm:text-[15px] text-[#061325]/80 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="relative z-10 pt-5 mt-6 border-t border-[#061325]/10">
                <span className="mono text-[11px] text-[#966D3B] block">
                  ✦ {step.detail}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Barra de Conversão Final da Jornada */}
        <div className="rounded-3xl bg-[#040B16] text-[#F4F1EA] border border-[#C59B64]/35 p-8 sm:p-11 flex flex-col lg:flex-row lg:items-center justify-between gap-8 shadow-[0_24px_60px_-20px_rgba(4,11,22,0.35)]">
          <div className="space-y-2 max-w-2xl">
            <span className="mono text-[#E5C99B] block">
              Atendimento Exclusivo • CRO-GO 22911
            </span>
            <h3 className="display text-3xl sm:text-4xl text-[#F4F1EA]">
              Inicie sua jornada clínica com <em>tranquilidade e hora marcada.</em>
            </h3>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking('Agendamento de Consulta Inicial / Diagnóstico')}
            className="pill shrink-0"
          >
            <span>Agendar Consulta Diagnóstica</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
