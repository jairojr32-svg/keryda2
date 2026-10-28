import React, { useState, useEffect, useRef } from 'react';
import { DOCTOR_INFO } from '../data/dentalData';

interface NavbarProps {
  onOpenBooking: (defaultSubject?: string) => void;
}

interface NavItem {
  label: string;
  href: string;
  fallbackHref?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Início', href: '#hero', fallbackHref: '#inicio' },
  { label: 'Consultório', href: '#consultorio', fallbackHref: '#sobre-doutora' },
  { label: 'Especialidades', href: '#solucoes', fallbackHref: '#tratamentos' },
  { label: 'Resultados', href: '#resultados', fallbackHref: '#atelier-sorriso' },
  { label: 'Processo', href: '#processo', fallbackHref: '#jornada' },
  { label: 'Dúvidas', href: '#duvidas' },
  { label: 'Contato', href: '#contato', fallbackHref: '#cartao-contato' },
];

const EXTRUSION_LAYERS = Array.from({ length: 10 }, (_, t) => t);

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isLightZone, setIsLightZone] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logo3dRef = useRef<HTMLSpanElement | null>(null);
  const targetPointer = useRef({ x: 0, y: 0 });
  const currentPointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const bodyIsCream = document.body.classList.contains('is-cream');
      const rootLight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--light') || '0'
      );
      setIsLightZone(bodyIsCream || rootLight > 0.55);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Módulo 5492 Wolfstone: Logo 3D em 10 Camadas Extrudadas oscilando em requestAnimationFrame
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId: number | null = null;
    const startTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      const ny = (e.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
      targetPointer.current.x = nx;
      targetPointer.current.y = ny;
    };

    const tick = (now: number) => {
      const c = (now - startTime) * 0.001;
      currentPointer.current.x += (targetPointer.current.x - currentPointer.current.x) * 0.08;
      currentPointer.current.y += (targetPointer.current.y - currentPointer.current.y) * 0.08;

      const pointerX = currentPointer.current.x;
      const pointerY = currentPointer.current.y;

      if (logo3dRef.current) {
        const rotY = prefersReducedMotion
          ? 0
          : 5 * Math.sin(0.7 * c) + 10 * pointerX;
        const rotX = prefersReducedMotion
          ? 0
          : 2.5 * Math.cos(0.55 * c) - 8 * pointerY;
        logo3dRef.current.style.transform = `rotateY(${rotY.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    const primaryTarget = document.querySelector(item.href);
    const fallbackTarget = item.fallbackHref ? document.querySelector(item.fallbackHref) : null;
    const targetEl = primaryTarget || fallbackTarget;

    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const handleMagneticMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const strength = parseFloat(el.getAttribute('data-magnetic') || '0.3');
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
    el.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = 'translate3d(0px, 0px, 0)';
  };

  return (
    <header
      className={`site-header ${scrolled ? 'is-scrolled' : ''} ${
        isLightZone ? 'is-light' : ''
      }`}
    >
      <div className="site-header__inner">
        {/* Brand Lockup Wolfstone 5492: .logo3d-wrap > .logo3d (10 Camadas Extrudadas) + Nome & CRO */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, NAV_ITEMS[0])}
          className="logo3d-wrap focus:outline-none group"
          aria-label="Dra. Kéryda Ramos — Cirurgiã-Dentista CRO-GO 22911 · UFG"
        >
          <span ref={logo3dRef} className="logo3d" aria-hidden="true">
            {EXTRUSION_LAYERS.map((t) => (
              <img
                key={t}
                src="/assets/kr-monograma-ouro.png"
                alt={t === 0 ? 'KR' : ''}
                className="logo3d__layer"
                style={{
                  transform: 'translateZ(' + (-0.8 * t).toFixed(2) + 'px)',
                  filter:
                    t === 0
                      ? undefined
                      : 'brightness(' + (1 - (t / 10) * 0.85).toFixed(2) + ')',
                  zIndex: 10 - t,
                }}
              />
            ))}
          </span>

          <span className="flex flex-col leading-none">
            <span className="font-sans text-sm sm:text-[15px] font-semibold tracking-[0.18em] uppercase">
              KÉRYDA RAMOS
            </span>
            <span className="mono text-[10px] sm:text-[11px] text-gold-300 mt-1">
              CRO-GO 22911 · UFG
            </span>
          </span>
        </a>

        {/* Links de navegação com classe .kinetic e data-label={item.label} */}
        <nav
          className="hidden xl:flex items-center gap-7"
          aria-label="Navegação Principal"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-label={item.label}
              onClick={(e) => handleNavClick(e, item)}
              className="kinetic"
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Ação à Direita: Botão .pill com data-magnetic="0.3" */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            type="button"
            data-magnetic="0.3"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            onClick={() =>
              onOpenBooking('Agendamento de Consulta com a Dra. Kéryda Ramos')
            }
            className="pill"
          >
            <span>Agendar consulta</span>
          </button>
        </div>

        {/* Botão Menu Mobile Minimalista */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="xl:hidden flex flex-col items-end justify-center w-11 h-11 rounded-full border border-gold-400/35 px-3 gap-1.5 text-gold-300 hover:border-gold-300 transition-colors"
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`h-[1.5px] bg-current transition-all duration-300 ${
              mobileMenuOpen ? 'w-5 rotate-45 translate-y-[4px]' : 'w-5'
            }`}
          />
          <span
            className={`h-[1.5px] bg-current transition-all duration-300 ${
              mobileMenuOpen ? 'w-5 -rotate-45 -translate-y-[3.5px]' : 'w-3.5'
            }`}
          />
        </button>
      </div>

      {/* Gaveta Mobile */}
      {mobileMenuOpen && (
        <div className="xl:hidden mt-4 rounded-2xl bg-[#040B16]/95 backdrop-blur-2xl border border-gold-400/25 px-6 pt-5 pb-7 text-[#F4F1EA] shadow-2xl">
          <nav className="divide-y divide-gold-500/15" aria-label="Menu Mobile">
            {NAV_ITEMS.map((item, idx) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className="py-3.5 flex items-center justify-between group"
              >
                <span className="display text-2xl text-white group-hover:text-gold-300 transition-colors">
                  {item.label}
                </span>
                <span className="mono text-[11px] text-gold-400">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </nav>

          <div className="mt-6 pt-5 border-t border-gold-500/20 flex flex-col gap-4">
            <button
              type="button"
              data-magnetic="0.3"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking('Agendamento de Consulta pelo Menu');
              }}
              className="pill w-full justify-center"
            >
              <span>Agendar consulta</span>
            </button>

            <div className="flex items-center justify-between mono text-[10px] text-alabaster-300 pt-1">
              <span>{DOCTOR_INFO.phoneDisplay}</span>
              <span>{DOCTOR_INFO.instagramHandle}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
