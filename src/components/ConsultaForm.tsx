"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "success" | "error";

interface FunnelData {
  nome: string;
  telefone: string;
  tratamento: string;
  ultima_consulta: string;
  periodo: string;
  consentimento: boolean;
}

const WHATSAPP_NUMBER = "5562982440962";

const TRATAMENTOS = [
  "🚨 Emergência Odontológica / Dor Aguda / Dente Quebrado",
  "Dentística: Lentes de Contato, Facetas de Resina & Clareamento",
  "Implantodontia: Implantes Dentários Modernos",
  "Endodontia: Tratamento de Canal Sem Dor",
  "Ortodontia: Aparelhos Dentários & Alinhamento",
  "Próteses Dentárias & Coroas em Porcelana",
  "Clínica Geral: Limpeza Completa & Restaurações",
  "Cirurgia Oral: Extração Geral & Dentes do Siso",
  "Harmonização Facial (Botox) & Tratamento de DTM",
];

const ULTIMA_CONSULTA_OPCOES = [
  "Há menos de 6 meses (acompanhamento em dia)",
  "Entre 6 meses e 1 ano",
  "Há mais de 1 ano",
  "Estou com urgência, sensibilidade ou incômodo atual",
];

const PERIODOS = [
  {
    id: "Manhã",
    icon: "☀️",
    title: "Manhã",
    desc: "Atendimento entre 08h e 12h com tranquilidade.",
  },
  {
    id: "Tarde",
    icon: "🌤️",
    title: "Tarde",
    desc: "Atendimento entre 13h30 e 17h30.",
  },
  {
    id: "Final do dia",
    icon: "🌙",
    title: "Final do dia",
    desc: "Horários especiais a partir das 17h30.",
  },
];

function KrMonogram({ size = 76 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Monograma Dra. Kéryda Ramos"
    >
      <circle
        cx="44"
        cy="44"
        r="41"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.2"
      />
      <circle
        cx="44"
        cy="44"
        r="35"
        stroke="currentColor"
        strokeOpacity="0.14"
        strokeWidth="0.8"
      />
      <text
        x="44"
        y="53"
        textAnchor="middle"
        fill="currentColor"
        fontSize="28"
        fontWeight="700"
        letterSpacing="0.08em"
        style={{ fontFamily: "var(--font-brand), Georgia, serif" }}
      >
        KR
      </text>
    </svg>
  );
}

export default function ConsultaForm() {
  const [step, setStep] = useState<number>(0); // 0 = Boas-vindas, 1..6 = Etapas do funil
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const [data, setData] = useState<FunnelData>({
    nome: "",
    telefone: "",
    tratamento: "",
    ultima_consulta: "",
    periodo: "",
    consentimento: true,
  });

  const handleChange = <K extends keyof FunnelData>(field: K, value: FunnelData[K]) => {
    setData((prev) => ({ ...prev, [field]: value }));
    setError("");
  };

  const buildWhatsAppUrl = (d: FunnelData) => {
    const lines = [
      "Olá Dra. Kéryda Ramos! Gostaria de agendar minha avaliação odontológica.",
      "",
      `• *Nome:* ${d.nome.trim()}`,
      `• *WhatsApp:* ${d.telefone.trim()}`,
      `• *Tratamento principal:* ${d.tratamento}`,
      `• *Última consulta:* ${d.ultima_consulta}`,
      `• *Período de preferência:* ${d.periodo}`,
    ];
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const handleNext = () => {
    if (step === 1 && !data.nome.trim()) {
      setError("Por favor, digite seu nome completo.");
      return;
    }
    if (step === 2 && data.telefone.replace(/\D/g, "").length < 10) {
      setError("Por favor, digite um WhatsApp válido com DDD.");
      return;
    }
    if (step === 3 && !data.tratamento) {
      setError("Selecione o tratamento principal que você busca.");
      return;
    }
    if (step === 4 && !data.ultima_consulta) {
      setError("Selecione há quanto tempo realizou sua última consulta.");
      return;
    }
    if (step === 5 && !data.periodo) {
      setError("Selecione o período de sua preferência.");
      return;
    }

    setError("");
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError("");
    setStep((prev) => Math.max(0, prev - 1));
  };

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, "");
    let formatted = digits;
    if (digits.length > 2) {
      formatted = `(${digits.slice(0, 2)}) `;
      if (digits.length > 7) {
        formatted += `${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
      } else {
        formatted += digits.slice(2);
      }
    }
    handleChange("telefone", formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    if (!data.consentimento) {
      setError("É necessário autorizar o contato pelo WhatsApp conforme a LGPD.");
      return;
    }

    setStatus("sending");
    setError("");

    const url = buildWhatsAppUrl(data);
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    setStatus("success");
  };

  const handleReset = () => {
    setData({
      nome: "",
      telefone: "",
      tratamento: "",
      ultima_consulta: "",
      periodo: "",
      consentimento: true,
    });
    setStep(0);
    setStatus("idle");
    setError("");
  };

  if (status === "success") {
    return (
      <div className="cform cform--done" data-reveal>
        <p className="cform__done-kicker mono">Solicitação pronta</p>
        <div className="funnel__wolf-icon" style={{ margin: "1rem auto", width: "64px" }}>
          <KrMonogram size={64} />
        </div>
        <h3 className="display cform__done-title">
          Atendimento <span className="display-outline">iniciado</span>
        </h3>
        <p className="cform__done-text">
          Abrimos sua conversa direta com a equipe da Dra. Kéryda Ramos no WhatsApp com o resumo da sua avaliação. Caso a janela não tenha aberto, clique abaixo:
        </p>
        <div style={{ display: "flex", gap: "0.9rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href={buildWhatsAppUrl(data)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--solid"
            data-hover
            data-magnetic="0.35"
          >
            Abrir WhatsApp agora
          </a>
          <button
            type="button"
            className="btn btn--ghost"
            data-hover
            data-magnetic="0.35"
            onClick={handleReset}
          >
            Nova avaliação
          </button>
        </div>
      </div>
    );
  }

  const totalSteps = 6;
  const progressPct = step === 0 ? 0 : Math.round((step / totalSteps) * 100);

  return (
    <div className="funnel-container cform" data-reveal>
      {/* BARRA DE PROGRESSO */}
      {step > 0 && (
        <div className="funnel-progress">
          <div className="funnel-progress__bar-container">
            <div className="funnel-progress__bar-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <span className="funnel-progress__text mono">
            Passo {step} de {totalSteps}
          </span>
        </div>
      )}

      {/* PASSO 0: BOAS-VINDAS */}
      {step === 0 && (
        <div className="funnel-step funnel-step--welcome">
          <div className="funnel__wolf-logo">
            <KrMonogram size={80} />
          </div>
          <h3 className="funnel__welcome-title">
            Avaliação Odontológica <br />
            <span className="display-outline font-display">Dra. Kéryda</span> Ramos
          </h3>
          <p className="funnel__welcome-desc">
            Responda 5 perguntas rápidas para personalizarmos seu atendimento de clareamento, profilaxia, facetas em resina ou porcelana em Goiânia (CRO-GO 22911 · UFG).
          </p>
          <button
            type="button"
            className="btn btn--solid funnel__btn-start"
            onClick={() => setStep(1)}
            data-hover
          >
            Iniciar pré-avaliação
          </button>
        </div>
      )}

      {/* PASSO 1: NOME */}
      {step === 1 && (
        <div className="funnel-step">
          <h4 className="funnel-question">Como podemos chamar você?</h4>
          <div className="cform__field">
            <input
              type="text"
              value={data.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              placeholder="Digite seu nome completo"
              required
              autoFocus
              className="funnel-input"
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
            />
          </div>
        </div>
      )}

      {/* PASSO 2: WHATSAPP */}
      {step === 2 && (
        <div className="funnel-step">
          <h4 className="funnel-question">Qual o seu WhatsApp com DDD para confirmação de horário?</h4>
          <div className="cform__field">
            <input
              type="tel"
              value={data.telefone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder="(62) 99000-0000"
              required
              autoFocus
              className="funnel-input"
              onKeyDown={(e) => e.key === "Enter" && handleNext()}
            />
          </div>
        </div>
      )}

      {/* PASSO 3: TRATAMENTO PRINCIPAL */}
      {step === 3 && (
        <div className="funnel-step">
          <h4 className="funnel-question">Qual tratamento principal você busca neste momento?</h4>
          <div className="funnel-options-list">
            {TRATAMENTOS.map((t) => (
              <button
                key={t}
                type="button"
                className={`funnel-option-btn ${data.tratamento === t ? "is-selected" : ""}`}
                onClick={() => {
                  handleChange("tratamento", t);
                  setTimeout(() => setStep(4), 180);
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASSO 4: ÚLTIMA CONSULTA */}
      {step === 4 && (
        <div className="funnel-step">
          <h4 className="funnel-question">Há quanto tempo realizou sua última consulta odontológica?</h4>
          <div className="funnel-options-list">
            {ULTIMA_CONSULTA_OPCOES.map((u) => (
              <button
                key={u}
                type="button"
                className={`funnel-option-btn ${data.ultima_consulta === u ? "is-selected" : ""}`}
                onClick={() => {
                  handleChange("ultima_consulta", u);
                  setTimeout(() => setStep(5), 180);
                }}
              >
                {u}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASSO 5: PERÍODO DE PREFERÊNCIA */}
      {step === 5 && (
        <div className="funnel-step">
          <h4 className="funnel-question">Qual o seu período de preferência para a consulta?</h4>
          <div className="funnel-options-grid">
            {PERIODOS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`funnel-card ${data.periodo === p.id ? "is-selected" : ""}`}
                onClick={() => {
                  handleChange("periodo", p.id);
                  setTimeout(() => setStep(6), 180);
                }}
              >
                <div className="funnel-card__icon">{p.icon}</div>
                <div className="funnel-card__title">{p.title}</div>
                <div className="funnel-card__desc">{p.desc}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* PASSO 6: RESUMO E ENVIO DIRETO NO WHATSAPP */}
      {step === 6 && (
        <form onSubmit={handleSubmit} className="funnel-step">
          <h4 className="funnel-question">Tudo pronto, {data.nome.split(" ")[0] || "paciente"}! Confira o resumo da sua avaliação:</h4>
          <p className="funnel__final-desc">
            <strong>Tratamento:</strong> {data.tratamento} <br />
            <strong>Histórico:</strong> {data.ultima_consulta} <br />
            <strong>Preferência:</strong> {data.periodo} · <strong>WhatsApp:</strong> {data.telefone}
          </p>

          <label className="cform__consent">
            <input
              type="checkbox"
              checked={data.consentimento}
              onChange={(e) => handleChange("consentimento", e.target.checked)}
              required
            />
            <span>
              Autorizo o contato da clínica da Dra. Kéryda Ramos via WhatsApp para agendamento da minha avaliação, conforme a LGPD. Sigilo odontológico garantido.
            </span>
          </label>

          {error && (
            <p className="cform__error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn--solid cform__submit"
            style={{ width: "100%", marginTop: "1.5rem" }}
            disabled={status === "sending" || !data.consentimento}
            data-hover
          >
            {status === "sending" ? "Abrindo WhatsApp…" : "Confirmar & Agendar pelo WhatsApp"}
          </button>
        </form>
      )}

      {/* MENSAGEM DE ERRO (ETAPAS INTERMEDIÁRIAS) */}
      {error && step < 6 && (
        <p className="cform__error" role="alert" style={{ marginTop: "1rem" }}>
          {error}
        </p>
      )}

      {/* BOTÕES DE NAVEGAÇÃO */}
      {step > 0 && (
        <div className="funnel-nav">
          <button
            type="button"
            className="funnel-nav-btn funnel-nav-btn--back"
            onClick={handleBack}
          >
            ← Voltar
          </button>
          {step <= 2 && (
            <button
              type="button"
              className="funnel-nav-btn funnel-nav-btn--next btn btn--solid"
              onClick={handleNext}
            >
              Avançar →
            </button>
          )}
        </div>
      )}

      {step === 0 && (
        <p className="cform__note mono" style={{ textAlign: "center", width: "100%" }}>
          Atendimento individualizado · CRO-GO 22911 · Seus dados são confidenciais
        </p>
      )}
    </div>
  );
}
