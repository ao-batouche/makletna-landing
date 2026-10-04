import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Utensils, MapPin } from "lucide-react";
import { FaFacebook, FaXTwitter, FaTiktok, FaInstagram } from "react-icons/fa6";
import { useLanguage } from "./LanguageContext";
import ContactBlock from "./ContactBlock";
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
              aria-label={t.nav.languageSwitch[code]}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="topbar-auth-actions auth-group">
          <a href="/login" className="btn-pill btn-pill--ghost">
            {t.nav.login}
          </a>
          <a href="/register" className="btn-pill btn-pill--primary">
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

function ContactSection() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="register contact-section">
      <div className="register-inner register-inner--wide">
        <FadeIn style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="hero-eyebrow">{t.contact.eyebrow}</span>
          <h2 className="register-title">{t.contact.title}</h2>
          <p className="register-subtitle">{t.contact.subtitle}</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ContactBlock />
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
  const publicBase = window.location.pathname.startsWith("/") ? import.meta.env.BASE_URL : "/";
  const { t, lang } = useLanguage();
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
        <a href={`${publicBase}terms?lang=${lang}`} className="footer-link">{t.footer.links.terms}</a>
        <a href={`${publicBase}contact?lang=${lang}`} className="footer-link">{t.footer.links.contact}</a>
        <a href={`${publicBase}partners?lang=${lang}`} className="footer-link">{t.footer.links.partners}</a>
        <a href={`${publicBase}invest?lang=${lang}`} className="footer-link">{t.footer.links.invest}</a>
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
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
