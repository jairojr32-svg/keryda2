import React, { useState } from "react";
import { WHATSAPP_URL } from "./Header";

export type ServiceCategory =
  | "todos"
  | "estetica"
  | "reabilitacao"
  | "clinica"
  | "emergencia";

export interface ClinicServiceItem {
  n: string;
  category: ServiceCategory;
  categoryLabel: string;
  title: string;
  subtitle: string;
  desc: string;
  procedures: string[];
  img: string;
  isEmergency?: boolean;
}

export const CLINIC_SERVICES: ClinicServiceItem[] = [
  {
    n: "01",
    category: "estetica",
    categoryLabel: "DENTÍSTICA & ESTÉTICA DENTAL",
    title: "Lentes de Contato, Facetas de Resina & Clareamento",
    subtitle: "Sorriso renovado com brilho, proporção e naturalidade",
    desc: "Transformamos a cor e o formato dos dentes com facetas em resina composta, lentes de contato em porcelana e clareamento dental seguro de consultório e supervisionado.",
    procedures: [
      "Facetas em Resina Composta",
      "Lentes de Contato Dental",
      "Clareamento Dental",
      "Fechamento de Diastemas",
    ],
    img: "/assets/services/service-01.png",
  },
  {
    n: "02",
    category: "reabilitacao",
    categoryLabel: "IMPLANTODONTIA",
    title: "Implantes Dentários Modernos & Seguros",
    subtitle: "Firmeza, conforto e aparência natural para o seu sorriso",
    desc: "Especialidade responsável por substituir dentes perdidos com implantes de titânio/zircônia de alta estabilidade, devolvendo segurança mastigatória e estética natural.",
    procedures: [
      "Implante Unitário e Múltiplo",
      "Reabilitação sobre Implantes",
      "Planejamento Cirúrgico Seguro",
      "Devolução da Mastigação Firme",
    ],
    img: "/assets/services/service-02.png",
  },
  {
    n: "03",
    category: "clinica",
    categoryLabel: "ENDODONTIA",
    title: "Tratamento de Canal Sem Dor",
    subtitle: "Diga adeus às dores e preserve o seu dente natural",
    desc: "Descontaminação e selamento dos canais radiculares com tecnologia moderna e anestesia eficaz, eliminando dores agudas e infecções para salvar o dente comprometido.",
    procedures: [
      "Tratamento de Canal Mecanizado",
      "Alívio Imediato de Dor Aguda",
      "Retratamento Endodôntico",
      "Recuperação da Saúde Pulpar",
    ],
    img: "/assets/services/service-03.png",
  },
  {
    n: "04",
    category: "clinica",
    categoryLabel: "ORTODONTIA",
    title: "Aparelhos Ortodônticos & Alinhamento",
    subtitle: "Correção da mordida e dentes perfeitamente alinhados",
    desc: "Cuida do alinhamento dos dentes e do encaixe correto da mordida com aparelhos ortodônticos modernos, promovendo função mastigatória adequada e um sorriso mais harmônico.",
    procedures: [
      "Aparelhos Ortodônticos Fixos e Estéticos",
      "Correção de Mordida e Apinhamento",
      "Alinhamento Funcional do Sorriso",
      "Manutenção Ortodôntica Mensal",
    ],
    img: "/assets/services/service-04.png",
  },
  {
    n: "05",
    category: "reabilitacao",
    categoryLabel: "PRÓTESE DENTÁRIA",
    title: "Próteses Dentárias & Coroas Sob Medida",
    subtitle: "Reposição de dentes ausentes com estética e conforto",
    desc: "Reabilitação oral com coroas em porcelana e próteses planejadas sob medida para repor dentes ausentes, garantindo estética natural, conforto e plena funcionalidade.",
    procedures: [
      "Coroas em Porcelana Pura",
      "Próteses Fixas e Removíveis",
      "Próteses sobre Implantes",
      "Reabilitação da Mordida",
    ],
    img: "/assets/services/service-05.png",
  },
  {
    n: "06",
    category: "clinica",
    categoryLabel: "CLÍNICA GERAL & PREVENÇÃO",
    title: "Limpeza Completa, Restaurações & Check-up",
    subtitle: "Cuidado integral para manter seus dentes sempre saudáveis",
    desc: "Cuidamos da sua saúde bucal com profilaxia completa (remoção de tártaro e placa), restaurações estéticas, prevenção de cáries e acompanhamento semestral.",
    procedures: [
      "Limpeza Completa (Profilaxia)",
      "Restaurações em Resina",
      "Remoção de Tártaro por Ultrassom",
      "Check-up Preventivo Digital",
    ],
    img: "/assets/services/service-06.png",
  },
  {
    n: "07",
    category: "clinica",
    categoryLabel: "CIRURGIA ORAL MENOR",
    title: "Extração Geral & Dentes do Siso",
    subtitle: "Procedimentos cirúrgicos seguros com pós-operatório assistido",
    desc: "Realizamos extrações dentárias indicadas e remoção de sisos (terceiros molares) com técnica delicada, controle rigoroso de conforto anestésico e acompanhamento próximo.",
    procedures: [
      "Extração de Dentes do Siso",
      "Extrações Dentárias Simples e Complexas",
      "Anestesia Cuidadosa e Segura",
      "Protocolo Pós-Operatório Confortável",
    ],
    img: "/assets/services/service-07.png",
  },
  {
    n: "08",
    category: "estetica",
    categoryLabel: "ESTÉTICA FACIAL & DTM",
    title: "Harmonização Facial, Botox & Tratamento de DTM",
    subtitle: "Equilíbrio facial, autoestima e alívio das dores articulares",
    desc: "Integramos toxina botulínica (botox) e harmonização facial para valorizar os traços do rosto ao tratamento especializado de DTM, bruxismo e dores na articulação.",
    procedures: [
      "Toxina Botulínica (Botox Estético e Terapêutico)",
      "Harmonização Facial",
      "Tratamento de DTM e Dor Orofacial",
      "Placa Miorrelaxante para Bruxismo",
    ],
    img: "/assets/services/service-08.png",
  },
  {
    n: "09",
    category: "emergencia",
    categoryLabel: "PRONTO ATENDIMENTO",
    title: "Atendimento de Emergência Odontológica",
    subtitle: "Alívio imediato para dores agudas, fraturas e urgências",
    desc: "Sentindo dor de dente intensa, sofreu uma fratura dentária, inchaço ou soltou uma prótese/restauração? Oferecemos atendimento ágil de urgência para resolver seu desconforto.",
    procedures: [
      "Alívio Imediato de Dor de Dente Aguda",
      "Reconstrução de Dente Quebrado / Fraturado",
      "Urgências de Canal (Endodontia) e Abscessos",
      "Recimentação de Coroas e Próteses",
    ],
    img: "/assets/services/service-09.png",
    isEmergency: true,
  },
];

const FILTER_TABS: { id: ServiceCategory; label: string }[] = [
  { id: "todos", label: "Todas as Especialidades (09)" },
  { id: "estetica", label: "Estética, Lentes & Harmonização" },
  { id: "reabilitacao", label: "Implantes & Próteses" },
  { id: "clinica", label: "Clínica Geral, Canal, Ortodontia & Sisos" },
  { id: "emergencia", label: "Urgência & Emergência" },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("todos");
  const [selectedService, setSelectedService] =
    useState<ClinicServiceItem | null>(null);

  const filteredServices =
    activeCategory === "todos"
      ? CLINIC_SERVICES
      : CLINIC_SERVICES.filter((s) => s.category === activeCategory);

  const handleMove = (e: React.PointerEvent<HTMLLIElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const buildWhatsAppLink = (title: string, isEmergency?: boolean) => {
    const text = isEmergency
      ? `Olá, Dra. Kéryda! Preciso de ATENDIMENTO DE EMERGÊNCIA odontológica (${title}).`
      : `Olá, Dra. Kéryda! Gostaria de agendar uma avaliação para *${title}*.`;
    return `https://wa.me/5562982440962?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="space-y-10">
      {/* Barra de Filtro Rápido (Swipeable no Mobile) + Destaque de Emergência */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-3 border-b border-white/10">
        <div
          className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1 no-scrollbar"
          role="tablist"
          aria-label="Filtrar especialidades odontológicas"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-hover
                onClick={() => setActiveCategory(tab.id)}
                className={`shrink-0 whitespace-nowrap px-4 py-2.5 rounded-full mono text-[11px] uppercase tracking-[0.12em] transition-all border ${
                  isActive
                    ? "bg-[#C8A26A] text-[#040B16] border-[#C8A26A] font-semibold"
                    : "bg-white/[0.04] text-[#DFD8C8] border-white/15 hover:border-[#E5C99B]/60"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <a
          href={buildWhatsAppLink("Dor / Urgência Odontológica", true)}
          target="_blank"
          rel="noopener noreferrer"
          data-hover
          className="inline-flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-full border border-[#E5C99B]/50 bg-[#0B1E38] hover:bg-[#132D52] text-[#E5C99B] mono text-[10px] sm:text-[11px] tracking-[0.12em] w-full sm:w-auto lg:self-auto transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[#E5C99B] animate-pulse shrink-0" />
          <span>ATENDIMENTO DE EMERGÊNCIA · 62 98244-0962</span>
        </a>
      </div>

      {/* Grid de Especialidades (Mantendo exatamente o estilo .services > .service do site) */}
      <ul className="services">
        {filteredServices.map((s) => (
          <li
            key={s.n}
            className="service cursor-pointer group"
            data-reveal
            data-hover
            onPointerMove={handleMove}
            onClick={() => setSelectedService(s)}
            style={
              s.isEmergency
                ? { borderColor: "rgba(229, 201, 155, 0.45)" }
                : undefined
            }
          >
            <span
              className="service__bg"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(4,11,22,0.22) 0%, rgba(4,11,22,0.74) 58%, rgba(4,11,22,0.95) 100%), url(${s.img})`,
              }}
              aria-hidden
            />

            <div className="flex items-center justify-between gap-2">
              <span className="service__n mono">
                {s.n} · {s.categoryLabel}
              </span>
              {s.isEmergency && (
                <span className="px-2.5 py-0.5 rounded-full bg-[#C8A26A] text-[#040B16] mono text-[9px] font-bold tracking-[0.16em]">
                  URGÊNCIA
                </span>
              )}
            </div>

            <h3 className="service__title">{s.title}</h3>
            <p className="service__desc">{s.desc}</p>

            {/* Lista concisa de procedimentos inclusos no card */}
            <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
              {s.procedures.map((proc) => (
                <span
                  key={proc}
                  className="px-2.5 py-1 rounded-md bg-white/[0.06] border border-white/10 font-sans text-[11px] text-[#F4F1EA]/90"
                >
                  {proc}
                </span>
              ))}
            </div>

            <div className="mt-4 pt-2 flex items-center justify-between mono text-[10px] text-[#E5C99B]">
              <span>VER DETALHES &amp; AGENDAR</span>
              <span>↗</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Faixa Completa: "Faça seu tratamento completo em um só lugar" + Atendimento de Emergência */}
      <div className="rounded-2xl border border-[#C8A26A]/35 bg-[#081528]/85 backdrop-blur-md p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <span className="mono text-[10px] tracking-[0.2em] text-[#E5C99B] block">
            ESTRUTURA COMPLETA · DRA. KÉRYDA RAMOS (CRO-GO 22911)
          </span>
          <h4 className="font-sans font-bold text-xl sm:text-2xl text-white">
            Faça seu tratamento odontológico completo em um só lugar — inclusive emergências.
          </h4>
          <p className="font-sans text-sm text-[#DFD8C8] leading-relaxed">
            Endodontia (Canal) · Dentística (Lentes e Facetas de Resina) · Ortodontia · Clínica
            Geral (Próteses, Clareamento, Limpeza, Restaurações e Extração/Sisos) · Implantes ·
            Harmonização Facial &amp; DTM.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={buildWhatsAppLink("Emergência Odontológica", true)}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="btn btn--ghost"
          >
            Emergência / Dor Agora
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-hover
            className="btn btn--solid"
          >
            Agendar Avaliação
          </a>
        </div>
      </div>

      {/* Modal de Detalhes da Especialidade Selecionada */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[220] flex items-center justify-center p-4 bg-[#02060D]/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[88dvh] overflow-y-auto rounded-2xl bg-[#040B16] border border-[#C8A26A]/55 p-5 sm:p-9 text-[#F4F1EA] shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden border border-[#C8A26A]/35 bg-[#081528]">
              <img
                src={selectedService.img}
                alt={selectedService.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="mono text-[10px] text-[#E5C99B] block">
                  ESPECIALIDADE {selectedService.n} · {selectedService.categoryLabel}
                </span>
                <h3 className="font-sans font-bold text-2xl sm:text-3xl text-white mt-1">
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedService(null)}
                aria-label="Fechar"
                className="w-9 h-9 rounded-full border border-white/20 text-[#E5C99B] flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <p className="font-sans text-sm sm:text-base text-[#DFD8C8] leading-relaxed">
              {selectedService.desc}
            </p>

            <div className="space-y-2.5">
              <span className="mono text-[10px] text-[#E5C99B] block">
                PROCEDIMENTOS REALIZADOS NESTA ÁREA:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedService.procedures.map((p) => (
                  <div
                    key={p}
                    className="p-3 rounded-xl bg-[#081528] border border-[#C8A26A]/25 font-sans text-xs sm:text-sm text-white flex items-center gap-2"
                  >
                    <span className="text-[#E5C99B]">✦</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <a
                href={buildWhatsAppLink(
                  selectedService.title,
                  selectedService.isEmergency
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid w-full justify-center"
              >
                Agendar {selectedService.title} no WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
