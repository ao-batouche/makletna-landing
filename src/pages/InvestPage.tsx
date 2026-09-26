import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { Link } from "wouter";
import { CheckCircle2, BarChart2, Globe, Lightbulb, ShieldCheck } from "lucide-react";

const BRAND_MARK_URL = `${import.meta.env.BASE_URL}makletna-spoon.png`;

const INVEST_HIGHLIGHTS_ICONS = [
  <BarChart2 size={22} />,
  <Globe size={22} />,
  <Lightbulb size={22} />,
  <ShieldCheck size={22} />,
];

const INVESTMENT_RANGES = [
  "< $10,000",
  "$10,000 – $50,000",
  "$50,000 – $200,000",
  "$200,000 – $500,000",
  "> $500,000",
];

export default function InvestPage() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", investmentRange: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!form.name.trim()) return t.invest.errors.nameRequired;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return t.invest.errors.emailInvalid;
    if (!form.message.trim()) return t.invest.errors.messageRequired;
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("https://makletna.replit.app/api/form-submissions/investor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          investmentRange: form.investmentRange || undefined,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.invest.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

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

      <section className="subpage-top--hero" style={{ background: "linear-gradient(135deg, #1a3a2c 0%, #2d6048 100%)", paddingLeft: 24, paddingRight: 24, paddingBottom: 80, textAlign: "center" }}>
        <span className="hero-eyebrow" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.2)" }}>
          {t.invest.eyebrow}
        </span>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: "#FDF9F0", margin: "14px auto 16px", fontFamily: "Thmanyah Display, serif", maxWidth: 640 }}>
          {t.invest.title}
        </h1>
        <p style={{ fontSize: 17, color: "rgba(253,249,240,0.75)", maxWidth: 540, margin: "0 auto", lineHeight: 1.7 }}>
          {t.invest.subtitle}
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#2C1810", textAlign: "center", marginBottom: 40 }}>
          {t.invest.highlightsTitle}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24, marginBottom: 56 }}>
          {t.invest.highlights.map((h, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "28px 22px", border: "1px solid rgba(44,24,16,0.07)", boxShadow: "0 2px 12px rgba(44,24,16,0.04)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(45,96,72,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#2d6048", marginBottom: 16 }}>
                {INVEST_HIGHLIGHTS_ICONS[i % INVEST_HIGHLIGHTS_ICONS.length]}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2C1810", marginBottom: 8 }}>{h.title}</h3>
              <p style={{ fontSize: 14, color: "#7A5C50", lineHeight: 1.65 }}>{h.description}</p>
            </div>
          ))}
        </div>

        <div style={{ background: "rgba(45,96,72,0.05)", border: "1px solid rgba(45,96,72,0.15)", borderRadius: 20, padding: "32px 36px", marginBottom: 56 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#2C1810", marginBottom: 20 }}>{t.invest.traction.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 20 }}>
            {t.invest.traction.stats.map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: "#2d6048", fontFamily: "Thmanyah Display, serif" }}>{stat.value}</div>
                <div style={{ fontSize: 13, color: "#7A5C50", marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="invest-form" style={{ maxWidth: 560, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#2C1810", marginBottom: 10 }}>{t.invest.formTitle}</h2>
          <p style={{ fontSize: 15, color: "#7A5C50", lineHeight: 1.65 }}>{t.invest.formSubtitle}</p>
        </div>
        <div className="register-card">
          {success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(46,125,50,0.08)", border: "1.5px solid rgba(46,125,50,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#2E7D32" }}>
                <CheckCircle2 size={30} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#2C1810", marginBottom: 10 }}>{t.invest.successTitle}</h3>
              <p style={{ fontSize: 14.5, color: "#7A5C50", lineHeight: 1.65 }}>{t.invest.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label className="field-label">{t.invest.name}</label>
                <input className="input-field" type="text" placeholder={t.invest.namePlaceholder} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="field-label">{t.invest.email}</label>
                <input className="input-field" type="email" dir="ltr" placeholder={t.invest.emailPlaceholder} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label className="field-label">{t.invest.phone}</label>
                <input className="input-field" type="tel" dir="ltr" placeholder={t.invest.phonePlaceholder} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="field-label">{t.invest.investmentRange}</label>
                <select className="input-field" value={form.investmentRange} onChange={e => setForm({ ...form, investmentRange: e.target.value })} style={{ cursor: "pointer" }}>
                  <option value="">{t.invest.investmentRangePlaceholder}</option>
                  {INVESTMENT_RANGES.map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="field-label">{t.invest.message}</label>
                <textarea className="input-field" rows={5} placeholder={t.invest.messagePlaceholder} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: "vertical", minHeight: 120 }} />
              </div>
              {error && (
                <div style={{ background: "rgba(211,47,47,0.06)", border: "1px solid rgba(211,47,47,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#D32F2F" }}>
                  {error}
                </div>
              )}
              <button type="submit" disabled={submitting} className="btn-pill btn-pill--primary" style={{ marginTop: 6, width: "100%" }}>
                {submitting ? t.invest.submitting : t.invest.submit}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
