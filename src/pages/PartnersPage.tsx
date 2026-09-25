import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { Link } from "wouter";
import { CheckCircle2, Handshake, TrendingUp, Star, Users } from "lucide-react";

const BRAND_MARK_URL = `${import.meta.env.BASE_URL}makletna-spoon.png`;

const PARTNER_PERKS_ICONS = [
  <TrendingUp size={22} />,
  <Users size={22} />,
  <Star size={22} />,
  <Handshake size={22} />,
];

export default function PartnersPage() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!form.name.trim()) return t.partners.errors.nameRequired;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return t.partners.errors.emailInvalid;
    if (!form.message.trim()) return t.partners.errors.messageRequired;
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("https://makletna.replit.app/api/form-submissions/partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          company: form.company || undefined,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.partners.errorGeneric);
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

      <section className="subpage-top--hero" style={{ background: "linear-gradient(135deg, #2C1810 0%, #5C3520 100%)", paddingLeft: 24, paddingRight: 24, paddingBottom: 80, textAlign: "center" }}>
        <span className="hero-eyebrow" style={{ background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.85)", borderColor: "rgba(255,255,255,0.2)" }}>
          {t.partners.eyebrow}
        </span>
        <h1 style={{ fontSize: 44, fontWeight: 900, color: "#FDF9F0", margin: "14px auto 16px", fontFamily: "Thmanyah Display, serif", maxWidth: 600 }}>
          {t.partners.title}
        </h1>
        <p style={{ fontSize: 17, color: "rgba(253,249,240,0.75)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          {t.partners.subtitle}
        </p>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 0" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#2C1810", textAlign: "center", marginBottom: 40 }}>
          {t.partners.providerTypesTitle}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {t.partners.providerTypes.map((type, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "28px 22px", border: "1px solid rgba(44,24,16,0.07)", boxShadow: "0 2px 12px rgba(44,24,16,0.04)" }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2C1810", marginBottom: 8 }}>{type.title}</h3>
              <p style={{ fontSize: 14, color: "#7A5C50", lineHeight: 1.65 }}>{type.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 800, color: "#2C1810", textAlign: "center", marginBottom: 40 }}>
          {t.partners.perksTitle}
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {t.partners.perks.map((perk, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "28px 22px", border: "1px solid rgba(44,24,16,0.07)", boxShadow: "0 2px 12px rgba(44,24,16,0.04)" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(174,106,52,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#AE6A34", marginBottom: 16 }}>
                {PARTNER_PERKS_ICONS[i % PARTNER_PERKS_ICONS.length]}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#2C1810", marginBottom: 8 }}>{perk.title}</h3>
              <p style={{ fontSize: 14, color: "#7A5C50", lineHeight: 1.65 }}>{perk.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="partner-form" style={{ maxWidth: 560, margin: "0 auto 80px", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#2C1810", marginBottom: 10 }}>{t.partners.formTitle}</h2>
          <p style={{ fontSize: 15, color: "#7A5C50", lineHeight: 1.65 }}>{t.partners.formSubtitle}</p>
        </div>
        <div className="register-card">
          {success ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(46,125,50,0.08)", border: "1.5px solid rgba(46,125,50,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#2E7D32" }}>
                <CheckCircle2 size={30} />
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#2C1810", marginBottom: 10 }}>{t.partners.successTitle}</h3>
              <p style={{ fontSize: 14.5, color: "#7A5C50", lineHeight: 1.65 }}>{t.partners.successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label className="field-label">{t.partners.name}</label>
                <input className="input-field" type="text" placeholder={t.partners.namePlaceholder} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <label className="field-label">{t.partners.email}</label>
                <input className="input-field" type="email" dir="ltr" placeholder={t.partners.emailPlaceholder} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <label className="field-label">{t.partners.phone}</label>
                <input className="input-field" type="tel" dir="ltr" placeholder={t.partners.phonePlaceholder} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="field-label">{t.partners.company}</label>
                <input className="input-field" type="text" placeholder={t.partners.companyPlaceholder} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              </div>
              <div>
                <label className="field-label">{t.partners.message}</label>
                <textarea className="input-field" rows={5} placeholder={t.partners.messagePlaceholder} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: "vertical", minHeight: 120 }} />
              </div>
              {error && (
                <div style={{ background: "rgba(211,47,47,0.06)", border: "1px solid rgba(211,47,47,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#D32F2F" }}>
                  {error}
                </div>
              )}
              <button type="submit" disabled={submitting} className="btn-pill btn-pill--primary" style={{ marginTop: 6, width: "100%" }}>
                {submitting ? t.partners.submitting : t.partners.submit}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
