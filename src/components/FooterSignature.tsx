import { useEffect, useState } from "react";

/** Assinatura do rodapé: símbolo + horário local (fuso BR) + micro-texto. */
export function FooterSignature() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="footer-sign">
      <span className="footer-sign__mark" aria-hidden>
        <img
          src="/assets/kr-monograma-ouro.png"
          alt=""
          width={13}
          height={16}
          style={{
            display: "block",
            objectFit: "contain",
            filter: "brightness(0)",
            opacity: 0.62,
          }}
        />
      </span>
      <span className="footer-sign__time mono">
        {time ? `${time} BRT` : "—"}
      </span>
      <span className="footer-sign__tag">Precisão e naturalidade</span>
    </div>
  );
}

export default FooterSignature;
