import { useEffect, useState } from "react";
import Logo3D from "./Logo3D";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Consultório", href: "#sobre" },
  { label: "Especialidades", href: "#solucoes" },
  { label: "Resultados", href: "#provas" },
  { label: "Processo", href: "#processo" },
  { label: "Dúvidas", href: "#faq" },
  { label: "Consulta", href: "#consulta" },
];

// WhatsApp da Dra. Kéryda Ramos: +55 62 98244-0962
export const WHATSAPP_URL =
  "https://wa.me/5562982440962?text=Ol%C3%A1%20Dra.%20K%C3%A9ryda%2C%20gostaria%20de%20agendar%20uma%20consulta%20odontol%C3%B3gica.";

export const EMERGENCY_WHATSAPP_URL =
  "https://wa.me/5562982440962?text=Ol%C3%A1%20Dra.%20K%C3%A9ryda%2C%20preciso%20de%20ATENDIMENTO%20DE%20EMERG%C3%8ANCIA%20odontol%C3%B3gica.";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava o scroll da página quando o menu mobile está aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`site-header ${scrolled ? "is-scrolled" : ""} ${
        open ? "is-menu-open" : ""
      }`}
    >
      <div className="site-header__inner">
        <Logo3D />

        <nav className={`site-nav ${open ? "is-open" : ""}`}>
          <div className="site-nav__links">
            {NAV.map((n, idx) => (
              <a
                key={n.href}
                href={n.href}
                className="kinetic"
                data-label={n.label}
                onClick={() => setOpen(false)}
              >
                <span className="site-nav__index mono">0{idx + 1}</span>
                <span>{n.label}</span>
              </a>
            ))}
          </div>

          {/* Rodapé exclusivo do Menu Mobile Fullscreen */}
          <div className="site-nav__mobile-footer">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn--solid w-full justify-center"
            >
              Agendar pelo WhatsApp (62 98244-0962)
            </a>
            <a
              href={EMERGENCY_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn--ghost w-full justify-center"
            >
              🚨 Emergência Odontológica Agora
            </a>
            <div className="flex items-center justify-between mono text-[10px] text-[#E5C99B]/80 pt-2">
              <span>DRA. KÉRYDA RAMOS · CRO-GO 22911</span>
              <span>@kerydaramos</span>
            </div>
          </div>
        </nav>

        <div className="site-header__right">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="pill"
            data-hover
            data-magnetic="0.3"
          >
            Fale conosco
          </a>

          {/* CTA compacto visível no Mobile ao lado do menu */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-header-cta mono"
          >
            Agendar
          </a>

          <button
            className={`burger ${open ? "is-open" : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
