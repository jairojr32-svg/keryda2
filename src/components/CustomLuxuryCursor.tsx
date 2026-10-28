import React, { useEffect, useId, useRef, useState } from 'react';

/**
 * Cursor Editorial Magnético & Iluminação Ambiental (Nível Awwwards / Cartier / Studio Freight)
 * - Renderizado exclusivamente em dispositivos desktop com ponteiro fino (`pointer: fine`).
 * - Utiliza `requestAnimationFrame` com interpolação linear (lerp) diretamente no DOM (zero re-renders por frame).
 * - Projeta um foco de luz radial sutil (`600px circle`) que ilumina a superfície azul-marinho couture.
 */
export const CustomLuxuryCursor: React.FC = () => {
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(pointer: fine)');

    const updatePointerCapability = () => {
      setIsFinePointer(mediaQuery.matches);
    };

    updatePointerCapability();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updatePointerCapability);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', updatePointerCapability);
      }
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isFinePointer || typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lerpFactor = prefersReducedMotion ? 1 : 0.16;

    const animateCursor = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x.toFixed(2)}px, ${ringPos.current.y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x.toFixed(2)}px, ${mousePos.current.y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      }

      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(600px circle at ${ringPos.current.x.toFixed(1)}px ${ringPos.current.y.toFixed(1)}px, rgba(197, 155, 100, 0.07), transparent 70%)`;
      }

      rafId.current = window.requestAnimationFrame(animateCursor);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;

      if (!isVisible) {
        ringPos.current.x = event.clientX;
        ringPos.current.y = event.clientY;
        setIsVisible(true);
      }

      const target = event.target as HTMLElement | null;
      if (target) {
        const interactiveElement = target.closest(
          'a, button, [role="button"], input, select, textarea, label, [data-cursor-luxury]'
        );
        setIsHoveringInteractive(Boolean(interactiveElement));
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId.current = window.requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  }, [isFinePointer, isVisible]);

  if (!isFinePointer) {
    return null;
  }

  return (
    <>
      {/* Foco de Luz Radial Ambiental (600px circle) que ilumina as superfícies Azul-Marinho */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(600px circle at 50% 35%, rgba(197, 155, 100, 0.07), transparent 70%)',
        }}
      />

      {/* Anel Seguidor Dourado Sutil com Suavização por requestAnimationFrame */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full border border-gold-400/60 will-change-transform transition-[width,height,background-color,border-color,opacity,box-shadow] duration-300 ease-out flex items-center justify-center ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isPressed
            ? 'w-8 h-8 bg-gold-400/15 border-gold-300/90 shadow-gold-aura'
            : isHoveringInteractive
              ? 'w-14 h-14 bg-gold-400/10 border-gold-300/85 shadow-gold-aura backdrop-blur-[1px]'
              : 'w-9 h-9 bg-transparent border-gold-400/60'
        }`}
      >
        <span
          className={`rounded-full border border-gold-300/35 transition-all duration-300 ${
            isHoveringInteractive ? 'w-10 h-10 opacity-100' : 'w-0 h-0 opacity-0'
          }`}
        />
      </div>

      {/* Ponto Central de Precisão Óptica em Folha de Ouro */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-50 rounded-full will-change-transform transition-[width,height,opacity,background-color] duration-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${
          isHoveringInteractive
            ? 'w-1.5 h-1.5 bg-gold-300 shadow-[0_0_10px_rgba(226,202,163,0.9)]'
            : 'w-1 h-1 bg-gold-400/90'
        }`}
      />
    </>
  );
};

interface RotatingGoldSealProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Selo Circular Arquitetônico em SVG com Texto Circular Giratório Lento
 * ("DRA. KÉRYDA RAMOS • CRO-GO 22911 • UFG • ALTA ODONTOLOGIA •")
 * e o Monograma Oficial `KR` no centro.
 */
export const RotatingGoldSeal: React.FC<RotatingGoldSealProps> = ({
  className = '',
  size = 'md',
}) => {
  const uniqueId = useId().replace(/:/g, '');
  const textPathId = `kr-seal-circle-${uniqueId}`;
  const goldGradId = `kr-seal-grad-${uniqueId}`;

  const dimensions = {
    sm: 'w-24 h-24 sm:w-28 sm:h-28',
    md: 'w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36',
    lg: 'w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-[#040D1A]/90 backdrop-blur-md border border-gold-400/45 shadow-couture select-none ${dimensions} ${className}`}
      aria-label="Selo de Autenticidade Dra. Kéryda Ramos — CRO-GO 22911 • UFG • Alta Odontologia"
    >
      {/* Anel Concêntrico Externo em Fio de Ouro */}
      <span
        className="absolute inset-1.5 rounded-full border border-gold-400/20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Texto Circular Arquitetônico em SVG com Rotação Contínua Suave */}
      <svg
        viewBox="0 0 160 160"
        className="w-full h-full animate-[spin_28s_linear_infinite] p-1.5"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={goldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E2C7" />
            <stop offset="50%" stopColor="#D4B280" />
            <stop offset="100%" stopColor="#C59B64" />
          </linearGradient>
          <path
            id={textPathId}
            d="M 80, 80 m -60, 0 a 60,60 0 1,1 120,0 a 60,60 0 1,1 -120,0"
            fill="none"
          />
        </defs>

        <text
          fill={`url(#${goldGradId})`}
          className="font-sans uppercase"
          style={{
            fontSize: '9.1px',
            fontWeight: 600,
            letterSpacing: '0.215em',
          }}
        >
          <textPath href={`#${textPathId}`} startOffset="0%">
            DRA. KÉRYDA RAMOS • CRO-GO 22911 • UFG • ALTA ODONTOLOGIA •
          </textPath>
        </text>
      </svg>

      {/* Medalhão Central com Monograma Oficial KR */}
      <div className="absolute inset-[27%] rounded-full bg-gradient-to-b from-[#081933] to-[#030A15] border border-gold-400/50 shadow-inner flex flex-col items-center justify-center p-2">
        <img
          src="/assets/kr-monograma-ouro.png"
          alt="Monograma KR"
          className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
        />
        <span className="font-serif text-[8px] tracking-[0.22em] text-gold-300/85 uppercase mt-0.5 leading-none">
          KR
        </span>
      </div>
    </div>
  );
};

export default CustomLuxuryCursor;
