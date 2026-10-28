import React, { useState, useRef } from "react";
import Header, { WHATSAPP_URL } from "./components/Header";
import Cursor from "./components/Cursor";
import ScrollProvider from "./components/ScrollProvider";
import Services from "./components/Services";
import AboutMedia from "./components/AboutMedia";
import Faq from "./components/Faq";
import Stats from "./components/Stats";
import Preloader from "./components/Preloader";
import Magnetic from "./components/Magnetic";
import FooterSignature from "./components/FooterSignature";
import ParticleField from "./components/ParticleField";
import ConsultaForm from "./components/ConsultaForm";
import { BeforeAfterAndShadeAtelier } from "./components/BeforeAfterAndShadeAtelier";
import { BookingModal } from "./components/DigitalBusinessCardAndFooter";
import {
  GoldCornerCurveTopRight,
  GoldCornerCurveBottomLeft,
} from "./components/BrandOrnament";
import { DOCTOR_INFO } from "./data/dentalData";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico & Escuta",
    desc: "Avaliação clínica detalhada de cada dente, gengiva e encaixe da mordida diretamente com a Dra. Kéryda Ramos (CRO-GO 22911 · UFG), sem pressa.",
  },
  {
    n: "02",
    title: "Planejamento Bioluminescente",
    desc: "Definição transparente das prioridades de saúde, seleção de cor na escala VITA e desenho conservador de clareamento, resinas ou porcelanas.",
  },
  {
    n: "03",
    title: "Execução Artesanal",
    desc: "Procedimentos realizados com mãos leves, isolamento criterioso, materiais nanoparticulados e cerâmicos de padrão superior e preservação biológica do esmalte.",
  },
  {
    n: "04",
    title: "Polimento & Longevidade",
    desc: "Acabamento espelhado de alto brilho, ajuste oclusal micrométrico e acompanhamento preventivo semestral para proteger seu sorriso por muitos anos.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Eu tinha receio de sentir sensibilidade no clareamento e de que as facetas em resina ficassem artificiais. A Dra. Kéryda preparou meus dentes com protocolo dessensibilizante e esculpiu cada detalhe com uma naturalidade impressionante.",
    name: "Mariana S.",
    company: "Clareamento Dental & Facetas em Resina",
  },
  {
    quote:
      "Precisava substituir uma coroa antiga que deixava a gengiva escura e recuperar dentes posteriores. A precisão técnica, a mão extremamente leve e o cuidado em cada consulta devolveram minha segurança ao sorrir.",
    name: "Carlos Eduardo M.",
    company: "Coroas em Porcelana Pura & Reabilitação",
  },
  {
    quote:
      "A limpeza e profilaxia mais cuidadosa que já realizei em Goiânia. Atendimento com hora marcada, explicação clara de cada etapa e sensação imediata de conforto e saúde gengival.",
    name: "Fernanda L.",
    company: "Limpeza Completa & Prevenção Periodontal",
  },
];

const CLIENTS = [
  "Dentística · Lentes & Facetas de Resina",
  "Implante Dentário",
  "Endodontia · Tratamento de Canal",
  "Ortodontia · Aparelhos Dentários",
  "Clínica Geral · Limpeza & Clareamento",
  "Próteses Dentárias",
  "Extração Geral & Sisos",
  "Harmonização Facial & Botox",
  "Tratamento de DTM",
  "Atendimento de Emergência",
];

export function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSubject, setBookingSubject] = useState(
    "Avaliação Odontológica com a Dra. Kéryda Ramos"
  );

  // Estado para o Cartão de Visitas Oficial Frente e Verso em 3D
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [cardTilt, setCardTilt] = useState({
    rotateX: 0,
    rotateY: 0,
    glareX: 50,
    glareY: 50,
  });
  const cardStageRef = useRef<HTMLDivElement | null>(null);

  const handleOpenBooking = (defaultSubject?: string) => {
    if (defaultSubject) {
      setBookingSubject(defaultSubject);
    }
    setBookingModalOpen(true);
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardStageRef.current) return;
    const rect = cardStageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setCardTilt({
      rotateX: (0.5 - y) * 10,
      rotateY: (x - 0.5) * 12,
      glareX: Math.round(x * 100),
      glareY: Math.round(y * 100),
    });
  };

  const handleCardMouseLeave = () => {
    setCardTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const handleDownloadVCard = () => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "FN:Dra. Kéryda Ramos",
      "N:Ramos;Kéryda;;Dra.;",
      "TITLE:Cirurgiã-Dentista | CRO-GO 22911",
      "TEL;TYPE=CELL,VOICE:+5562982440962",
      "EMAIL;TYPE=INTERNET:drakerydaramos@gmail.com",
      "URL:https://instagram.com/kerydaramos",
      "NOTE:Dra. Kéryda Ramos (CRO-GO 22911 | UFG) — Odontologia Estética, Preventiva e Reabilitação.",
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Dra_Keryda_Ramos_CRO_GO_22911.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ScrollProvider>
      <Preloader />
      <Magnetic />
      <div className="nebula" aria-hidden />
      <div className="site-bg" aria-hidden />
      <div className="scene-tint" aria-hidden />
      <ParticleField />
      <div className="grain" aria-hidden />
      <div className="reading-vignette" aria-hidden />
      <Cursor />
      <Header />

      <main className="content-layer">
        {/* 1 · HERO */}
        <section id="hero" className="hero" data-cloud="2.6,0.2">
          <div className="wrap hero__inner">
            <p className="eyebrow" data-intro>
              Odontologia de Alta Precisão · CRO-GO 22911 · UFG
            </p>
            <h1 className="display hero__title" data-lines data-intro-lines>
              <span className="display-outline hero__title-sm">Ilumine seu</span>
              <br />
              <span className="hero__title-lg">Sorriso</span>
            </h1>
            <p className="hero__lead" data-intro>
              Seu tratamento odontológico completo em um só lugar:{" "}
              <strong>lentes de contato e facetas em resina</strong>,{" "}
              <strong>clareamento e limpeza</strong>,{" "}
              <strong>implantes dentários</strong>,{" "}
              <strong>tratamento de canal</strong>,{" "}
              <strong>aparelhos ortodônticos</strong>,{" "}
              <strong>próteses, extrações/sisos, harmonização facial</strong> e{" "}
              <strong>atendimento de emergência</strong>.
            </p>
            <div className="hero__cta" data-intro>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--solid"
                data-hover
                data-magnetic="0.35"
              >
                Agendar Avaliação
              </a>
              <a
                href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
                  "Olá, Dra. Kéryda! Preciso de atendimento de EMERGÊNCIA odontológica."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
                data-hover
                data-magnetic="0.35"
              >
                Emergência / Dor Agora
              </a>
            </div>
          </div>
          <span className="scroll-hint mono">scroll ↓</span>
        </section>

        {/* 2 · MANIFESTO */}
        <section
          id="manifesto"
          className="manifesto"
          data-cloud="0,0.7"
          data-index="01 — Manifesto"
        >
          <div className="wrap">
            <h2 className="display manifesto__line">
              <span className="manifesto__reveal">
                Sorriso não se improvisa.
                <br />
                <span className="display-outline">Se esculpe.</span>
              </span>
            </h2>
          </div>
        </section>

        {/* 3 · SOBRE — Dra. Kéryda Ramos + abas de mídia */}
        <section
          id="sobre"
          className="sobre"
          data-cloud="-3.4,0"
          data-index="02 — Dra. Kéryda Ramos"
        >
          <span className="ghost-word" data-parallax="80" aria-hidden>
            consultório
          </span>
          <div className="wrap sobre__grid">
            <div className="sobre__text">
              <p className="eyebrow" data-reveal>
                Odontologia estética, preventiva e reabilitadora com rigor
                científico e sensibilidade artística
              </p>
              <h2 className="display sobre__title" data-lines>
                Cada sorriso é
                <br />
                <span className="display-outline">planejado e esculpido</span>
                <br />
                exclusivamente para o seu rosto
              </h2>
              <p data-reveal>
                Graduada em Odontologia pela{" "}
                <strong>Universidade Federal de Goiás (UFG)</strong> e inscrita
                no <strong>CRO-GO 22911</strong>, a{" "}
                <strong>Dra. Kéryda Ramos</strong> atua de forma artesanal e com
                hora marcada, dedicando tempo exclusivo para ouvir, diagnosticar
                e tratar cada paciente com mãos leves.
              </p>
              <p className="only-desktop" data-reveal>
                Na <strong>KR Odontologia e Estética Avançada</strong>, você
                realiza seu tratamento completo em um só lugar:{" "}
                <strong>
                  Dentística (lentes e facetas em resina), Implantes Dentários,
                  Endodontia (canal), Ortodontia, Próteses, Clínica Geral
                  (limpeza, clareamento, restaurações e sisos), Harmonização
                  Facial, DTM e Pronto Atendimento de Emergência
                </strong>
                .
              </p>
              <p className="mono sobre__tags" data-reveal data-delay="0.2">
                Clínica Completa · Estética Avançada · Atendimento de Emergência
              </p>
            </div>
            <div className="sobre__media" data-reveal>
              <AboutMedia />
            </div>
            <p className="sobre__extra only-mobile">
              Na <strong>KR Odontologia e Estética Avançada</strong>, você
              realiza seu tratamento completo em um só lugar:{" "}
              <strong>
                Dentística (lentes e facetas em resina), Implantes Dentários,
                Endodontia (canal), Ortodontia, Próteses, Clínica Geral
                (limpeza, clareamento, restaurações e sisos), Harmonização
                Facial, DTM e Pronto Atendimento de Emergência
              </strong>
              .
            </p>
          </div>
        </section>

        {/* 4 · CLIENTES / ESPECIALIDADES — faixa marquee */}
        <section id="clientes" className="clientes" data-cloud="0,0">
          <div className="wrap">
            <p className="eyebrow clientes__label" data-reveal>
              Protocolos clínicos de excelência — Dra. Kéryda Ramos · CRO-GO 22911
            </p>
          </div>
          <div className="marquee-clients" aria-hidden>
            <div className="marquee-clients__row">
              {Array.from({ length: 4 })
                .flatMap(() => CLIENTS)
                .map((c, i) => (
                  <span key={i} className="client-chip">
                    {c}
                  </span>
                ))}
            </div>
          </div>
        </section>

        {/* 6 · SOLUÇÕES / ESPECIALIDADES */}
        <section
          id="solucoes"
          className="solucoes"
          data-cloud="2.4,-0.3"
          data-index="03 — Especialidades"
        >
          <span
            className="ghost-word ghost-word--left"
            data-parallax="-80"
            aria-hidden
          >
            especialidades
          </span>
          <div className="wrap">
            <header className="section-head section-head--marquee">
              <p className="eyebrow" data-reveal>
                Áreas de atuação — o que a Dra. Kéryda Ramos faz pelo seu sorriso
              </p>
            </header>
          </div>
          <div className="wrap">
            <Services />
          </div>
        </section>

        {/* 7 · PONTE — Azul Marinho #040B16 se dissolve no Creme Alabastro #F4F1EA */}
        <div className="cream-bridge" aria-hidden />

        {/* 8 · PROVAS / RESULTADOS */}
        <section
          id="provas"
          className="provas sec-cream"
          data-index="04 — Resultados"
        >
          <Stats />
          <BeforeAfterAndShadeAtelier onOpenBooking={handleOpenBooking} />
        </section>

        {/* 8 · PROCESSO (Arquitetura Monumental c/ Títulos Display + Cards Spotlight) */}
        <section
          id="processo"
          className="processo sec-cream"
          data-index="05 — Jornada Clínica"
        >
          <span
            className="ghost-word ghost-word--left"
            data-parallax="-70"
            aria-hidden
          >
            protocolo
          </span>
          <div className="wrap">
            <header className="section-head flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <p className="eyebrow" data-reveal>
                  Protocolo Clínico em 4 Etapas — Dra. Kéryda Ramos
                </p>
                <h2 className="display section-title" data-lines>
                  Do diagnóstico
                  <br />
                  <span className="display-outline">ao sorriso esculpido</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleOpenBooking("Agendamento de Primeira Consulta")
                }
                className="btn btn--solid self-start lg:self-auto"
                data-hover
                data-magnetic="0.3"
              >
                Iniciar Minha Avaliação
              </button>
            </header>

            <div className="cream-bento-grid">
              {STEPS.map((s, idx) => (
                <div
                  key={s.n}
                  data-reveal
                  data-hover
                  onPointerMove={(e) => {
                    const el = e.currentTarget;
                    const r = el.getBoundingClientRect();
                    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    el.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  className="cream-spotlight-card"
                >
                  <span className="cream-spotlight-card__ghost" aria-hidden>
                    {s.n}
                  </span>

                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#040B16]/12 relative z-10">
                    <span
                      className="mono text-[10px] font-semibold tracking-[0.2em] px-3 py-1 rounded-full"
                      style={{
                        backgroundColor: "#040B16",
                        color: "#E5C99B",
                      }}
                    >
                      {s.n} — ETAPA
                    </span>
                    <span
                      className="mono text-xs font-semibold"
                      style={{ color: "#9A7240" }}
                    >
                      0{idx + 1}/04
                    </span>
                  </div>

                  <h3 className="display text-2xl sm:text-3xl text-[#040B16] mb-3 relative z-10">
                    {s.title}
                  </h3>

                  <p className="font-sans text-sm leading-relaxed text-[#040B16]/75 mt-auto relative z-10">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9 · DEPOIMENTOS (Vitrine Monumental com Aspa Escultural & Spotlight) */}
        <section
          id="depoimentos"
          className="depoimentos sec-cream"
          data-index="06 — Experiências Reais"
        >
          <span className="ghost-word" data-parallax="70" aria-hidden>
            confiança
          </span>
          <div className="wrap">
            <header className="section-head flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <p className="eyebrow" data-reveal>
                  Quem confia na Dra. Kéryda Ramos · CRO-GO 22911
                </p>
                <h2 className="display section-title" data-lines>
                  Excelência sentida
                  <br />
                  <span className="display-outline">em cada consulta</span>
                </h2>
              </div>

              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-full border self-start lg:self-auto"
                style={{
                  backgroundColor: "#040B16",
                  borderColor: "rgba(197, 155, 100, 0.5)",
                  color: "#E5C99B",
                }}
              >
                <span className="tracking-widest text-sm">★★★★★</span>
                <span className="mono text-[10px] font-semibold tracking-[0.18em]">
                  PACIENTES VERIFICADOS
                </span>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, idx) => (
                <figure
                  key={t.name}
                  data-reveal
                  data-hover
                  onPointerMove={(e) => {
                    const el = e.currentTarget;
                    const r = el.getBoundingClientRect();
                    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
                    el.style.setProperty("--my", `${e.clientY - r.top}px`);
                  }}
                  className="cream-spotlight-card justify-between gap-8"
                >
                  <span className="cream-spotlight-card__ghost" aria-hidden>
                    0{idx + 1}
                  </span>

                  <div className="space-y-5 relative z-10">
                    <div className="flex items-center justify-between">
                      <span
                        className="tracking-widest text-sm"
                        style={{ color: "#9A7240" }}
                      >
                        ★★★★★
                      </span>
                      <span
                        className="mono text-[10px] font-semibold tracking-[0.16em]"
                        style={{ color: "#9A7240" }}
                      >
                        RELATO 0{idx + 1}
                      </span>
                    </div>

                    <blockquote className="font-sans text-base sm:text-[17px] text-[#040B16] leading-relaxed font-medium">
                      “{t.quote}”
                    </blockquote>
                  </div>

                  <figcaption className="pt-5 border-t border-[#040B16]/12 flex items-center justify-between gap-3 relative z-10">
                    <div>
                      <span className="font-sans font-bold text-base text-[#040B16] block">
                        {t.name}
                      </span>
                      <span
                        className="mono text-[10px] font-semibold block mt-1"
                        style={{ color: "#9A7240" }}
                      >
                        {t.company}
                      </span>
                    </div>
                    <img
                      src="/assets/kr-monograma-ouro.png"
                      alt="KR"
                      className="w-8 h-8 object-contain"
                    />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* 10 · FAQ (Central de Dúvidas Monumental) */}
        <section
          id="faq"
          className="faq-section sec-cream"
          data-index="07 — Dúvidas Clínicas"
        >
          <span
            className="ghost-word ghost-word--left"
            data-parallax="-65"
            aria-hidden
          >
            dúvidas
          </span>
          <div className="wrap">
            <header className="section-head flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <p className="eyebrow" data-reveal>
                  Esclarecimentos Odontológicos — Dra. Kéryda Ramos
                </p>
                <h2 className="display section-title" data-lines>
                  Tudo sobre
                  <br />
                  <span className="display-outline">seu tratamento</span>
                </h2>
              </div>

              <a
                href="#consulta"
                className="btn btn--ghost self-start lg:self-auto"
                data-hover
                data-magnetic="0.3"
              >
                Iniciar Pré-Avaliação ↓
              </a>
            </header>

            <div data-reveal>
              <Faq />
            </div>
          </div>
        </section>

        {/* 12 · CONSULTA INTERATIVA + CARTÃO DE VISITAS OFICIAL 3D FRENTE E VERSO */}
        <section
          id="consulta"
          className="consulta-sec"
          data-index="08 — Avaliação Interativa"
          style={{
            background: "#040B16",
            color: "#F4F1EA",
            padding: "clamp(4.5rem, 9vw, 8.5rem) 0",
          }}
        >
          <div
            className="wrap"
            style={{
              display: "grid",
              gap: "clamp(2.5rem, 5vw, 4.5rem)",
              gridTemplateColumns: "minmax(0, 1fr)",
              maxWidth: "1080px",
            }}
          >
            <div className="consulta-lead">
              <p className="eyebrow" data-reveal>
                Pré-avaliação interativa · CRO-GO 22911 · UFG
              </p>
              <h2 className="display section-title" data-lines>
                Planeje sua consulta
                <br />
                <span className="display-outline">com a Dra. Kéryda</span>
              </h2>
              <ul className="consulta-perks mono" data-reveal>
                <li>Atendimento individualizado e com hora marcada</li>
                <li>Contato direto com a Dra. Kéryda Ramos (CRO-GO 22911)</li>
                <li>Protocolos sem dor e preservação biológica do esmalte</li>
              </ul>
            </div>

            <ConsultaForm />

            {/* Cartão de Visitas Oficial Frente e Verso em 3D */}
            <div
              className="pt-12 border-t border-[#C59B64]/25 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
              data-reveal
            >
              <div className="lg:col-span-5 space-y-5">
                <span className="mono text-[#E5C99B] block">
                  Identidade Oficial · CRO-GO 22911 · UFG
                </span>
                <h3 className="display text-4xl sm:text-5xl text-[#F4F1EA] leading-[1.02]">
                  Cartão de Visitas
                  <br />
                  <span className="display-outline">Frente &amp; Verso 3D</span>
                </h3>
                <p className="text-sm sm:text-base text-[#F4F1EA]/75 leading-relaxed">
                  Clique no cartão ao lado para girá-lo em 3D entre a frente em
                  Azul Marinho Profundo com o Monograma KR e o verso em Alabastro
                  Canelado com todos os canais diretos da Dra. Kéryda Ramos.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCardFlipped((v) => !v)}
                    className="btn btn--ghost"
                    data-hover
                  >
                    ↻ Girar Cartão ({isCardFlipped ? "Ver Frente" : "Ver Verso"})
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadVCard}
                    className="btn btn--solid"
                    data-hover
                  >
                    Salvar Contato (.vcf)
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div
                  ref={cardStageRef}
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={handleCardMouseLeave}
                  className="perspective-1000 w-full"
                >
                  <div
                    onClick={() => setIsCardFlipped((v) => !v)}
                    className="relative w-full aspect-[16/10] sm:aspect-[16/9.2] min-h-[235px] sm:min-h-[330px] cursor-pointer transition-transform duration-700 preserve-3d"
                    style={{
                      transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${
                        (isCardFlipped ? 180 : 0) + cardTilt.rotateY
                      }deg)`,
                    }}
                  >
                    {/* FRENTE OFICIAL DO CARTÃO */}
                    <div className="absolute inset-0 backface-hidden rounded-2xl bg-[#04142C] border border-[#C59B64]/50 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-5 sm:p-8 text-center">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-25"
                        style={{
                          background: `radial-gradient(circle at ${cardTilt.glareX}% ${cardTilt.glareY}%, rgba(229, 201, 155, 0.45), transparent 60%)`,
                        }}
                      />
                      <GoldCornerCurveTopRight className="absolute top-0 right-0 w-28 sm:w-56 opacity-95" />
                      <GoldCornerCurveBottomLeft className="absolute bottom-0 left-0 w-36 sm:w-72 opacity-95" />

                      <div className="relative z-10 flex flex-col items-center space-y-2.5 sm:space-y-4">
                        <img
                          src="/assets/kr-monograma-ouro.png"
                          alt="Monograma KR"
                          className="w-16 h-16 sm:w-28 sm:h-28 object-contain"
                        />
                        <div className="space-y-1 pt-0.5">
                          <h4 className="display text-xl sm:text-4xl tracking-[0.06em] text-white uppercase">
                            {DOCTOR_INFO.upperName}
                          </h4>
                          <p className="mono text-[9px] sm:text-[11px] text-[#E5C99B]">
                            {DOCTOR_INFO.fullCredential}
                          </p>
                        </div>
                      </div>

                      <span className="absolute bottom-2.5 right-3.5 sm:bottom-4 sm:right-5 mono text-[9px] sm:text-[10px] text-[#E5C99B]/80">
                        Toque para virar ↻
                      </span>
                    </div>

                    {/* VERSO OFICIAL DO CARTÃO (Responsivo para Celular e Desktop) */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-white text-[#061325] border-2 border-[#C59B64]/60 shadow-2xl overflow-hidden grid grid-cols-12">
                      <div className="col-span-4 fluted-alabaster border-r-[3px] sm:border-r-[5px] border-[#C59B64] flex items-center justify-center p-2.5 sm:p-6">
                        <div className="w-14 h-14 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl bg-[#07162B] p-2.5 sm:p-3.5 shadow-lg border border-[#C59B64]/45 flex items-center justify-center">
                          <img
                            src="/assets/kr-monograma-ouro.png"
                            alt="KR"
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>

                      <div
                        className="col-span-8 p-3.5 sm:p-9 flex flex-col justify-center space-y-2.5 sm:space-y-5 bg-white relative text-left"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div>
                          <h4 className="font-sans font-bold text-sm sm:text-2xl text-[#07162B] leading-tight">
                            {DOCTOR_INFO.name}
                          </h4>
                          <p className="mono text-[9px] sm:text-[11px] text-[#9A7240] mt-0.5">
                            Cirurgiã-Dentista | {DOCTOR_INFO.cro}
                          </p>
                        </div>

                        <div className="space-y-1.5 sm:space-y-3 text-xs sm:text-base">
                          <a
                            href={WHATSAPP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 sm:gap-3 text-[#07162B] hover:text-[#9A7240] font-medium transition-colors"
                          >
                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-[#C59B64] flex items-center justify-center text-[#9A7240] text-[10px] sm:text-xs shrink-0">
                              ✆
                            </span>
                            <span className="text-xs sm:text-base font-semibold">
                              {DOCTOR_INFO.phoneDisplay}
                            </span>
                          </a>

                          <a
                            href={DOCTOR_INFO.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 sm:gap-3 text-[#07162B] hover:text-[#9A7240] font-medium transition-colors"
                          >
                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-[#C59B64] flex items-center justify-center text-[#9A7240] text-[10px] sm:text-xs shrink-0">
                              ◎
                            </span>
                            <span className="text-xs sm:text-base font-semibold">
                              {DOCTOR_INFO.instagramHandle}
                            </span>
                          </a>

                          <a
                            href={`mailto:${DOCTOR_INFO.email}`}
                            className="flex items-center gap-2 sm:gap-3 text-[#07162B] hover:text-[#9A7240] font-medium transition-colors text-[10px] sm:text-sm break-all"
                          >
                            <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-md border border-[#C59B64] flex items-center justify-center text-[#9A7240] text-[10px] sm:text-xs shrink-0">
                              ✉
                            </span>
                            <span>{DOCTOR_INFO.email}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO + FOOTER (Painel Concierge Exclusivo na Zona Clara) */}
        <section
          id="contato"
          className="contato sec-cream is-closing"
          data-index="09 — Agendamento & Contato"
        >
          <div className="wrap">
            <div
              data-reveal
              className="rounded-3xl bg-[#040B16] text-[#F4F1EA] border border-[#C59B64]/45 p-8 sm:p-12 lg:p-16 shadow-[0_32px_80px_-24px_rgba(4,11,22,0.45)] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#081528] border border-[#C59B64]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C99B]" />
                  <span
                    className="mono text-[10px] tracking-[0.2em]"
                    style={{ color: "#E5C99B" }}
                  >
                    ATENDIMENTO EXCLUSIVO EM GOIÂNIA · CRO-GO 22911
                  </span>
                </div>

                <h2
                  className="display text-4xl sm:text-6xl text-white leading-[0.95]"
                  style={{ color: "#FFFFFF", textShadow: "none" }}
                >
                  Seu sorriso merece
                  <br />
                  <span
                    className="display-outline"
                    style={{ WebkitTextStroke: "2px #E5C99B" }}
                  >
                    precisão e arte
                  </span>
                </h2>

                <p
                  className="font-sans text-base leading-relaxed max-w-xl"
                  style={{ color: "rgba(244, 241, 234, 0.85)" }}
                >
                  Fale diretamente pelo WhatsApp oficial ou escolha o melhor
                  período para sua avaliação com a Dra. Kéryda Ramos (UFG).
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-4 rounded-full bg-gradient-to-r from-[#E5C99B] via-[#C59B64] to-[#DFBE90] text-[#040B16] font-sans font-bold text-xs uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                    data-hover
                    data-magnetic="0.3"
                  >
                    WhatsApp Direto ({DOCTOR_INFO.phoneDisplay})
                  </a>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenBooking(
                        "Avaliação Odontológica com a Dra. Kéryda Ramos"
                      )
                    }
                    style={{ color: "#F4F1EA" }}
                    className="px-7 py-4 rounded-full border border-[#E5C99B]/45 hover:border-[#E5C99B] font-sans font-semibold text-xs uppercase tracking-[0.14em] transition-transform hover:-translate-y-0.5"
                    data-hover
                    data-magnetic="0.3"
                  >
                    Escolher Horário da Consulta
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#081528] rounded-2xl border border-[#C59B64]/30 p-6 sm:p-8 space-y-5 text-left">
                <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
                  <img
                    src="/assets/kr-monograma-ouro.png"
                    alt="KR"
                    className="w-11 h-11 object-contain"
                  />
                  <div>
                    <span
                      className="font-sans font-bold text-lg block leading-tight"
                      style={{ color: "#FFFFFF" }}
                    >
                      {DOCTOR_INFO.name}
                    </span>
                    <span
                      className="mono text-[10px] block mt-0.5"
                      style={{ color: "#E5C99B" }}
                    >
                      {DOCTOR_INFO.fullCredential} · UFG
                    </span>
                  </div>
                </div>

                <div className="space-y-3 font-sans text-sm">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#F4F1EA" }}
                    className="flex items-center justify-between py-2 border-b border-white/10 hover:text-[#E5C99B] transition-colors"
                  >
                    <span
                      className="mono text-[10px]"
                      style={{ color: "#E5C99B" }}
                    >
                      WHATSAPP
                    </span>
                    <span className="font-semibold">
                      {DOCTOR_INFO.phoneFormatted}
                    </span>
                  </a>
                  <a
                    href={DOCTOR_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#F4F1EA" }}
                    className="flex items-center justify-between py-2 border-b border-white/10 hover:text-[#E5C99B] transition-colors"
                  >
                    <span
                      className="mono text-[10px]"
                      style={{ color: "#E5C99B" }}
                    >
                      INSTAGRAM
                    </span>
                    <span className="font-semibold">
                      {DOCTOR_INFO.instagramHandle}
                    </span>
                  </a>
                  <a
                    href={`mailto:${DOCTOR_INFO.email}`}
                    style={{ color: "#F4F1EA" }}
                    className="flex items-center justify-between py-2 hover:text-[#E5C99B] transition-colors"
                  >
                    <span
                      className="mono text-[10px]"
                      style={{ color: "#E5C99B" }}
                    >
                      E-MAIL
                    </span>
                    <span className="text-xs sm:text-sm break-all">
                      {DOCTOR_INFO.email}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <footer className="footer">
            <div className="wrap footer__inner">
              <span className="mono">
                Dra. Kéryda Ramos · Cirurgiã-Dentista · CRO-GO 22911 · UFG
              </span>
              <a href="#consulta" className="mono" data-hover>
                Avaliação
              </a>
              <span className="mono footer__year">
                Dra. Kéryda Ramos © {new Date().getFullYear()}. Todos os direitos
                reservados.
              </span>
            </div>
            <div className="wrap footer__sign">
              <FooterSignature />
            </div>
          </footer>
        </section>
      </main>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialSubject={bookingSubject}
      />
    </ScrollProvider>
  );
}

export default App;
