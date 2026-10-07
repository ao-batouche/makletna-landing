import { useEffect, useState } from "react";
import { submitLead, leadError } from "./submission";
import { useLanguage } from "./LanguageContext";
import { CheckCircle2, Mail, Phone, MapPin } from "lucide-react";

type ContactInfo = {
  email: string;
  phone1: string;
  phone1Label: string;
  phone2: string;
  phone2Label: string;
  address: string;
};

export default function ContactBlock() {

  const { t, lang } = useLanguage();
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [contactError, setContactError] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    async function loadContact() {
      try {
        const res = await fetch("https://makletna.replit.app/api/contact", { signal: controller.signal, cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setContact(data);
        setContactError(false);
      } catch {
        if (!controller.signal.aborted) {
          setContact(null);
          setContactError(true);
        }
      }
    }
    void loadContact();
    const refresh = () => { if (document.visibilityState === "visible") void loadContact(); };
    document.addEventListener("visibilitychange", refresh);
    const interval = window.setInterval(refresh, 60_000);
    return () => {
      controller.abort();
      document.removeEventListener("visibilitychange", refresh);
      window.clearInterval(interval);
    };
  }, []);
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
    if (submitting) return;
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setSubmitting(true);
    setError("");
    try {
      const res = await submitLead("/form-submissions/contact", {
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          subject: form.subject,
          message: form.message,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `HTTP ${res.status}`);
      }
      setSuccess(true);
    } catch (error) {
      setError(leadError(error, lang, t.contact.errorGeneric));
    } finally {
      setSubmitting(false);
    }
  }

  return (
<div className="contact-grid">
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginBottom: 40 }}>
          {[
            { icon: <Mail size={18} />, label: t.contact.infoEmail, value: contact?.email?.trim(), dir: "ltr" as const },
            { icon: <Phone size={18} />, label: contact?.phone1Label?.trim() || t.contact.infoPhone, value: contact?.phone1?.trim(), dir: "ltr" as const },
            { icon: <Phone size={18} />, label: contact?.phone2Label?.trim() || t.contact.infoPhone, value: contact?.phone2?.trim(), dir: "ltr" as const },
            { icon: <MapPin size={18} />, label: t.contact.infoAddress, value: contact?.address?.trim() },
          ].filter(({ value }) => Boolean(value)).map(({ icon, label, value, dir }, index) => (
            <div key={index} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(174,106,52,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#AE6A34", flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#9C7B6A", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
                <div dir={dir} style={{ fontSize: 14.5, color: "#2C1810" }}>{value}</div>
              </div>
            </div>
          ))}
          {contactError && <p role="status">{t.contact.errorGeneric}</p>}
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
              <input maxLength={120} className="input-field" type="text" placeholder={t.contact.namePlaceholder} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="field-label">{t.contact.email}</label>
              <input maxLength={254} className="input-field" type="email" dir="ltr" placeholder={t.contact.emailPlaceholder} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            </div>
            <div>
              <label className="field-label">{t.contact.phone}</label>
              <input maxLength={30} className="input-field" type="tel" dir="ltr" placeholder={t.contact.phonePlaceholder} value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="field-label">{t.contact.subject}</label>
              <input maxLength={200} className="input-field" type="text" placeholder={t.contact.subjectPlaceholder} value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required />
            </div>
            <div>
              <label className="field-label">{t.contact.message}</label>
              <textarea maxLength={2000} className="input-field" rows={5} placeholder={t.contact.messagePlaceholder} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required style={{ resize: "vertical", minHeight: 120 }} />
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
  );
}
