import React from 'react';

/**
 * Ilustrações vetoriais monoline em fio de ouro (stroke 1.25px) desenhadas sob medida
 * para a identidade editorial KR Odontologia e Estética Avançada.
 */

export const BespokeToothIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10.5 5.5C7.2 5.5 5 8.1 5 11.8C5 15.2 6.8 18.1 7.6 21.6C8.3 24.7 9.1 27.5 11 27.5C12.7 27.5 13.4 23.2 16 23.2C18.6 23.2 19.3 27.5 21 27.5C22.9 27.5 23.7 24.7 24.4 21.6C25.2 18.1 27 15.2 27 11.8C27 8.1 24.8 5.5 21.5 5.5C19.2 5.5 17.6 6.8 16 6.8C14.4 6.8 12.8 5.5 10.5 5.5Z"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.5 10.2C13.2 11.4 15.1 11.8 16 11.8C16.9 11.8 18.8 11.4 20.5 10.2"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.65"
    />
  </svg>
);

export const BespokeFourPointStar: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M16 3L18.9 13.1L29 16L18.9 18.9L16 29L13.1 18.9L3 16L13.1 13.1L16 3Z"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="16" r="1.5" fill="currentColor" fillOpacity="0.6" />
  </svg>
);

export const BespokeDiamondIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8.5 6.5H23.5L28.5 13L16 27L3.5 13L8.5 6.5Z"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 13H28.5M16 27L11.5 13L13.5 6.5M16 27L20.5 13L18.5 6.5"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinejoin="round"
      strokeOpacity="0.7"
    />
  </svg>
);

export const BespokeSculptInstrument: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M25.5 6.5L13.5 18.5L10.5 21.5L7 25L10.5 21.5L13.5 18.5"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
    <path
      d="M22.5 5.5L26.5 9.5L14.5 21.5L10.5 17.5L22.5 5.5Z"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinejoin="round"
    />
    <path
      d="M5 27H27"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeOpacity="0.55"
    />
  </svg>
);

export const BespokeCrownFacetIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M5 23L7.5 10L13 15.5L16 8L19 15.5L24.5 10L27 23H5Z"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 26.5H25.5"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
    />
  </svg>
);

export const BespokeCareHandIcon: React.FC<{ className?: string }> = ({
  className = 'w-7 h-7',
}) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M6 21.5C8.5 21.5 10.8 23 14.5 23H21.5C24 23 26.5 21 27.5 18.5L23 18.5C21.5 18.5 20 19.5 18 19.5H14.5C16.2 19.5 17.5 18 17.5 16.5C17.5 15 16.2 14 14.5 14H9.5C7.5 14 6 15.5 4.5 17"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="21" cy="9.5" r="3.5" stroke="currentColor" strokeWidth="1.3" />
    <path
      d="M19.7 9.5L20.7 10.5L22.6 8.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Lockup Oficial KR | KÉRYDA RAMOS • CIRURGIÃ-DENTISTA CRO-GO 22911
 * Tipografia limpa, escultural e de alta leitura.
 */
export const EditorialBrandLockup: React.FC<{
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}> = ({ theme = 'dark', size = 'md' }) => {
  const isDark = theme === 'dark';
  const imgSize = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  }[size];

  return (
    <div className="inline-flex items-center gap-3.5 sm:gap-4 select-none">
      <img
        src="/assets/kr-monograma-ouro.png"
        alt="Monograma KR — Dra. Kéryda Ramos"
        className={`${imgSize} object-contain shrink-0`}
      />
      <span
        className={`w-[1px] h-9 sm:h-10 ${
          isDark ? 'bg-gold-400/40' : 'bg-gold-600/40'
        }`}
        aria-hidden="true"
      />
      <div className="text-left">
        <span
          className={`font-brand text-sm sm:text-base font-semibold tracking-[0.12em] block leading-tight ${
            isDark ? 'text-white' : 'text-navy-950'
          }`}
        >
          KÉRYDA RAMOS
        </span>
        <span
          className={`font-display text-[11px] font-medium uppercase tracking-[0.16em] block mt-0.5 ${
            isDark ? 'text-gold-300' : 'text-gold-600'
          }`}
        >
          Cirurgiã-Dentista • CRO-GO 22911
        </span>
      </div>
    </div>
  );
};
