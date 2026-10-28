import React, { useRef, useState } from 'react';
import { DOCTOR_INFO } from '../data/dentalData';

export interface TreatmentsAtelierSectionProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

interface ClinicalStepSpec {
  stepNumber: string;
  title: string;
  detail: string;
}

interface ServiceCardSpec {
  code: string;
  id: string;
  category: string;
  title: string;
  photo: string;
  photoAlt: string;
  description: string;
  preservationSpec: string;
  comfortSpec: string;
  sessionInfo: string;
  indications: string[];
  clinicalSteps: ClinicalStepSpec[];
  bookingSubject: string;
}

const SERVICES_SOLUTIONS: ServiceCardSpec[] = [
  {
    code: '01',
    id: 'clareamento-dental-seguro',
    category: 'Estética Conservadora',
    title: 'Clareamento Dental Seguro',
    photo: '/assets/patient-editorial-navy.jpg',
    photoAlt:
      'Sorriso luminoso e natural após protocolo de clareamento dental seguro com a Dra. Kéryda Ramos',
    description:
      'Clareamento de consultório e supervisionado com barreira gengival e protocolo dessensibilizante para devolver o branco natural sem desgastar o esmalte.',
    preservationSpec: '100% Conservador · Zero Desgaste',
    comfortSpec: 'Protocolo Dessensibilizante Ativo',
    sessionInfo: '1 a 3 sessões clínicas + acompanhamento personalizado',
    indications: [
      'Dentes amarelados ou escurecidos pelo tempo, café, chá ou vinho',
      'Rejuvenescimento do sorriso mantendo 100% do formato natural dos dentes',
      'Preparo óptico prévio antes de renovar resinas ou confeccionar cerâmicas',
    ],
    clinicalSteps: [
      {
        stepNumber: '01',
        title: 'Diagnóstico Óptico & Profilaxia Prévia',
        detail:
          'Avaliação de trincas, retrações gengivais e remoção de biofilme superficial para ação uniforme do gel clareador.',
      },
      {
        stepNumber: '02',
        title: 'Blindagem Neural Dessensibilizante',
        detail:
          'Aplicação prévia de agentes remineralizantes e bloqueadores de sensibilidade para máximo conforto clínico.',
      },
      {
        stepNumber: '03',
        title: 'Aplicação Clínica & Supervisionada',
        detail:
          'Sessão em consultório com barreira gengival fotopolimerizável associada ou não a moldeiras personalizadas.',
      },
      {
        stepNumber: '04',
        title: 'Polimento do Esmalte & Estabilização',
        detail:
          'Hidratação mineral e orientações de longevidade para preservar a luminosidade natural conquistada.',
      },
    ],
    bookingSubject: 'Avaliação para Clareamento Dental Seguro — Dra. Kéryda Ramos',
  },
  {
    code: '02',
    id: 'limpeza-profunda-profilaxia',
    category: 'Prevenção & Periodontia',
    title: 'Limpeza Profunda & Profilaxia',
    photo: '/assets/patient-travertine-clinic.jpg',
    photoAlt:
      'Consultório odontológico em travertino preparado para profilaxia profunda por ultrassom',
    description:
      'Remoção delicada de tártaro e biofilme por ultrassom de baixa vibração, jato profilático, polimento coronário e prevenção de gengivite.',
    preservationSpec: 'Proteção Integral do Esmalte e Gengiva',
    comfortSpec: 'Ultrassom de Baixa Vibração & Mãos Leves',
    sessionInfo: 'Sessão completa de 45 a 60 minutos (ideal a cada 6 meses)',
    indications: [
      'Manutenção preventiva semestral para saúde gengival e hálito puro',
      'Presença de tártaro, placa bacteriana aderida ou manchas extrínsecas',
      'Sangramento gengival ao escovar ou usar o fio dental (gengivite)',
    ],
    clinicalSteps: [
      {
        stepNumber: '01',
        title: 'Mapeamento Clínico & Periodontal',
        detail:
          'Inspeção detalhada de dentes, gengivas e restaurações antigas para identificar pontos de inflamação ou infiltração.',
      },
      {
        stepNumber: '02',
        title: 'Raspagem Ultrassônica Delicada',
        detail:
          'Remoção precisa de cálculo dental (tártaro) supragengival e subgengival com pontas finas de baixa vibração.',
      },
      {
        stepNumber: '03',
        title: 'Jato Profilático & Polimento Coronário',
        detail:
          'Eliminação de pigmentos superficiais e alisamento espelhado do esmalte com pastas profiláticas.',
      },
      {
        stepNumber: '04',
        title: 'Fluorterapia & Guia de Higiene',
        detail:
          'Reforço mineral do esmalte e orientação personalizada de escovação e fio dental para sua rotina.',
      },
    ],
    bookingSubject: 'Agendamento de Limpeza Profunda & Profilaxia — Dra. Kéryda Ramos',
  },
  {
    code: '03',
    id: 'facetas-restauracoes-resina',
    category: 'Dentística Biomimética',
    title: 'Facetas & Restaurações em Resina',
    photo: '/assets/real-resina-after.jpg',
    photoAlt:
      'Macro fotografia clínica real de restauração estética e facetas em resina composta nanoparticulada',
    description:
      'Escultura anatômica em resina composta nanoparticulada para reconstruir dentes cariados ou fraturados, fechar diastemas e renovar restaurações antigas.',
    preservationSpec: 'Adesivo & Minimamente Invasivo',
    comfortSpec: 'Resultado Imediato em Consultório',
    sessionInfo: 'Realizado em 1 sessão clínica por região planejada',
    indications: [
      'Dentes com cáries, fraturas, bordas lascadas ou restaurações antigas manchadas',
      'Fechamento de espaços entre os dentes (diastemas) e reanatomização estética',
      'Substituição de restaurações escuras por resina invisível de alto brilho',
    ],
    clinicalSteps: [
      {
        stepNumber: '01',
        title: 'Seleção Óptica de Cor & Matiz',
        detail:
          'Mapeamento da dentina, esmalte e opalescência sob luz calibrada antes da desidratação dental.',
      },
      {
        stepNumber: '02',
        title: 'Preparo Conservador & Isolamento',
        detail:
          'Remoção exclusiva do tecido comprometido ou resina antiga deficiente, preservando o dente sadio.',
      },
      {
        stepNumber: '03',
        title: 'Estratificação Anatômica Artesanal',
        detail:
          'Escultura camada por camada devolvendo pontos de contato, anatomia mastigatória e microrrelevo natural.',
      },
      {
        stepNumber: '04',
        title: 'Polimento Espelhado de Alta Performance',
        detail:
          'Sequência de discos e pastas diamantadas para textura e brilho idênticos ao esmalte biológico.',
      },
    ],
    bookingSubject: 'Avaliação para Facetas & Restaurações em Resina — Dra. Kéryda Ramos',
  },
  {
    code: '04',
    id: 'coroas-porcelana-pura',
    category: 'Prótese & Cerâmica Pura',
    title: 'Coroas em Porcelana Pura',
    photo: '/assets/smile-macro-hero.jpg',
    photoAlt:
      'Macro fotografia de sorriso reabilitado com cerâmica pura translúcida e naturalidade gengival',
    description:
      'Coroas e blocos cerâmicos (dissilicato de lítio e zircônia) livres de metal para devolver resistência mastigatória e estética translúcida a dentes fragilizados.',
    preservationSpec: 'Reforço Biomecânico de Longa Duração',
    comfortSpec: 'Provisório Estético Imediato',
    sessionInfo: 'Planejamento + etapas clínicas com provisório confortável',
    indications: [
      'Dentes fragilizados após tratamento de canal ou com extensa perda estrutural',
      'Troca de coroas antigas com cinta metálica escura aparente na gengiva',
      'Blocos cerâmicos (Onlays/Inlays) para reconstruir dentes posteriores com segurança',
    ],
    clinicalSteps: [
      {
        stepNumber: '01',
        title: 'Diagnóstico Estrutural & Planejamento',
        detail:
          'Avaliação clínica e radiográfica do remanescente dentário, suporte periodontal e encaixe da mordida.',
      },
      {
        stepNumber: '02',
        title: 'Preparo Preciso & Provisório Imediato',
        detail:
          'Adequação conservadora do dente e instalação imediata de provisório estético para total conforto.',
      },
      {
        stepNumber: '03',
        title: 'Moldagem de Precisão & Cerâmica Sob Medida',
        detail:
          'Cópia fiel do perfil gengival e confecção laboratorial em dissilicato de lítio ou zircônia translúcida.',
      },
      {
        stepNumber: '04',
        title: 'Prova Estética & Cimentação Adesiva',
        detail:
          'Conferência rigorosa de cor, ponto de contato e oclusão antes da cimentação definitiva.',
      },
    ],
    bookingSubject: 'Avaliação para Coroas em Porcelana Pura — Dra. Kéryda Ramos',
  },
  {
    code: '05',
    id: 'recuperacao-oral-bruxismo',
    category: 'Oclusão & Reabilitação',
    title: 'Recuperação Oral & Bruxismo',
    photo: '/assets/patient-vogue-portrait.jpg',
    photoAlt:
      'Paciente com harmonia facial, conforto muscular e sorriso funcionalmente reabilitado',
    description:
      'Reabilitação funcional da mordida, tratamento de desgaste dental severo, controle de sensibilidade e confecção de placas miorrelaxantes sob medida.',
    preservationSpec: 'Proteção Oclusal & Muscular',
    comfortSpec: 'Alívio de Tensão & Sensibilidade',
    sessionInfo: 'Cronograma personalizado conforme necessidade funcional',
    indications: [
      'Apertamento ou ranger de dentes noturno/diurno (bruxismo) e fadiga facial',
      'Desgaste nas bordas dos dentes, trincas de esmalte ou retrações cervicais sensíveis',
      'Reabilitação integrada da altura da mordida e função mastigatória',
    ],
    clinicalSteps: [
      {
        stepNumber: '01',
        title: 'Análise Oclusal & Muscular',
        detail:
          'Identificação dos pontos de sobrecarga mastigatória, facetas de desgaste e causas de sensibilidade.',
      },
      {
        stepNumber: '02',
        title: 'Controle de Sensibilidade & Proteção Cervical',
        detail:
          'Selamento de dentina exposta e restauração de lesões cervicais causadas por tensão oclusal.',
      },
      {
        stepNumber: '03',
        title: 'Reconstrução Anatômica das Guias',
        detail:
          'Devolução do comprimento e das guias funcionais dos dentes desgastados com materiais de alta resistência.',
      },
      {
        stepNumber: '04',
        title: 'Placa Miorrelaxante Rígida Sob Medida',
        detail:
          'Confecção e ajuste oclusal fino de placa protetora individualizada para preservar dentes e articulação.',
      },
    ],
    bookingSubject: 'Avaliação para Recuperação Oral & Bruxismo — Dra. Kéryda Ramos',
  },
  {
    code: '06',
    id: 'checkup-preventivo-urgencias',
    category: 'Diagnóstico & Cuidado Integral',
    title: 'Check-up Preventivo & Urgências',
    photo: '/assets/dra-keryda-editorial.jpg',
    photoAlt:
      'Dra. Kéryda Ramos em atendimento clínico diagnóstico individualizado e acolhedor',
    description:
      'Diagnóstico clínico detalhado, planejamento por prioridades e atendimento acolhedor para alívio imediato de desconfortos e manutenção semestral.',
    preservationSpec: 'Diagnóstico Precoce & Ético',
    comfortSpec: 'Escuta Sem Pressa & Anestesia Delicada',
    sessionInfo: 'Atendimento com hora marcada e prioridade para alívio de dor',
    indications: [
      'Primeira consulta para avaliação completa da saúde bucal e plano organizado',
      'Dor de dente, sensibilidade aguda ao frio/quente, fratura súbita ou restauração solta',
      'Pacientes que desejam retomar o cuidado odontológico com tranquilidade e sem julgamentos',
    ],
    clinicalSteps: [
      {
        stepNumber: '01',
        title: 'Escuta Acolhedora & Alívio Imediato',
        detail:
          'Compreensão atenta da sua queixa principal e intervenção imediata caso haja qualquer dor ou desconforto.',
      },
      {
        stepNumber: '02',
        title: 'Exame Clínico Minucioso Dente a Dente',
        detail:
          'Verificação detalhada de cáries incipientes, infiltrações, saúde gengival e integridade de tratamentos antigos.',
      },
      {
        stepNumber: '03',
        title: 'Plano de Tratamento por Prioridades',
        detail:
          'Explicação transparente dividindo o que é urgência/saúde, função mastigatória e refinamento estético.',
      },
      {
        stepNumber: '04',
        title: 'Acompanhamento Semestral Programado',
        detail:
          'Manutenção contínua para evitar imprevistos e preservar seu sorriso saudável ao longo dos anos.',
      },
    ],
    bookingSubject: 'Agendamento de Check-up Preventivo / Avaliação — Dra. Kéryda Ramos',
  },
];

export const TreatmentsAtelierSection: React.FC<TreatmentsAtelierSectionProps> = ({
  onOpenBooking,
}) => {
  const [selectedCode, setSelectedCode] = useState<string>('01');
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(true);
  const detailPanelRef = useRef<HTMLDivElement | null>(null);

  const activeService =
    SERVICES_SOLUTIONS.find((item) => item.code === selectedCode) ?? SERVICES_SOLUTIONS[0];

  const handleCardPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mx', `${x.toFixed(2)}%`);
    e.currentTarget.style.setProperty('--my', `${y.toFixed(2)}%`);
  };

  const handleSelectCard = (code: string, scrollIntoView = true) => {
    setSelectedCode(code);
    setIsDetailOpen(true);
    if (scrollIntoView && detailPanelRef.current) {
      window.requestAnimationFrame(() => {
        detailPanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  return (
    <section
      id="solucoes"
      data-cloud="2.4,0.05"
      className="relative py-28 lg:py-40 bg-[#040B16] text-[#F4F1EA] border-b border-gold-500/25 overflow-hidden"
    >
      {/* Âncora auxiliar para links legados #tratamentos */}
      <div id="tratamentos" className="sr-only" aria-hidden="true" />

      <div className="max-w-[1380px] mx-auto px-5 sm:px-10 lg:px-16 space-y-16 lg:space-y-20">
        {/* CABEÇALHO DA SEÇÃO (Módulo 4255 Wolfstone) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-gold-500/20">
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="w-8 h-px bg-gold-400/75 inline-block" aria-hidden="true" />
              <span className="mono text-gold-300">especialidades</span>
              <span className="text-gold-500/40">—</span>
              <span className="text-sm sm:text-base text-[#F4F1EA]/80 font-light">
                Áreas de atuação — o que a Dra. Kéryda Ramos faz pelo seu sorriso
              </span>
            </div>

            <h2
              className="display text-4xl sm:text-6xl lg:text-[64px] leading-[0.98] text-[#F4F1EA]"
              data-split="lines"
            >
              <span className="block">Odontologia completa com</span>
              <span className="block">
                <em>precisão estética e biológica</em>
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pl-6 lg:border-l border-gold-500/20 space-y-3">
            <p className="text-sm sm:text-base text-[#F4F1EA]/75 leading-relaxed font-light">
              Passe o cursor sobre cada especialidade e clique em qualquer card para explorar as
              etapas clínicas detalhadas e agendar sua avaliação com a{' '}
              <strong className="font-medium text-gold-300">
                {DOCTOR_INFO.name} ({DOCTOR_INFO.cro})
              </strong>
              .
            </p>
          </div>
        </div>

        {/* GRID DE 6 CARDS INTERATIVOS (.services-grid > .service-card com spotlight --mx, --my) */}
        <div
          className="services-grid"
          role="list"
          aria-label="Especialidades Odontológicas da Dra. Kéryda Ramos"
        >
          {SERVICES_SOLUTIONS.map((service) => {
            const isSelected = isDetailOpen && service.code === selectedCode;

            return (
              <article
                key={service.code}
                role="listitem"
                tabIndex={0}
                onPointerMove={handleCardPointerMove}
                onClick={() => handleSelectCard(service.code, true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectCard(service.code, true);
                  }
                }}
                aria-expanded={isSelected}
                className={`service-card group text-left focus:outline-none ${
                  isSelected
                    ? 'ring-2 ring-gold-300/80 border-gold-300/80 shadow-[0_20px_50px_-15px_rgba(197,155,100,0.35)]'
                    : ''
                }`}
              >
                {/* Fotografia de Fundo Real (.service-card__bg) */}
                <div
                  className="service-card__bg"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(4, 11, 22, 0.45) 0%, rgba(4, 11, 22, 0.78) 52%, rgba(4, 11, 22, 0.96) 100%), url('${service.photo}')`,
                  }}
                  aria-hidden="true"
                />

                {/* Topo do Card: Número .mono + Tag Categoria */}
                <div className="relative z-10 flex items-center justify-between gap-3">
                  <span className="service-card__num mono text-gold-300 text-sm">
                    {service.code}
                  </span>
                  <span className="mono text-[10px] px-3 py-1 rounded-full bg-[#040B16]/75 backdrop-blur-md border border-gold-500/30 text-[#F4F1EA]/85">
                    {service.category}
                  </span>
                </div>

                {/* Conteúdo Principal do Card */}
                <div className="relative z-10 space-y-3.5 mt-auto pt-16">
                  <h3 className="display text-2xl sm:text-[30px] leading-[1.06] text-[#F4F1EA] group-hover:text-gold-200 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-[#F4F1EA]/80 leading-relaxed font-light">
                    {service.description}
                  </p>

                  <div className="pt-4 border-t border-gold-500/25 flex items-center justify-between gap-3">
                    <span className="mono text-[10px] text-gold-300">
                      {isSelected ? 'Etapas clínicas abertas' : 'Ver etapas clínicas'}
                    </span>
                    <span
                      className="w-7 h-7 rounded-full border border-gold-400/40 bg-[#040B16]/70 flex items-center justify-center text-gold-300 text-xs transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* EXPANSÃO DETALHADA DAS ETAPAS CLÍNICAS DO PROCEDIMENTO SELECIONADO */}
        {isDetailOpen && (
          <div
            ref={detailPanelRef}
            id="protocolo-detalhado"
            role="region"
            aria-label={`Etapas clínicas detalhadas: ${activeService.title}`}
            className="rounded-[24px] border border-gold-400/40 bg-[#061326]/95 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-10 transition-all duration-500"
          >
            {/* Barra Superior de Navegação Rápida entre as 6 Especialidades */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gold-500/20">
              <div className="flex flex-wrap items-center gap-2">
                {SERVICES_SOLUTIONS.map((item) => {
                  const active = item.code === activeService.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      onClick={() => handleSelectCard(item.code, false)}
                      className={`px-3.5 py-2 rounded-full mono text-[10px] transition-all ${
                        active
                          ? 'bg-gold-500 text-[#040B16] font-semibold'
                          : 'bg-[#040B16]/70 text-gold-300/80 border border-gold-500/25 hover:border-gold-400/60'
                      }`}
                    >
                      {item.code} · {item.title.split(' ')[0]}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsDetailOpen(false)}
                className="mono text-[10px] text-[#F4F1EA]/65 hover:text-gold-300 px-3 py-1.5 rounded-full border border-gold-500/25 transition-colors"
              >
                Recolher painel ×
              </button>
            </div>

            {/* Corpo do Dossiê Clínico */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Coluna Esquerda (5 cols): Fotografia + Ficha de Preservação & Conforto + CTA */}
              <div className="lg:col-span-5 space-y-6">
                <div className="relative rounded-2xl overflow-hidden border border-gold-500/35 bg-[#040B16] aspect-[4/3]">
                  <img
                    src={activeService.photo}
                    alt={activeService.photoAlt}
                    className="w-full h-full object-cover object-center transition-all duration-700"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#040B16]/90 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                    <div>
                      <span className="mono text-gold-300 block text-[10px]">
                        Protocolo {activeService.code} · {activeService.category}
                      </span>
                      <span className="display text-2xl text-[#F4F1EA] block mt-0.5">
                        {activeService.title}
                      </span>
                    </div>
                    <span className="mono text-[10px] px-3 py-1 rounded-full bg-[#040B16]/85 border border-gold-400/40 text-gold-300">
                      {DOCTOR_INFO.cro}
                    </span>
                  </div>
                </div>

                {/* Especificações Biológicas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="p-4 rounded-xl bg-[#040B16]/80 border border-gold-500/25">
                    <span className="mono text-gold-300 block text-[10px]">
                      Preservação Biológica
                    </span>
                    <span className="text-sm font-medium text-[#F4F1EA] block mt-1.5">
                      {activeService.preservationSpec}
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#040B16]/80 border border-gold-500/25">
                    <span className="mono text-gold-300 block text-[10px]">
                      Conforto Clínico
                    </span>
                    <span className="text-sm font-medium text-[#F4F1EA] block mt-1.5">
                      {activeService.comfortSpec}
                    </span>
                  </div>
                </div>

                {/* Quando é Indicado */}
                <div className="p-5 rounded-xl bg-[#040B16]/80 border border-gold-500/25 space-y-3">
                  <span className="mono text-gold-300 block">
                    Principais Indicações Clínicas
                  </span>
                  <ul className="space-y-2.5">
                    {activeService.indications.map((indication, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-[#F4F1EA]/85 font-light leading-relaxed"
                      >
                        <span className="text-gold-400 mt-0.5" aria-hidden="true">
                          ✦
                        </span>
                        <span>{indication}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão Direto para Agendar pelo WhatsApp */}
                <button
                  type="button"
                  onClick={() => onOpenBooking(activeService.bookingSubject)}
                  className="pill w-full justify-center py-4 text-sm font-semibold"
                  data-magnetic
                >
                  <span>Agendar pelo WhatsApp · {activeService.title}</span>
                  <span aria-hidden="true">→</span>
                </button>
              </div>

              {/* Coluna Direita (7 cols): Etapas Clínicas Passo a Passo */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3 pb-6 border-b border-gold-500/20">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="mono text-gold-300">
                      Especialidade {activeService.code} · {activeService.category}
                    </span>
                    <span className="mono text-[#F4F1EA]/60 text-[10px]">
                      {activeService.sessionInfo}
                    </span>
                  </div>

                  <h3 className="display text-3xl sm:text-5xl text-[#F4F1EA] leading-[1.02]">
                    {activeService.title}
                  </h3>

                  <p className="text-base sm:text-[17px] text-[#F4F1EA]/80 leading-relaxed font-light pt-1">
                    {activeService.description}
                  </p>
                </div>

                {/* 4 Etapas Clínicas */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="mono text-gold-300">
                      Etapas Clínicas do Procedimento
                    </h4>
                    <span className="mono text-[10px] text-[#F4F1EA]/60">
                      Execução pessoal · Dra. Kéryda Ramos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeService.clinicalSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="p-5 rounded-2xl bg-[#040B16]/85 border border-gold-500/25 hover:border-gold-400/50 transition-colors space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="mono text-gold-300">
                            Etapa {step.stepNumber}
                          </span>
                          <span className="w-2 h-2 rounded-full bg-gold-400/70" aria-hidden="true" />
                        </div>
                        <h5 className="display text-xl sm:text-2xl text-[#F4F1EA] leading-snug">
                          {step.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-[#F4F1EA]/75 leading-relaxed font-light">
                          {step.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rodapé do Painel */}
                <div className="p-5 rounded-2xl border border-gold-500/25 bg-[#040B16]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="mono text-gold-300 block">
                      Atendimento Individualizado com Hora Marcada
                    </span>
                    <p className="text-xs sm:text-sm text-[#F4F1EA]/75 font-light">
                      Tire suas dúvidas ou solicite avaliação diretamente pelo WhatsApp oficial{' '}
                      <strong className="text-[#F4F1EA] font-medium">
                        {DOCTOR_INFO.phoneFormatted}
                      </strong>
                      .
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenBooking(activeService.bookingSubject)}
                    className="pill pill--ghost shrink-0"
                  >
                    <span>Solicitar horário</span>
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TreatmentsAtelierSection;
