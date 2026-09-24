import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Utensils, MapPin, CheckCircle2 } from "lucide-react";
import { FaFacebook, FaXTwitter, FaTiktok, FaInstagram } from "react-icons/fa6";
import { useLanguage } from "./LanguageContext";
import type { Lang } from "./translations";

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;
const LOGO_URL = asset("makletna-logo.png");
const BRAND_MARK_URL = asset("makletna-spoon.png");

const CARD_ICON_MAP: Record<string, React.ReactNode> = {
  utensils: <Utensils size={20} />,
  "map-pin": <MapPin size={20} />,
};

const CATEGORY_VISUALS = [
  {
    id: "homemade-food",
    priority: false,
    image: asset("category/home-meals.webp"),
    accent: "#D97D3E",
    tint: "#FBEFE3",
  },
  {
    id: "traditional-sweets",
    priority: true,
    image: asset("category/sweets.webp"),
    accent: "#E28AAE",
    tint: "#FBEEF4",
  },
  {
    id: "traditional-restaurant",
    priority: false,
    image: asset("category/restaurant.webp"),
    accent: "#D65A4A",
    tint: "#FBEDEA",
  },
  {
    id: "wedding-events-caterer",
    priority: true,
    image: asset("category/caterer.webp"),
    accent: "#7C5CBF",
    tint: "#F1EDFA",
  },
] as const;

function FadeIn({
  children,
  delay = 0,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ── Phone mockup that peeks from the bottom of the feature cards ── */
const FOOD = {
  couscous: asset("food/couscous.webp"),
  chakhchoukha: asset("food/chakhchoukha.webp"),
  dolma: asset("food/dolma.webp"),
  bourek: asset("food/bourek.webp"),
};

function PhoneStatusBar() {
  return (
    <div className="phone-statusbar">
      <span>9:41</span>
      <span style={{ display: "flex", gap: 3, alignItems: "center" }}>
        <span className="phone-sb-dot" />
        <span className="phone-sb-dot" />
        <span className="phone-sb-bar" />
      </span>
    </div>
  );
}

function PhoneAppHeader() {
  return (
    <div className="phone-appheader">
      <img
        src={LOGO_URL}
        alt=""
        style={{ height: 13, filter: "brightness(0) invert(1)" }}
      />
      <span className="phone-appheader-title">Makletna</span>
      <span style={{ flex: 1 }} />
      <span className="phone-appheader-icon">🔍</span>
      <span className="phone-appheader-icon">🛒</span>
    </div>
  );
}

function CardPhoneMockup({ variant }: { variant: "browse" | "map" }) {
  const { lang } = useLanguage();
  const ar = lang === "ar";
  const fr = lang === "fr";

  const heroMeal = ar
    ? {
        title: "كسكس بالخضرة",
        chef: "مطبخ فاطمة",
        price: "450 دج",
        rating: "4.9 ★",
      }
    : fr
      ? {
          title: "Couscous Royal",
          chef: "Cuisine de Fatima",
          price: "450 DA",
          rating: "★ 4.9",
        }
      : {
          title: "Royal Couscous",
          chef: "Fatima's Kitchen",
          price: "450 DA",
          rating: "★ 4.9",
        };

  const rows = ar
    ? [
        {
          img: FOOD.chakhchoukha,
          name: "شخشوخة",
          chef: "عمي حسين · 4.8 ★",
          price: "320 دج",
        },
        {
          img: FOOD.bourek,
          name: "بوراك باللحم",
          chef: "لالة يمينة · 4.8 ★",
          price: "280 دج",
        },
      ]
    : fr
      ? [
          {
            img: FOOD.chakhchoukha,
            name: "Chakhchoukha",
            chef: "Ammi Hocine · ★ 4.8",
            price: "320 DA",
          },
          {
            img: FOOD.bourek,
            name: "Bourek viande",
            chef: "Lala Yamina · ★ 4.8",
            price: "280 DA",
          },
        ]
      : [
          {
            img: FOOD.chakhchoukha,
            name: "Chakhchoukha",
            chef: "Ammi Hocine · ★ 4.8",
            price: "320 DA",
          },
          {
            img: FOOD.bourek,
            name: "Meat Bourek",
            chef: "Lala Yamina · ★ 4.8",
            price: "280 DA",
          },
        ];

  const sheet = ar
    ? { name: "مطبخ فاطمة", meta: "4.9 ★ · 1.2 كم", cta: "عرض" }
    : fr
      ? { name: "Cuisine de Fatima", meta: "★ 4.9 · 1,2 km", cta: "Voir" }
      : { name: "Fatima's Kitchen", meta: "★ 4.9 · 1.2 km", cta: "View" };

  return (
    <div className="card-phone">
      <div className="card-phone-notch" />
      <div className="card-phone-screen" dir={ar ? "rtl" : "ltr"}>
        <PhoneStatusBar />
        <PhoneAppHeader />

        {variant === "browse" ? (
          <div className="phone-browse">
            {/* Hero featured meal */}
            <div className="phone-hero-meal">
              <img src={FOOD.couscous} alt="" />
              <div className="phone-hero-overlay">
                <div className="phone-hero-badge">{heroMeal.rating}</div>
                <div className="phone-hero-title">{heroMeal.title}</div>
                <div className="phone-hero-meta">
                  <span>{heroMeal.chef}</span>
                  <span className="phone-hero-price">{heroMeal.price}</span>
                </div>
              </div>
            </div>
            {/* Small meal rows */}
            {rows.map((m, i) => (
              <div key={i} className="phone-meal-row">
                <img src={m.img} alt="" className="phone-meal-thumb" />
                <div className="phone-meal-info">
                  <div className="phone-meal-name">{m.name}</div>
                  <div className="phone-meal-chef">{m.chef}</div>
                </div>
                <div className="phone-meal-price">{m.price}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="phone-map-wrap">
            <div className="phone-map">
              {/* subtle road grid */}
              <div className="phone-map-road" style={{ top: "22%" }} />
              <div className="phone-map-road" style={{ top: "55%" }} />
              <div className="phone-map-road" style={{ top: "78%" }} />
              <div
                className="phone-map-road phone-map-road--v"
                style={{ left: "28%" }}
              />
              <div
                className="phone-map-road phone-map-road--v"
                style={{ left: "68%" }}
              />

              {/* Food-photo pins */}
              {[
                { img: FOOD.couscous, top: "12%", left: "18%", size: 32 },
                { img: FOOD.dolma, top: "38%", left: "58%", size: 30 },
                { img: FOOD.chakhchoukha, top: "60%", left: "22%", size: 28 },
                { img: FOOD.bourek, top: "70%", left: "62%", size: 26 },
              ].map((p, i) => (
                <div
                  key={i}
                  className="phone-map-pin"
                  style={{
                    top: p.top,
                    left: p.left,
                    width: p.size,
                    height: p.size,
                  }}
                >
                  <img src={p.img} alt="" />
                </div>
              ))}

              {/* "you are here" dot */}
              <div className="phone-map-me" />
            </div>

            {/* Bottom sheet card */}
            <div className="phone-map-sheet">
              <img src={FOOD.couscous} alt="" className="phone-map-sheet-img" />
              <div className="phone-map-sheet-info">
                <div className="phone-map-sheet-name">{sheet.name}</div>
                <div className="phone-map-sheet-meta">{sheet.meta}</div>
              </div>
              <div className="phone-map-sheet-cta">{sheet.cta}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Topbar() {
  const { t, lang, setLang } = useLanguage();
  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "ar", label: "AR" },
    { code: "fr", label: "FR" },
  ];

  return (
    <header className="topbar">
      <div className="brand-lockup brand-lockup--header">
        <img
          src={BRAND_MARK_URL}
          alt=""
          style={{ height: 56, objectFit: "contain" }}
        />
        <span className="brand-wordmark brand-wordmark--header font-display">
          {t.nav.appName}
        </span>
      </div>

      <div className="topbar-actions">
        <div className="lang-switch">
          {langs.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLang(code)}
              className={`lang-btn ${lang === code ? "is-active" : ""}`}
              aria-pressed={lang === code}
              aria-label={`Switch language to ${code === "ar" ? "Arabic" : code === "fr" ? "French" : "English"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="topbar-auth-actions">
          <a href="/app/login" className="btn-pill btn-pill--ghost">
            {t.nav.login}
          </a>
          <a href="/app/register" className="btn-pill btn-pill--primary">
            {t.nav.signUp}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero">
      <FadeIn style={{ textAlign: "center", maxWidth: 1200, width: "100%" }}>
        <span className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          {t.hero.badge}
        </span>
        <h1 className="hero-headline">{t.hero.headline}</h1>
        <p className="hero-description">{t.hero.description}</p>
        <a href="/app/register" className="btn-pill btn-pill--primary hero-cta">
          {t.hero.cta}
        </a>
      </FadeIn>
    </section>
  );
}

function MainCards() {
  const { t } = useLanguage();
  const variants: ("browse" | "map")[] = ["browse", "map"];
  return (
    <section className="main-cards">
      <div className="main-cards-grid">
        {t.mainCards.map((card, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <article className="main-card">
              <div className="main-card-icon">{CARD_ICON_MAP[card.icon]}</div>
        <h2 className="main-card-title">{card.title}</h2>
              <p className="main-card-body">{card.description}</p>
              <div className="main-card-phone-wrap">
                <CardPhoneMockup variant={variants[i] ?? "browse"} />
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { t } = useLanguage();
  return (
    <section id="categories" className="all-features">
      <div className="all-features-inner">
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="hero-eyebrow">{t.categories.eyebrow}</span>
          <h2 className="all-features-title">{t.categories.title}</h2>
          <p className="all-features-subtitle">{t.categories.subtitle}</p>
        </FadeIn>
        <div className="all-features-grid">
          {t.categories.items.map((c, i) => {
            const visual = CATEGORY_VISUALS[i];
            return (
            <FadeIn
              key={visual.id}
              delay={i * 0.06}
              className={`category-grid-item${visual.priority ? " category-grid-item--priority" : ""}`}
            >
              <article
                className={`feature-tile category-tile${visual.priority ? " category-tile--priority" : ""}`}
                style={
                  {
                    "--category-accent": visual.accent,
                    "--category-tint": visual.tint,
                  } as React.CSSProperties
                }
              >
                <div className="feature-tile-icon category-tile-icon">
                  <img
                    src={visual.image}
                    alt={c.title}
                    width="88"
                    height="88"
                    loading="lazy"
                  />
                </div>
                <h3 className="feature-tile-title">{c.title}</h3>
                <p className="feature-tile-desc">{c.description}</p>
              </article>
            </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AllFeatures() {
  const { t } = useLanguage();
  return (
    <section id="features" className="all-features">
      <div className="all-features-inner">
        <FadeIn style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="hero-eyebrow">{t.features.eyebrow}</span>
          <h2 className="all-features-title">{t.features.title}</h2>
          <p className="all-features-subtitle">{t.features.subtitle}</p>
        </FadeIn>
        <div className="all-features-grid feature-hierarchy">
          {t.features.items.map((f, i) => (
            <FadeIn key={f.id} delay={i * 0.06} className={"kind" in f && f.kind === "signature" ? "feature-span" : ""}>
              <article className={`feature-tile ${"kind" in f && f.kind === "signature" ? `feature-tile--signature feature-tile--${f.id}` : ""}`}>
                {"kind" in f && f.kind === "signature" && <span className="signature-label">{t.features.eyebrow}</span>}
                <div className="feature-tile-icon">{f.icon}</div>
                <h3 className="feature-tile-title">{f.title}</h3>
                <p className="feature-tile-desc">{f.description}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

const WILAYAS = [
  { code: "01", en: "Adrar", ar: "أدرار" },
  { code: "02", en: "Chlef", ar: "الشلف" },
  { code: "03", en: "Laghouat", ar: "الأغواط" },
  { code: "04", en: "Oum El Bouaghi", ar: "أم البواقي" },
  { code: "05", en: "Batna", ar: "باتنة" },
  { code: "06", en: "Bejaia", ar: "بجاية" },
  { code: "07", en: "Biskra", ar: "بسكرة" },
  { code: "08", en: "Bechar", ar: "بشار" },
  { code: "09", en: "Blida", ar: "البليدة" },
  { code: "10", en: "Bouira", ar: "البويرة" },
  { code: "11", en: "Tamanrasset", ar: "تمنراست" },
  { code: "12", en: "Tebessa", ar: "تبسة" },
  { code: "13", en: "Tlemcen", ar: "تلمسان" },
  { code: "14", en: "Tiaret", ar: "تيارت" },
  { code: "15", en: "Tizi Ouzou", ar: "تيزي وزو" },
  { code: "16", en: "Alger", ar: "الجزائر" },
  { code: "17", en: "Djelfa", ar: "الجلفة" },
  { code: "18", en: "Jijel", ar: "جيجل" },
  { code: "19", en: "Setif", ar: "سطيف" },
  { code: "20", en: "Saida", ar: "سعيدة" },
  { code: "21", en: "Skikda", ar: "سكيكدة" },
  { code: "22", en: "Sidi Bel Abbes", ar: "سيدي بلعباس" },
  { code: "23", en: "Annaba", ar: "عنابة" },
  { code: "24", en: "Guelma", ar: "قالمة" },
  { code: "25", en: "Constantine", ar: "قسنطينة" },
  { code: "26", en: "Medea", ar: "المدية" },
  { code: "27", en: "Mostaganem", ar: "مستغانم" },
  { code: "28", en: "M'sila", ar: "المسيلة" },
  { code: "29", en: "Mascara", ar: "معسكر" },
  { code: "30", en: "Ouargla", ar: "ورقلة" },
  { code: "31", en: "Oran", ar: "وهران" },
  { code: "32", en: "El Bayadh", ar: "البيض" },
  { code: "33", en: "Illizi", ar: "إليزي" },
  { code: "34", en: "Bordj Bou Arreridj", ar: "برج بوعريريج" },
  { code: "35", en: "Boumerdes", ar: "بومرداس" },
  { code: "36", en: "El Tarf", ar: "الطارف" },
  { code: "37", en: "Tindouf", ar: "تندوف" },
  { code: "38", en: "Tissemsilt", ar: "تيسمسيلت" },
  { code: "39", en: "El Oued", ar: "الوادي" },
  { code: "40", en: "Khenchela", ar: "خنشلة" },
  { code: "41", en: "Souk Ahras", ar: "سوق أهراس" },
  { code: "42", en: "Tipaza", ar: "تيبازة" },
  { code: "43", en: "Mila", ar: "ميلة" },
  { code: "44", en: "Ain Defla", ar: "عين الدفلى" },
  { code: "45", en: "Naama", ar: "النعامة" },
  { code: "46", en: "Ain Temouchent", ar: "عين تموشنت" },
  { code: "47", en: "Ghardaia", ar: "غرداية" },
  { code: "48", en: "Relizane", ar: "غليزان" },
  { code: "49", en: "Timimoun", ar: "تيميمون" },
  { code: "50", en: "Bordj Badji Mokhtar", ar: "برج باجي مختار" },
  { code: "51", en: "Ouled Djellal", ar: "أولاد جلال" },
  { code: "52", en: "Beni Abbes", ar: "بني عباس" },
  { code: "53", en: "In Salah", ar: "عين صالح" },
  { code: "54", en: "In Guezzam", ar: "عين قزام" },
  { code: "55", en: "Touggourt", ar: "تقرت" },
  { code: "56", en: "Djanet", ar: "جانت" },
  { code: "57", en: "El M'Ghair", ar: "المغير" },
  { code: "58", en: "El Meniaa", ar: "المنيعة" },
  { code: "59", en: "Aflou", ar: "أفلو" },
  { code: "60", en: "Barika", ar: "بريكة" },
  { code: "61", en: "Ksar Chellala", ar: "قصر الشلالة" },
  { code: "62", en: "Messaad", ar: "مسعد" },
  { code: "63", en: "Ain Oussera", ar: "عين وسارة" },
  { code: "64", en: "Boussaada", ar: "بوسعادة" },
  { code: "65", en: "El Abiodh Sidi Cheikh", ar: "الأبيض سيدي الشيخ" },
  { code: "66", en: "El Kantara", ar: "القنطرة" },
  { code: "67", en: "Bir El Ater", ar: "بئر العاتر" },
  { code: "68", en: "Ksar El Boukhari", ar: "قصر البخاري" },
  { code: "69", en: "El Aricha", ar: "العريشة" },
];

function RegisterSection() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "customer" as "customer" | "provider",
    phone: "",
    wilaya: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const wilayaObj = WILAYAS.find((w) => w.code === form.wilaya);
      const wilayaLabel = wilayaObj ? `${wilayaObj.code} — ${wilayaObj.en}` : form.wilaya;

      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("role", form.role);
      payload.append("phone", form.phone);
      payload.append("wilaya", wilayaLabel);
      payload.append("_subject", `New Makletna Registration — ${form.name}`);
      payload.append("_captcha", "false");
      payload.append("_template", "table");

      const res = await fetch("https://formsubmit.co/contact@makletna.com", {
        method: "POST",
        body: payload,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg || t.form.error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="register" className="register">
      <div className="register-inner">
        <FadeIn style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="hero-eyebrow">{t.form.sectionLabel}</span>
          <h2 className="register-title">{t.form.title}</h2>
          <p className="register-subtitle">{t.form.subtitle}</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="register-card">
            {success ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "rgba(46,125,50,0.08)",
                    border: "1.5px solid rgba(46,125,50,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    color: "#2E7D32",
                  }}
                >
                  <CheckCircle2 size={30} />
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#2C1810",
                    marginBottom: 10,
                  }}
                >
                  {t.form.success}
                </h3>
                <p
                  style={{ fontSize: 14.5, color: "#7A5C50", lineHeight: 1.65 }}
                >
                  {t.form.successMessage}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div>
                  <label className="field-label">{t.form.name}</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder={t.form.namePlaceholder}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="field-label">{t.form.email}</label>
                  <input
                    className="input-field"
                    type="email"
                    dir="ltr"
                    placeholder={t.form.emailPlaceholder}
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <fieldset className="role-fieldset">
                    <legend className="field-label">{t.form.role}</legend>
                    <div className="role-options">
                    {[
                      { value: "customer", label: t.form.roleCustomer },
                      { value: "provider", label: t.form.roleProvider },
                    ].map(({ value, label }) => (
                      <label
                        key={value}
                        className={`role-btn ${form.role === value ? "is-active" : ""}`}
                      >
                        <input
                          type="radio"
                          name="role"
                          value={value}
                          checked={form.role === value}
                          onChange={() => setForm({ ...form, role: value as "customer" | "provider" })}
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                    </div>
                  </fieldset>
                </div>
                <div>
                  <label className="field-label">{t.form.wilaya}</label>
                  <select
                    className="input-field"
                    dir="ltr"
                    value={form.wilaya}
                    onChange={(e) =>
                      setForm({ ...form, wilaya: e.target.value })
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">{t.form.wilayaPlaceholder}</option>
                    {WILAYAS.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} — {lang === "ar" ? w.ar : w.en}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="field-label">{t.form.phone}</label>
                  <input
                    className="input-field"
                    type="tel"
                    dir="ltr"
                    placeholder={t.form.phonePlaceholder}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                  />
                </div>
                {error && (
                  <div
                    style={{
                      background: "rgba(211,47,47,0.06)",
                      border: "1px solid rgba(211,47,47,0.2)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontSize: 13,
                      color: "#D32F2F",
                    }}
                  >
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-pill btn-pill--primary"
                  style={{ marginTop: 6, width: "100%" }}
                >
                  {submitting ? t.form.submitting : t.form.submit}
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function FounderNote() {
  const { t } = useLanguage();
  return (
    <section className="founder">
      <FadeIn>
        <div className="founder-inner">
          <h2 className="founder-title">{t.founder.title}</h2>
          <p className="founder-body">{t.founder.body}</p>
        </div>
      </FadeIn>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const socialLinks = [
    {
      icon: <FaInstagram size={16} />,
      href: "https://instagram.com/in.makletna",
      label: "Instagram",
    },
    {
      icon: <FaFacebook size={16} />,
      href: "https://facebook.com/fb.makletna",
      label: "Facebook",
    },
    {
      icon: <FaXTwitter size={16} />,
      href: "https://x.com/makletna",
      label: "X (Twitter)",
    },
    {
      icon: <FaTiktok size={16} />,
      href: "https://tiktok.com/@makletna",
      label: "TikTok",
    },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-row">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <div className="brand-lockup brand-lockup--footer">
            <img
              src={BRAND_MARK_URL}
              alt=""
              style={{ height: 44, objectFit: "contain" }}
            />
            <span className="brand-wordmark brand-wordmark--footer font-display">
              {t.nav.appName}
            </span>
          </div>
          <span style={{ fontSize: 13, color: "#7A5C50" }}>
            {t.footer.tagline}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            flexWrap: "wrap",
          }}
        >
          <a
            href={`mailto:${t.footer.email}`}
            style={{ color: "#7A5C50", fontSize: 13, textDecoration: "none" }}
          >
            {t.footer.email}
          </a>
          <div style={{ display: "flex", gap: 8 }}>
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="social-link"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer-links">
        <a href={`${import.meta.env.BASE_URL}terms`} className="footer-link">{t.footer.links.terms}</a>
        <a href={`${import.meta.env.BASE_URL}contact`} className="footer-link">{t.footer.links.contact}</a>
        <a href={`${import.meta.env.BASE_URL}partners`} className="footer-link">{t.footer.links.partners}</a>
        <a href={`${import.meta.env.BASE_URL}invest`} className="footer-link">{t.footer.links.invest}</a>
        <span style={{ flex: 1 }} />
      </div>

      <div className="site-footer-meta">
        <span>
          © {year} Makletna. {t.footer.rights}
        </span>
        <span>{t.footer.madeIn}</span>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#FBF5EA" }}>
      <Topbar />
      <main>
        <Hero />
        <MainCards />
        <CategoriesSection />
        <AllFeatures />
        <FounderNote />
        <RegisterSection />
      </main>
      <Footer />
    </div>
  );
}
