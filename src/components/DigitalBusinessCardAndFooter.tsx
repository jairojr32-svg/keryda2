import React, { useState, useEffect, useRef } from 'react';
import { DOCTOR_INFO, TREATMENTS_DATA } from '../data/dentalData';
import { GoldCornerCurveTopRight, GoldCornerCurveBottomLeft } from './BrandOrnament';

interface DigitalBusinessCardAndFooterProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

export const DigitalBusinessCardAndFooter: React.FC<DigitalBusinessCardAndFooterProps> = ({
  onOpenBooking,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  const [liveTime, setLiveTime] = useState('');
  const cardStageRef = useRef<HTMLDivElement | null>(null);

  // Relógio em tempo real (Módulo 9896 da WolfStone)
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo',
      hour12: false,
    });
    const updateClock = () => setLiveTime(formatter.format(new Date()));
    updateClock();
    const interval = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardStageRef.current) return;
    const rect = cardStageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      rotateX: (0.5 - y) * 10,
      rotateY: (x - 0.5) * 12,
      glareX: Math.round(x * 100),
      glareY: Math.round(y * 100),
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50 });
  };

  const handleDownloadVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'FN:Dra. Kéryda Ramos',
      'N:Ramos;Kéryda;;Dra.;',
      'TITLE:Cirurgiã-Dentista | CRO-GO 22911',
      'TEL;TYPE=CELL,VOICE:+5562982440962',
      'EMAIL;TYPE=INTERNET:drakerydaramos@gmail.com',
      'URL:https://instagram.com/kerydaramos',
      'NOTE:Dra. Kéryda Ramos (CRO-GO 22911 | UFG) — Odontologia Estética, Preventiva e Reabilitação.',
      'END:VCARD',
    ].join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Dra_Keryda_Ramos_CRO_GO_22911.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const whatsappDirectUrl = `https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Olá, Dra. Kéryda! Gostaria de agendar uma consulta odontológica.'
  )}`;

  return (
    <>
      {/* Seção Monumental "Vamos conversar" (Inspirada no Fechamento WolfStone) + Cartão 3D Oficial */}
      <section
        id="cartao-contato"
        className="relative z-10 py-24 lg:py-36 bg-[#040B16] text-[#F4F1EA] border-t border-gold-500/20 overflow-hidden"
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-10 lg:px-16 space-y-24">
          {/* Bloco 1: Call to Action Monumental WolfStone */}
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <span className="mono text-gold-300 block">Vamos conversar</span>

            <h2 className="display text-5xl sm:text-7xl lg:text-[92px] text-white leading-[0.95]">
              Seu sorriso <br />
              <em>merece excelência.</em>
            </h2>

            <p className="font-sans font-light text-base sm:text-lg text-alabaster-300 max-w-xl mx-auto leading-relaxed">
              Atendimento individualizado com hora marcada para clareamento dental, limpeza
              profunda, restaurações e facetas em resina, coroas em porcelana e reabilitação oral.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-hover="true"
                data-magnetic="0.3"
                className="pill"
              >
                Fale conosco ({DOCTOR_INFO.phoneDisplay})
              </a>

              <button
                type="button"
                onClick={() => onOpenBooking('Agendamento de Consulta com a Dra. Kéryda Ramos')}
                data-hover="true"
                data-magnetic="0.3"
                className="pill pill--ghost"
              >
                Agende uma consulta
              </button>
            </div>
          </div>

          {/* Bloco 2: Cartão de Visitas Oficial Físico/Digital em 3D (Flip Frente/Verso) */}
          <div className="pt-12 border-t border-gold-500/20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="mono text-gold-300 block">Identidade Oficial • CRO-GO 22911</span>
              <h3 className="display text-4xl sm:text-5xl text-white leading-[1.02]">
                Cartão de Visitas <br />
                <em>Interativo em 3D</em>
              </h3>
              <p className="font-sans font-light text-sm sm:text-base text-alabaster-300 leading-relaxed">
                Toque no cartão ao lado para girá-lo em 3D entre a frente em Azul Marinho Profundo
                e o verso em Alabastro Canelado com os contatos diretos da Dra. Kéryda Ramos.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFlipped(!isFlipped)}
                  data-hover="true"
                  className="pill pill--ghost text-xs"
                >
                  ↻ Girar Cartão ({isFlipped ? 'Ver Frente' : 'Ver Verso'})
                </button>

                <button
                  type="button"
                  onClick={handleDownloadVCard}
                  data-hover="true"
                  className="pill text-xs"
                >
                  Salvar Contato (.vcf)
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                ref={cardStageRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="perspective-1000 w-full"
              >
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="relative w-full aspect-[16/9.2] min-h-[280px] sm:min-h-[340px] cursor-pointer transition-transform duration-700 preserve-3d"
                  style={{
                    transform: `rotateX(${tilt.rotateX}deg) rotateY(${
                      (isFlipped ? 180 : 0) + tilt.rotateY
                    }deg)`,
                  }}
                >
                  {/* FRENTE OFICIAL DO CARTÃO */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl bg-[#04142C] border border-gold-400/50 shadow-2xl overflow-hidden flex flex-col items-center justify-center p-8 text-center">
                    <div
                      className="pointer-events-none absolute inset-0 opacity-25"
                      style={{
                        background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(229, 201, 155, 0.45), transparent 60%)`,
                      }}
                    />
                    <GoldCornerCurveTopRight className="absolute top-0 right-0 w-44 sm:w-56 opacity-95" />
                    <GoldCornerCurveBottomLeft className="absolute bottom-0 left-0 w-56 sm:w-72 opacity-95" />

                    <div className="relative z-10 flex flex-col items-center space-y-4">
                      <img
                        src="/assets/kr-monograma-ouro.png"
                        alt="Monograma KR"
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                      />
                      <div className="space-y-1.5 pt-1">
                        <h4 className="display text-3xl sm:text-4xl tracking-[0.06em] text-white uppercase">
                          {DOCTOR_INFO.upperName}
                        </h4>
                        <p className="mono text-[11px] text-alabaster-300">
                          {DOCTOR_INFO.fullCredential}
                        </p>
                      </div>
                    </div>

                    <span className="absolute bottom-4 right-5 mono text-[10px] text-gold-300/75">
                      Clique para virar ↻
                    </span>
                  </div>

                  {/* VERSO OFICIAL DO CARTÃO */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-white text-navy-950 border-2 border-gold-400/60 shadow-2xl overflow-hidden grid grid-cols-12">
                    <div className="col-span-4 fluted-alabaster border-r-[5px] border-[#C59B64] flex items-center justify-center p-4 sm:p-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#07162B] p-3.5 shadow-lg border border-gold-400/45 flex items-center justify-center">
                        <img
                          src="/assets/kr-monograma-ouro.png"
                          alt="KR"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>

                    <div
                      className="col-span-8 p-6 sm:p-9 flex flex-col justify-center space-y-5 bg-white relative text-left"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div>
                        <h4 className="font-sans font-semibold text-xl sm:text-2xl text-[#07162B]">
                          {DOCTOR_INFO.name}
                        </h4>
                        <p className="mono text-[11px] text-[#9A7240] mt-1">
                          Cirurgiã-Dentista | {DOCTOR_INFO.cro}
                        </p>
                      </div>

                      <div className="space-y-3 text-sm sm:text-base">
                        <a
                          href={whatsappDirectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-[#07162B] hover:text-[#9A7240] font-medium transition-colors"
                        >
                          <span className="w-7 h-7 rounded-md border border-[#C59B64] flex items-center justify-center text-[#9A7240] text-xs">
                            ✆
                          </span>
                          <span>{DOCTOR_INFO.phoneDisplay}</span>
                        </a>

                        <a
                          href={DOCTOR_INFO.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 text-[#07162B] hover:text-[#9A7240] font-medium transition-colors"
                        >
                          <span className="w-7 h-7 rounded-md border border-[#C59B64] flex items-center justify-center text-[#9A7240] text-xs">
                            ◎
                          </span>
                          <span>{DOCTOR_INFO.instagramHandle}</span>
                        </a>

                        <a
                          href={`mailto:${DOCTOR_INFO.email}`}
                          className="flex items-center gap-3 text-[#07162B] hover:text-[#9A7240] font-medium transition-colors text-xs sm:text-sm break-all"
                        >
                          <span className="w-7 h-7 rounded-md border border-[#C59B64] flex items-center justify-center text-[#9A7240] text-xs shrink-0">
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

          {/* Rodapé Estilo WolfStone com Relógio BRT ao Vivo */}
          <footer className="pt-12 border-t border-gold-500/20 space-y-8 text-xs text-alabaster-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-white font-medium">
                  Dra. Kéryda Ramos · {DOCTOR_INFO.fullCredential} · Formada pela UFG
                </span>
                <span className="opacity-30">|</span>
                <a
                  href={`mailto:${DOCTOR_INFO.email}`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {DOCTOR_INFO.email}
                </a>
              </div>

              <div className="mono text-[11px] text-alabaster-300/80">
                Dra. Kéryda Ramos © {new Date().getFullYear()}. Todos os direitos reservados.
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="inline-flex items-center gap-3">
                <img
                  src="/assets/kr-monograma-ouro.png"
                  alt=""
                  width={18}
                  height={18}
                  className="opacity-75 object-contain"
                />
                <span className="mono text-[11px] text-gold-300">
                  {liveTime ? `${liveTime} BRT` : '—'}
                </span>
              </div>

              <a
                href="https://instagram.com/kerydaramos"
                target="_blank"
                rel="noopener noreferrer"
                className="mono text-[11px] text-alabaster-300 hover:text-gold-300 transition-colors"
              >
                {DOCTOR_INFO.instagramHandle}
              </a>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSubject: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialSubject,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [shift, setShift] = useState('Manhã');
  const [subject, setSubject] = useState(initialSubject);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const procedureOptions = [
    '🚨 Emergência Odontológica / Dor de Dente Aguda',
    'Avaliação Odontológica Geral com a Dra. Kéryda Ramos',
    'Dentística: Lentes de Contato, Facetas de Resina & Clareamento',
    'Implantodontia: Implantes Dentários',
    'Endodontia: Tratamento de Canal',
    'Ortodontia: Aparelhos Dentários',
    'Próteses Dentárias & Coroas em Porcelana',
    'Clínica Geral: Limpeza Completa & Restaurações',
    'Extração Geral & Dentes do Siso',
    'Harmonização Facial (Botox) & Tratamento de DTM',
  ];

  const handleOpenWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const msgLines = [
      `Olá, Dra. Kéryda Ramos! Tudo bem?`,
      `Meu nome é *${name || 'Paciente'}* e gostaria de agendar uma consulta.`,
      ``,
      `• *Atendimento:* ${subject}`,
      `• *Período de preferência:* ${shift}`,
      phone ? `• *Meu contato:* ${phone}` : '',
      notes ? `• *Observação:* ${notes}` : '',
    ].filter(Boolean);

    const url = `https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
      msgLines.join('\n')
    )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#02060D]/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-booking-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#040B16] text-white p-7 sm:p-9 shadow-2xl border border-gold-400/45"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-5 border-b border-gold-500/20">
          <div className="flex items-center gap-3">
            <img
              src="/assets/kr-monograma-ouro.png"
              alt="KR"
              className="w-9 h-9 object-contain"
            />
            <div>
              <span className="mono text-[10px] text-gold-300 block">
                {DOCTOR_INFO.name} · {DOCTOR_INFO.cro}
              </span>
              <h3 id="modal-booking-title" className="display text-3xl text-white mt-0.5">
                Agendar Consulta
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="w-9 h-9 rounded-full border border-gold-500/35 text-gold-300 hover:border-gold-300 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleOpenWhatsApp} className="space-y-4 pt-5">
          <div>
            <label className="block mono text-[10px] text-gold-300 mb-1.5">
              Procedimento de Interesse
            </label>
            <select
              value={procedureOptions.includes(subject) ? subject : procedureOptions[0]}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-[#071426] border border-gold-500/35 font-sans text-sm text-white focus:outline-none focus:border-gold-300"
            >
              {!procedureOptions.includes(subject) && (
                <option value={subject}>{subject}</option>
              )}
              {procedureOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mono text-[10px] text-gold-300 mb-1.5">
                Seu Nome *
              </label>
              <input
                type="text"
                required
                placeholder="Digite seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#071426] border border-gold-500/35 font-sans text-sm text-white placeholder:text-alabaster-300/50 focus:outline-none focus:border-gold-300"
              />
            </div>

            <div>
              <label className="block mono text-[10px] text-gold-300 mb-1.5">
                Seu Telefone
              </label>
              <input
                type="tel"
                placeholder="(62) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#071426] border border-gold-500/35 font-sans text-sm text-white placeholder:text-alabaster-300/50 focus:outline-none focus:border-gold-300"
              />
            </div>
          </div>

          <div>
            <label className="block mono text-[10px] text-gold-300 mb-1.5">
              Período de Preferência
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {['Manhã', 'Tarde', 'Final do dia'].map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setShift(opt)}
                  className={`py-2.5 px-3 rounded-xl font-sans text-xs font-medium border transition-all ${
                    shift === opt
                      ? 'bg-[#C59B64] text-[#040B16] border-[#C59B64] font-semibold'
                      : 'bg-[#071426] text-alabaster-300 border-gold-500/30 hover:border-gold-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mono text-[10px] text-gold-300 mb-1.5">
              Observação (opcional)
            </label>
            <input
              type="text"
              placeholder="Ex.: Quero fazer limpeza e avaliar clareamento"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#071426] border border-gold-500/35 font-sans text-sm text-white placeholder:text-alabaster-300/50 focus:outline-none focus:border-gold-300"
            />
          </div>

          <div className="pt-3">
            <button type="submit" className="w-full pill py-4">
              Continuar no WhatsApp ({DOCTOR_INFO.phoneDisplay})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
