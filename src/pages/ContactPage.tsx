import { useLanguage } from "../LanguageContext";
import { Link } from "wouter";
import ContactBlock from "../ContactBlock";

const BRAND_MARK_URL = `${import.meta.env.BASE_URL}makletna-spoon.png`;

export default function ContactPage() {
  const { t, lang } = useLanguage();
  return (
    <div style={{ minHeight: "100vh", background: "#FBF5EA" }}>
      <header className="topbar">
        <Link href={`/?lang=${lang}`}>
          <div className="brand-lockup brand-lockup--header" style={{ cursor: "pointer" }}>
            <img src={BRAND_MARK_URL} alt="" style={{ height: 56, objectFit: "contain" }} />
            <span className="brand-wordmark brand-wordmark--header font-display">
              {t.nav.appName}
            </span>
          </div>
        </Link>
        <Link href={`/?lang=${lang}`} className="btn-pill btn-pill--ghost">{t.nav.backHome}</Link>
      </header>

      <main className="subpage-top" style={{ maxWidth: 1000, margin: "0 auto", paddingLeft: 24, paddingRight: 24, paddingBottom: 80 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="hero-eyebrow">{t.contact.eyebrow}</span>
          <h1 style={{ fontSize: 40, fontWeight: 900, color: "#2C1810", margin: "12px 0 14px", fontFamily: "Thmanyah Display, serif" }}>
            {t.contact.title}
          </h1>
          <p style={{ fontSize: 16, color: "#7A5C50", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            {t.contact.subtitle}
          </p>
        </div>

        <ContactBlock />
      </main>
    </div>
  );
}
