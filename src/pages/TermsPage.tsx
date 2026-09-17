import { useLanguage } from "../LanguageContext";
import { Link } from "wouter";

const BRAND_MARK_URL = `${import.meta.env.BASE_URL}makletna-spoon.png`;

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <div style={{ minHeight: "100vh", background: "#FBF5EA" }}>
      <header className="topbar">
        <Link href="/">
          <div className="brand-lockup brand-lockup--header" style={{ cursor: "pointer" }}>
            <img src={BRAND_MARK_URL} alt="" style={{ height: 56, objectFit: "contain" }} />
            <span className="brand-wordmark brand-wordmark--header font-display">
              {t.nav.appName}
            </span>
          </div>
        </Link>
        <Link href="/" className="btn-pill btn-pill--ghost">{t.nav.backHome}</Link>
      </header>

      <main className="subpage-top" style={{ maxWidth: 760, margin: "0 auto", paddingLeft: 24, paddingRight: 24, paddingBottom: 80 }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#2C1810", marginBottom: 8, fontFamily: "Thmanyah Display, serif" }}>
          {t.terms.title}
        </h1>
        <p style={{ fontSize: 13.5, color: "#9C7B6A", marginBottom: 48 }}>
          {t.terms.lastUpdated}
        </p>

        {t.terms.sections.map((section, i) => (
          <section key={i} style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#2C1810", marginBottom: 12 }}>
              {section.title}
            </h2>
            <p style={{ fontSize: 15, color: "#5C4A3D", lineHeight: 1.8 }}>
              {section.body}
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}
