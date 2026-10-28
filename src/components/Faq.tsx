import React, { useState } from "react";

const FAQS = [
  {
    category: "EMERGÊNCIA ODONTOLÓGICA",
    q: "Estou com dor de dente forte, inchaço ou dente quebrado. Vocês atendem emergência?",
    a: "Sim! Realizamos pronto atendimento odontológico para alívio imediato de dores agudas, urgências de canal (endodontia), fraturas dentárias, traumas e recimentação de coroas ou próteses. Basta chamar diretamente no nosso WhatsApp para priorizarmos seu encaixe.",
  },
  {
    category: "DENTÍSTICA · LENTES, FACETAS & CLAREAMENTO",
    q: "Qual a diferença entre clareamento, facetas de resina e lentes de contato dental?",
    a: "O clareamento dental ilumina a cor natural do próprio esmalte sem desgaste. Já as facetas de resina composta e as lentes de contato em porcelana são indicadas quando, além de clarear, você deseja corrigir formato, fechar espaços (diastemas) ou reconstruir dentes desgastados com harmonia e naturalidade.",
  },
  {
    category: "IMPLANTODONTIA & PRÓTESES",
    q: "Como funcionam os implantes dentários e as próteses para repor dentes perdidos?",
    a: "O implante dentário substitui a raiz do dente ausente com total segurança e firmeza, permitindo instalar uma coroa ou prótese sobre medida que devolve 100% da capacidade mastigatória, conforto e aparência de um dente natural.",
  },
  {
    category: "ENDODONTIA (CANAL) & SISOS",
    q: "O tratamento de canal e a extração de dentes do siso são feitos sem dor?",
    a: "Sim. Utilizamos técnicas anestésicas modernas, instrumentação precisa e protocolos medicamentosos pré e pós-operatórios para que tanto o tratamento de canal quanto as extrações gerais e de sisos ocorram com tranquilidade e conforto.",
  },
  {
    category: "ORTODONTIA & TRATAMENTO DE DTM",
    q: "Vocês trabalham com aparelhos ortodônticos e tratamento para dores na mandíbula (DTM)?",
    a: "Sim! Cuidamos do alinhamento dos dentes e da correção da mordida com aparelhos ortodônticos e também realizamos o diagnóstico e tratamento de DTM (dores na articulação, estalos, tensão facial e bruxismo).",
  },
  {
    category: "HARMONIZAÇÃO FACIAL & CLÍNICA GERAL",
    q: "Posso fazer todo o meu tratamento (limpeza, restaurações e harmonização/botox) na clínica?",
    a: "Sim. Você faz seu tratamento completo em um só lugar: da prevenção (limpeza completa, restaurações e clareamento) à reabilitação com implantes, canal, aparelhos e procedimentos de harmonização facial e botox para equilibrar a estética do rosto e do sorriso.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {FAQS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            onPointerMove={handleMove}
            className={`cream-faq-card ${isOpen ? "is-open md:col-span-2" : ""}`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              data-hover
              className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-6 relative z-10"
            >
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <span
                    className="mono text-[10px] font-semibold tracking-[0.2em] px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: isOpen
                        ? "rgba(197, 155, 100, 0.2)"
                        : "rgba(4, 11, 22, 0.06)",
                      color: isOpen ? "#E5C99B" : "#9A7240",
                      border: "1px solid rgba(197, 155, 100, 0.38)",
                    }}
                  >
                    0{i + 1} · {item.category}
                  </span>
                </div>
                <span
                  className="font-sans font-bold text-lg sm:text-xl block leading-snug"
                  style={{ color: isOpen ? "#FFFFFF" : "#040B16" }}
                >
                  {item.q}
                </span>
              </div>

              <span
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-sans font-bold text-lg transition-transform duration-300"
                style={{
                  backgroundColor: isOpen ? "#C59B64" : "#040B16",
                  color: isOpen ? "#040B16" : "#E5C99B",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div
                className="px-6 sm:px-8 pb-8 pt-2 relative z-10"
                style={{ borderTop: "1px solid rgba(229, 201, 155, 0.2)" }}
              >
                <p
                  className="font-sans text-base leading-relaxed max-w-4xl"
                  style={{ color: "rgba(244, 241, 234, 0.88)" }}
                >
                  {item.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
