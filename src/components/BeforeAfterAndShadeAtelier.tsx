import React, { useState, useRef } from "react";

interface BeforeAfterAndShadeAtelierProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

type CaseTabId = "clareamento" | "resina" | "coroa";

interface CaseSpec {
  id: CaseTabId;
  num: string;
  tabTitle: string;
  tabSub: string;
  kicker: string;
  titleLine1: string;
  titleOutline: string;
  beforeImg: string;
  afterImg: string;
  beforeBadge: string;
  afterBadge: string;
  summary: string;
  specs: { label: string; value: string }[];
  highlights: string[];
  subject: string;
}

const CASES: Record<CaseTabId, CaseSpec> = {
  clareamento: {
    id: "clareamento",
    num: "01",
    tabTitle: "Clareamento & Limpeza",
    tabSub: "Iluminação biológica sem desgaste",
    kicker: "CASO 01 · PROTOCOLO DE ILUMINAÇÃO DENTAL",
    titleLine1: "Limpeza Completa &",
    titleOutline: "Clareamento Clínico",
    beforeImg: "/assets/clareamento-before-real.jpg",
    afterImg: "/assets/clareamento-after-real.jpg",
    beforeBadge: "ANTES · TOM A3.5",
    afterBadge: "DEPOIS · TOM BL4 NATURAL",
    summary:
      "Remoção profunda de biofilme e cálculo dental por ultrassom de baixa vibração, seguida de clareamento clínico com barreira gengival protetora e terapia dessensibilizante.",
    specs: [
      { label: "DESGASTE DENTAL", value: "0.0 mm (100% Conservador)" },
      { label: "CONFORTO CLÍNICO", value: "Protocolo Dessensibilizante Ativo" },
      { label: "RESULTADO ÓPTICO", value: "Branco Natural Translúcido" },
    ],
    highlights: [
      "Preservação integral da estrutura do esmalte",
      "Remoção de pigmentos profundos sem aspecto opaco",
      "Acompanhamento direto pela Dra. Kéryda Ramos (CRO-GO 22911)",
    ],
    subject: "Avaliação para Limpeza Completa + Clareamento Dental",
  },
  resina: {
    id: "resina",
    num: "02",
    tabTitle: "Facetas em Resina",
    tabSub: "Escultura e mimetismo óptico",
    kicker: "CASO 02 · ESCULTURA BIOMIMÉTICA EM RESINA",
    titleLine1: "Restaurações &",
    titleOutline: "Facetas em Resina",
    beforeImg: "/assets/real-resina-before.jpg",
    afterImg: "/assets/real-resina-after.jpg",
    beforeBadge: "ANTES · DESGASTE & MANCHAS",
    afterBadge: "DEPOIS · RESINA NANOPARTICULADA",
    summary:
      "Reconstrução anatômica de dentes desgastados, substituição de restaurações antigas escurecidas e fechamento de diastemas com resinas nanoparticuladas de alto polimento.",
    specs: [
      { label: "TÉCNICA", value: "Estratificação Camada por Camada" },
      { label: "INVASIVIDADE", value: "Minimamente Invasivo & Adesivo" },
      { label: "ACABAMENTO", value: "Polimento Espelhado de Alto Brilho" },
    ],
    highlights: [
      "Transição invisível entre dente natural e restauração",
      "Devolução imediata da anatomia e proporção do sorriso",
      "Realizado em consultório com precisão micrométrica",
    ],
    subject: "Avaliação para Facetas ou Restaurações em Resina",
  },
  coroa: {
    id: "coroa",
    num: "03",
    tabTitle: "Coroas em Porcelana",
    tabSub: "Cerâmica pura livre de metal",
    kicker: "CASO 03 · REABILITAÇÃO EM CERÂMICA PURA",
    titleLine1: "Coroas Livres de Metal &",
    titleOutline: "Porcelana Translúcida",
    beforeImg: "/assets/clareamento-before-real.jpg",
    afterImg: "/assets/smile-macro-hero.jpg",
    beforeBadge: "ANTES · COMPROMETIMENTO",
    afterBadge: "DEPOIS · PORCELANA PURA",
    summary:
      "Recuperação estrutural e estética de dentes fragilizados, pós-canal ou com coroas antigas acinzentadas através de dissilicato de lítio e zircônia translúcida sob medida.",
    specs: [
      { label: "MATERIAL", value: "Porcelana Pura (Livre de Metal)" },
      { label: "RESISTÊNCIA", value: "Alta Performance Mastigatória" },
      { label: "PROVISÓRIO", value: "Estético Imediato desde a 1ª Sessão" },
    ],
    highlights: [
      "Eliminação definitiva de bordas metálicas escuras na gengiva",
      "Estabilidade absoluta de cor e brilho ao longo dos anos",
      "Adaptação marginal micrométrica e conforto ao mastigar",
    ],
    subject: "Avaliação para Coroas em Porcelana ou Reabilitação Oral",
  },
};

export const BeforeAfterAndShadeAtelier: React.FC<
  BeforeAfterAndShadeAtelierProps
> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<CaseTabId>("clareamento");
  const [comparePosition, setComparePosition] = useState<number>(50);
  const sliderContainerRef = useRef<HTMLDivElement | null>(null);

  const activeCase = CASES[activeTab];

  const clampSlider = (val: number) => Math.min(95, Math.max(5, val));

  const updateSliderFromClientX = (clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const percentage = ((clientX - rect.left) / rect.width) * 100;
    setComparePosition(clampSlider(Math.round(percentage)));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons === 1 || e.pointerType === "touch") {
      updateSliderFromClientX(e.clientX);
    }
  };

  const handleCardSpotlight = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="wrap pt-16 sm:pt-24 relative">
      {/* Cabeçalho Monumental no mesmo padrão da metade escura */}
      <header className="section-head flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <p className="eyebrow" data-reveal>
            Evidência Clínica &amp; Mimetismo Óptico — Arraste para Comparar
          </p>
          <h2 className="display section-title" data-lines>
            A arte do
            <br />
            <span className="display-outline">Antes &amp; Depois</span>
          </h2>
        </div>

        {/* Seletor Arquitetônico dos 3 Casos Clínicos */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full lg:w-auto"
          role="tablist"
          aria-label="Casos clínicos de transformação odontológica"
        >
          {(["clareamento", "resina", "coroa"] as CaseTabId[]).map((tabId) => {
            const c = CASES[tabId];
            const isSelected = activeTab === tabId;
            return (
              <button
                key={tabId}
                type="button"
                role="tab"
                aria-selected={isSelected}
                data-hover
                onClick={() => setActiveTab(tabId)}
                className={`text-left px-5 py-4 rounded-2xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-[#040B16] border-[#C59B64] shadow-[0_20px_45px_-15px_rgba(4,11,22,0.35)]"
                    : "bg-white/75 hover:bg-white border-[#040B16]/12 hover:border-[#C59B64]/60"
                }`}
              >
                <span
                  className="mono text-[10px] tracking-[0.2em] block"
                  style={{ color: isSelected ? "#E5C99B" : "#9A7240" }}
                >
                  {c.num} — CASO
                </span>
                <span
                  className="font-sans font-bold text-sm sm:text-base block mt-1"
                  style={{ color: isSelected ? "#FFFFFF" : "#040B16" }}
                >
                  {c.tabTitle}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Palco Principal Assimétrico de 12 Colunas (Sem a caixa azul da direita!) */}
      <div
        onPointerMove={handleCardSpotlight}
        className="cream-luxury-stage rounded-[28px] border border-[#040B16]/14 bg-white/85 backdrop-blur-md p-6 sm:p-10 lg:p-12 shadow-[0_35px_90px_-30px_rgba(4,11,22,0.18)] grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
      >
        {/* COLUNA ESQUERDA (7 Colunas): Comparador Fotográfico Interativo Grande */}
        <div className="lg:col-span-7 space-y-5">
          <div
            ref={sliderContainerRef}
            onPointerDown={(e) => updateSliderFromClientX(e.clientX)}
            onPointerMove={handlePointerMove}
            onTouchMove={(e) => {
              if (e.touches && e.touches[0]) {
                updateSliderFromClientX(e.touches[0].clientX);
              }
            }}
            data-hover
            style={{ touchAction: "pan-y" }}
            className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#C59B64]/55 select-none cursor-ew-resize bg-[#040B16] shadow-[0_28px_70px_-20px_rgba(4,11,22,0.45)]"
          >
            {/* Imagem DEPOIS (Fundo Completo) */}
            <img
              src={activeCase.afterImg}
              alt={activeCase.afterBadge}
              draggable={false}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            {/* Imagem ANTES (Recortada pelo Slider) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - comparePosition}% 0 0)` }}
            >
              <img
                src={activeCase.beforeImg}
                alt={activeCase.beforeBadge}
                draggable={false}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Selos ANTES e DEPOIS responsivos para celular */}
            <span
              className="mono absolute top-2.5 left-2.5 sm:top-4 sm:left-4 z-20 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-semibold tracking-[0.12em] sm:tracking-[0.16em]"
              style={{
                backgroundColor: "rgba(4, 11, 22, 0.86)",
                color: "#F4F1EA",
                border: "1px solid rgba(229, 201, 155, 0.45)",
                backdropFilter: "blur(8px)",
              }}
            >
              {activeCase.beforeBadge}
            </span>

            <span
              className="mono absolute top-2.5 right-2.5 sm:top-4 sm:right-4 z-20 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] font-semibold tracking-[0.12em] sm:tracking-[0.16em]"
              style={{
                backgroundColor: "rgba(4, 11, 22, 0.88)",
                color: "#E5C99B",
                border: "1px solid rgba(229, 201, 155, 0.65)",
                backdropFilter: "blur(8px)",
              }}
            >
              {activeCase.afterBadge}
            </span>

            {/* Divisor Vertical Dourado + Medalhão Central */}
            <div
              className="absolute inset-y-0 w-[2px] pointer-events-none z-20"
              style={{
                left: `${comparePosition}%`,
                background:
                  "linear-gradient(180deg, #E5C99B 0%, #C59B64 50%, #E5C99B 100%)",
                boxShadow: "0 0 20px rgba(229, 201, 155, 0.8)",
              }}
            >
              <div
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-2xl"
                style={{
                  backgroundColor: "#040B16",
                  border: "2px solid #E5C99B",
                  color: "#E5C99B",
                }}
              >
                <span className="mono text-xs font-bold">↔</span>
              </div>
            </div>
          </div>

          {/* Barra Deslizante Tátil com Escala Graduada */}
          <div className="px-2 pt-1 space-y-2">
            <div className="flex items-center gap-4">
              <span
                className="mono text-[11px] font-semibold tracking-[0.18em]"
                style={{ color: "#040B16" }}
              >
                ANTES
              </span>
              <input
                type="range"
                min={5}
                max={95}
                value={comparePosition}
                onChange={(e) => setComparePosition(Number(e.target.value))}
                aria-label="Arraste para comparar o antes e o depois"
                className="w-full accent-[#040B16] cursor-ew-resize h-1.5 bg-[#040B16]/15 rounded-lg"
              />
              <span
                className="mono text-[11px] font-semibold tracking-[0.18em]"
                style={{ color: "#9A7240" }}
              >
                DEPOIS
              </span>
            </div>
          </div>
        </div>

        {/* COLUNA DIREITA (5 Colunas): Dossiê Técnico Arquitetônico do Caso */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-7">
          <div className="space-y-5">
            <span
              className="mono text-[11px] font-semibold tracking-[0.2em] block"
              style={{ color: "#9A7240" }}
            >
              {activeCase.kicker}
            </span>

            <h3 className="display text-3xl sm:text-4xl lg:text-[42px] leading-[0.96] text-[#040B16]">
              {activeCase.titleLine1}
              <br />
              <span className="display-outline">{activeCase.titleOutline}</span>
            </h3>

            <p className="font-sans text-sm sm:text-base leading-relaxed text-[#040B16]/80">
              {activeCase.summary}
            </p>

            {/* Especificações Técnicas em Linhas de Dossiê */}
            <div className="border-t border-b border-[#040B16]/12 divide-y divide-[#040B16]/10">
              {activeCase.specs.map((sp) => (
                <div
                  key={sp.label}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <span
                    className="mono text-[10px] tracking-[0.16em]"
                    style={{ color: "#9A7240" }}
                  >
                    {sp.label}
                  </span>
                  <span className="font-sans font-semibold text-xs sm:text-sm text-[#040B16] text-right">
                    {sp.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Destaques Clínicos */}
            <ul className="space-y-2.5 pt-1">
              {activeCase.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 font-sans text-xs sm:text-sm font-medium text-[#040B16]"
                >
                  <span style={{ color: "#9A7240" }}>✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              type="button"
              onClick={() => onOpenBooking(activeCase.subject)}
              data-hover
              data-magnetic="0.3"
              className="btn btn--solid w-full sm:w-auto justify-center"
            >
              Agendar este protocolo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterAndShadeAtelier;
