import React, { useEffect, useRef, useState } from "react";

interface PillarMetric {
  id: string;
  num: string;
  tag: string;
  value: string;
  unit: string;
  title: string;
  description: string;
}

const CLINICAL_METRICS: PillarMetric[] = [
  {
    id: "ufg",
    num: "01",
    tag: "FORMAÇÃO & REGISTRO",
    value: "UFG",
    unit: "CRO-GO 22911",
    title: "Rigor Científico & Acadêmico",
    description:
      "Graduação pela Universidade Federal de Goiás aliada a protocolos clínicos de alta precisão.",
  },
  {
    id: "esmalte",
    num: "02",
    tag: "BIOPROTEÇÃO DENTAL",
    value: "100%",
    unit: "Conservador",
    title: "Preservação do Esmalte",
    description:
      "Clareamentos e profilaxias planejados para proteger integralmente a estrutura dental sadia.",
  },
  {
    id: "precisao",
    num: "03",
    tag: "ESTÉTICA BIOMIMÉTICA",
    value: "0.2mm",
    unit: "Precisão Óptica",
    title: "Resinas & Porcelanas Puras",
    description:
      "Estratificação artesanal que reproduz translucidez, textura e brilho natural dos dentes.",
  },
  {
    id: "exclusividade",
    num: "04",
    tag: "TEMPO & CONFORTO",
    value: "1 : 1",
    unit: "Hora Marcada",
    title: "Atendimento Sem Pressa",
    description:
      "Consultas exclusivas com mãos leves, barreiras dessensibilizantes e planejamento transparente.",
  },
];

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={sectionRef} className="wrap relative">
      <span className="ghost-word" data-parallax="70" aria-hidden>
        excelência
      </span>

      <header className="section-head">
        <p className="eyebrow" data-reveal>
          Diretrizes Clínicas — Dra. Kéryda Ramos · CRO-GO 22911
        </p>
        <h2 className="display section-title" data-lines>
          Precisão que
          <br />
          <span className="display-outline">protege seu sorriso</span>
        </h2>
      </header>

      <div className="cream-bento-grid">
        {CLINICAL_METRICS.map((item, idx) => (
          <div
            key={item.id}
            onPointerMove={handleMove}
            data-hover
            style={{ transitionDelay: `${idx * 90}ms` }}
            className={`cream-spotlight-card ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="cream-spotlight-card__ghost" aria-hidden>
              {item.num}
            </span>

            <div className="flex items-center justify-between gap-2 relative z-10">
              <span
                className="mono text-[10px] font-semibold tracking-[0.2em]"
                style={{ color: "#9A7240" }}
              >
                {item.tag}
              </span>
              <span
                className="mono text-xs font-semibold"
                style={{ color: "rgba(4, 11, 22, 0.45)" }}
              >
                /{item.num}
              </span>
            </div>

            <div className="my-6 relative z-10">
              <span className="display text-5xl sm:text-6xl block leading-none text-[#040B16]">
                {item.value}
              </span>
              <span
                className="mono text-[10px] uppercase tracking-[0.18em] inline-block mt-2 px-3 py-1 rounded-full border"
                style={{
                  borderColor: "rgba(197, 155, 100, 0.45)",
                  backgroundColor: "rgba(197, 155, 100, 0.12)",
                  color: "#8A6432",
                }}
              >
                {item.unit}
              </span>
            </div>

            <div className="space-y-2 mt-auto relative z-10 pt-4 border-t border-[#040B16]/10">
              <h3 className="font-sans font-bold text-lg text-[#040B16]">
                {item.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-[#040B16]/72">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
