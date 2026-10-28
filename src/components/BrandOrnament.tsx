import React from 'react';

/**
 * Componentes ornamentais arquitetônicos extraídos fielmente do Cartão de Visitas Oficial
 * da Dra. Kéryda Ramos (Dr_Keryda-Cartao_de_Visitas.pdf):
 * - Molduras de linhas curvas em gradiente metálico Dourado/Bronze Nobre
 * - Medalhão oficial do Monograma KR
 */

export const GoldCornerCurveTopRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 220 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="krGoldGradTR" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EAD2B5" />
        <stop offset="45%" stopColor="#C69760" />
        <stop offset="100%" stopColor="#9E6E3A" />
      </linearGradient>
    </defs>
    <path
      d="M16 0 V42 C16 74 40 94 76 94 H220"
      stroke="url(#krGoldGradTR)"
      strokeWidth="8"
      strokeLinecap="butt"
    />
    <path
      d="M32 0 V38 C32 62 50 78 78 78 H220"
      stroke="url(#krGoldGradTR)"
      strokeWidth="1.5"
      strokeOpacity="0.45"
    />
  </svg>
);

export const GoldCornerCurveBottomLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 340 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="krGoldGradBL" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#EAD2B5" />
        <stop offset="50%" stopColor="#C69760" />
        <stop offset="100%" stopColor="#8F6130" />
      </linearGradient>
    </defs>
    <path
      d="M0 14 H56 C86 14 102 32 102 62 V86 C102 114 120 130 152 130 H282 C310 130 326 142 326 160"
      stroke="url(#krGoldGradBL)"
      strokeWidth="9"
      strokeLinecap="butt"
    />
    <path
      d="M0 28 H52 C74 28 88 42 88 64 V88 C88 122 112 144 150 144 H278"
      stroke="url(#krGoldGradBL)"
      strokeWidth="1.5"
      strokeOpacity="0.4"
    />
  </svg>
);

export const KRMonogramBadge: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  variant?: 'navy' | 'transparent';
  className?: string;
}> = ({ size = 'md', variant = 'navy', className = '' }) => {
  const dimensions = {
    sm: 'w-10 h-10 rounded-xl p-1.5',
    md: 'w-12 h-12 rounded-xl p-2',
    lg: 'w-16 h-16 rounded-2xl p-2.5',
  }[size];

  const surface =
    variant === 'navy'
      ? 'bg-navy-900 border border-gold-500/40 shadow-sm'
      : 'bg-transparent';

  return (
    <div className={`inline-flex items-center justify-center shrink-0 overflow-hidden ${dimensions} ${surface} ${className}`}>
      <img
        src="/assets/kr-monograma-ouro.png"
        alt="Monograma KR — Dra. Kéryda Ramos"
        className="w-full h-full object-contain"
      />
    </div>
  );
};
