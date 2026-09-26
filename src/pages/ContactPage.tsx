import { useState } from "react";
import { useLanguage } from "../LanguageContext";
import { Link } from "wouter";
import { CheckCircle2, Mail, Phone, MapPin } from "lucide-react";

const BRAND_MARK_URL = `${import.meta.env.BASE_URL}makletna-spoon.png`;

export default function ContactPage() {
  const { t } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function validate() {
    if (!form.name.trim()) return t.contact.errors.nameRequired;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return t.contact.errors.emailInvalid;
    if (!form.subject.trim()) return t.contact.errors.subjectRequired;
    if (!form.message.trim()) return t.contact.errors.messageRequired;
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("https://makletna.replit.app/api/form-submissions/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.subject,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : t.contact.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  }

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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
              {[
                { icon: <Mail size={18} />, label: t.contact.infoEmail, value: "contact@makletna.com" },
                { icon: <Phone size={18} />, label: t.contact.infoPhone, value: "+213 23 45 67 89" },
                { icon: <MapPin size={18} />, label: t.contact.infoAddress, value: "Alger, Algérie" },
              ].map(({ icon, label, value }) => (
                <div key={label} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(174,106,52,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#AE6A34", flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#9C7B6A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
                    <div style={{ fontSize: 14.5, color: "#2C1810" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="register-card">
            {success ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(46,125,50,0.08)", border: "1.5px solid rgba(46,125,50,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", color: "#2E7D32" }}>
                  <CheckCircle2 size={30} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#2C1810", marginBottom: 10 }}>{t.contact.successTitle}</h3>
                <p style={{ fontSize: 14.5, color: "#7A5C50", lineHeight: 1.65 }}>{t.contact.successMessage}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label className="field-label">{t.contact.name}</label>
                  <input className="input-field" type="text" placeholder={t.contact.namePlaceholder} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="field-label">{t.contact.email}</label>
                  <input className="input-field" type="email" dir="ltr" placeholder={t.contact.emailPlaceholder} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
                <div>
                  <label className="field-label">{t.contact.phone}</label>
                  <input className="input-field" type="tel" dir="ltr" placeholder={t.contact.phonePlaceholder} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="field-label">{t.contact.subject}</label>
                  <input className="input-field" type="text" placeholder={t.contact.subjectPlaceholder} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
                </div>
                <div>
                  <label className="field-label">{t.contact.message}</label>
                  <textarea className="input-field" rows={5} placeholder={t.contact.messagePlaceholder} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: "vertical", minHeight: 120 }} />
                </div>
                {error && (
                  <div style={{ background: "rgba(211,47,47,0.06)", border: "1px solid rgba(211,47,47,0.2)", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#D32F2F" }}>
                    {error}
                  </div>
                )}
                <button type="submit" disabled={submitting} className="btn-pill btn-pill--primary" style={{ marginTop: 6, width: "100%" }}>
                  {submitting ? t.contact.submitting : t.contact.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
