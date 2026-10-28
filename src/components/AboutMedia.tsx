"use client";

import { useState } from "react";

const TABS = [
  {
    label: "Dra. Kéryda Ramos (UFG)",
    src: "/assets/dra-keryda-retrato.jpg",
    alt: "Dra. Kéryda Ramos — Cirurgiã-Dentista CRO-GO 22911 graduada pela UFG",
    caption: "Dra. Kéryda Ramos — Cirurgiã-Dentista CRO-GO 22911 · UFG",
  },
  {
    label: "Ambiente Clínico",
    src: "/assets/patient-travertine-clinic.jpg",
    alt: "Consultório odontológico da Dra. Kéryda Ramos em Goiânia",
    caption: "Consultório preparado para conforto e biossegurança",
  },
] as const;

export default function AboutMedia() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const current = TABS[activeTab] ?? TABS[0];

  return (
    <div className="about-media">
      <div className="about-media__tabs" role="tablist" aria-label="Mídia do consultório">
        {TABS.map((tab, i) => (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={activeTab === i}
            className={`about-tab ${activeTab === i ? "is-active" : ""}`}
            onClick={() => setActiveTab(i)}
            data-hover
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="about-media__frame">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className="about-media__img"
        />
        <span className="about-media__caption mono">{current.caption}</span>
      </div>
    </div>
  );
}
