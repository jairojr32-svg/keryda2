import React, { useState } from 'react';
import { SYMPTOM_GUIDE, SymptomOption } from '../data/dentalData';

interface SymptomGuideAndComparisonSectionProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

export const SymptomGuideAndComparisonSection: React.FC<
  SymptomGuideAndComparisonSectionProps
> = ({ onOpenBooking }) => {
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(SYMPTOM_GUIDE[0].id);

  const currentSymptom: SymptomOption =
    SYMPTOM_GUIDE.find((s) => s.id === selectedSymptomId) || SYMPTOM_GUIDE[0];

  return (
    <section
      id="guia-sorriso"
      className="py-24 lg:py-32 fluted-alabaster text-navy-950 border-b border-gold-500/30"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 lg:px-16 space-y-14">
        {/* Cabeçalho */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-navy-950/15">
          <div className="lg:col-span-7 space-y-3.5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-[1.5px] bg-gold-600" />
              <span className="typo-eyebrow text-gold-600">
                Orientação Clínica Personalizada
              </span>
            </div>
            <h2 className="typo-section-title text-navy-950">
              O que o seu sorriso{' '}
              <span className="font-serif italic font-normal text-gold-600">
                precisa hoje?
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="font-sans text-base text-navy-800 leading-relaxed">
              Selecione abaixo a sua prioridade atual para visualizar a recomendação clínica da
              Dra. Kéryda Ramos e iniciar seu agendamento direcionado:
            </p>
          </div>
        </div>

        {/* Painel de Diagnóstico Preliminar com Tipografia Nítida */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-2xl overflow-hidden border border-navy-950/20 shadow-editorial bg-white">
          {/* Coluna Esquerda (5 cols): Lista de Necessidades */}
          <div className="lg:col-span-5 divide-y divide-alabaster-200 border-b lg:border-b-0 lg:border-r border-navy-950/15">
            {SYMPTOM_GUIDE.map((item, idx) => {
              const active = item.id === currentSymptom.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedSymptomId(item.id)}
                  className={`w-full text-left p-6 transition-all duration-300 flex items-start gap-4 ${
                    active
                      ? 'bg-[#040D1A] text-white'
                      : 'bg-white hover:bg-alabaster-100/70 text-navy-950'
                  }`}
                >
                  <span
                    className={`typo-number text-base font-semibold shrink-0 mt-0.5 ${
                      active ? 'text-gold-400' : 'text-gold-600'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    className={`font-display text-base sm:text-lg leading-snug ${
                      active ? 'text-white font-semibold' : 'text-navy-950 font-medium'
                    }`}
                  >
                    {item.question}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Coluna Direita (7 cols): Prescrição de Conduta Clínica */}
          <div className="lg:col-span-7 bg-[#040D1A] text-white p-7 sm:p-11 lg:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-7">
              <div className="flex items-center justify-between border-b border-gold-500/25 pb-4">
                <span className="typo-eyebrow text-gold-400">
                  Recomendação Clínica • Dra. Kéryda Ramos
                </span>
                <span className="font-display text-xs font-semibold text-gold-300 tracking-wider">
                  CRO-GO 22911
                </span>
              </div>

              <div className="space-y-1.5">
                <span className="font-display text-xs uppercase tracking-[0.14em] text-alabaster-300 font-medium block">
                  Situação Relatada
                </span>
                <p className="font-sans text-base sm:text-lg text-gold-300 font-medium">
                  {currentSymptom.situation}
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-xl border border-gold-500/35 bg-[#07162B]/85 space-y-3">
                <span className="font-display text-xs uppercase tracking-[0.16em] text-gold-400 font-semibold block">
                  Procedimento Indicado
                </span>
                <h3 className="typo-card-title text-white">
                  {currentSymptom.recommendedTreatment}
                </h3>
                <p className="font-sans text-base text-alabaster-100/90 leading-[1.75] pt-1">
                  {currentSymptom.explanation}
                </p>
              </div>

              <div className="border-l-2 border-gold-400 pl-5 py-1">
                <p className="font-sans text-sm text-alabaster-300 leading-relaxed">
                  <strong className="font-display text-white font-semibold uppercase tracking-[0.12em] text-xs block mb-1">
                    Orientação da Dra. Kéryda:
                  </strong>
                  {currentSymptom.careNote}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gold-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="font-sans text-xs sm:text-sm text-alabaster-300">
                Diagnóstico confirmado presencialmente no consultório
              </span>

              <button
                type="button"
                onClick={() => onOpenBooking(currentSymptom.whatsappSubject)}
                className="rounded-full gold-metallic-gradient hover:brightness-110 text-navy-950 font-display font-semibold text-xs sm:text-[13px] uppercase tracking-[0.16em] px-8 py-4 shadow-gold-button transition-all shrink-0"
              >
                Agendar Esta Avaliação
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
