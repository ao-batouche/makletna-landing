import { useEffect } from "react";
import { useLocation } from "wouter";
import { useLanguage } from "./LanguageContext";

const siteBase = () => `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}`;
const ROUTES = {
  "/": {
    en: ["Makletna | Authentic Algerian Food Near You", "Discover home cooks, traditional sweets, Algerian restaurants and event caterers near you with Makletna."],
    ar: ["ماكلتنا | أكل جزائري أصيل قريب منك", "اكتشف الطهاة المنزليين والحلويات التقليدية والمطاعم وطباخي المناسبات القريبين منك مع ماكلتنا."],
    fr: ["Makletna | Cuisine algérienne près de chez vous", "Découvrez cuisiniers maison, pâtisseries traditionnelles, restaurants algériens et traiteurs près de chez vous."],
  },
  "/terms": {
    en: ["Terms & Conditions | Makletna", "Read the terms and conditions that govern access to and use of the Makletna platform."],
    ar: ["الشروط والأحكام | ماكلتنا", "اطّلع على الشروط والأحكام التي تنظّم الوصول إلى منصة ماكلتنا واستخدامها."],
    fr: ["Conditions d'utilisation | Makletna", "Consultez les conditions qui encadrent l'accès et l'utilisation de la plateforme Makletna."],
  },
  "/contact": {
    en: ["Contact Makletna | Questions and Feedback", "Contact the Makletna team with questions, feedback or partnership enquiries about our Algerian food platform."],
    ar: ["تواصل مع ماكلتنا | أسئلة وملاحظات", "تواصل مع فريق ماكلتنا لطرح الأسئلة والملاحظات والاستفسارات حول منصة الطعام الجزائرية."],
    fr: ["Contacter Makletna | Questions et avis", "Contactez l'équipe Makletna pour vos questions, avis ou demandes concernant notre plateforme culinaire algérienne."],
  },
  "/partners": {
    en: ["Become a Makletna Service Provider", "Join Makletna as a home cook, sweets maker, traditional restaurant or event caterer and reach more customers."],
    ar: ["انضم كمقدّم خدمة في ماكلتنا", "انضم إلى ماكلتنا كطاهٍ منزلي أو صانع حلويات أو مطعم تقليدي أو طباخ مناسبات للوصول إلى زبائن أكثر."],
    fr: ["Devenir prestataire Makletna", "Rejoignez Makletna comme cuisinier maison, pâtissier, restaurant traditionnel ou traiteur et touchez plus de clients."],
  },
  "/invest": {
    en: ["Invest in Makletna | Algerian Food Platform", "Learn about Makletna's mission to connect customers with independent Algerian food providers and contact our team."],
    ar: ["استثمر في ماكلتنا | منصة الطعام الجزائرية", "تعرّف على مهمة ماكلتنا في ربط الزبائن بمقدّمي خدمات الطعام الجزائري المستقلين وتواصل مع فريقنا."],
    fr: ["Investir dans Makletna | Plateforme culinaire", "Découvrez la mission de Makletna, qui relie les clients aux prestataires culinaires algériens indépendants."],
  },
} as const;

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function Seo() {
  const [location] = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const route = (ROUTES[location as keyof typeof ROUTES] ?? ROUTES["/"])[lang];
    const [title, description] = route;
    const base = siteBase();
    const canonical = location === "/" ? `${base}/` : `${base}${location}`;
    const image = `${base}/opengraph.jpg`;

    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonical);
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    const canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    canonicalLink?.setAttribute("href", canonical);
    document.head.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.setAttribute("content", image);
    document.head.querySelector<HTMLMetaElement>('meta[name="twitter:image"]')?.setAttribute("content", image);
    document.head.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]').forEach((link) => {
      const alternateLang = link.hreflang === "x-default" ? "ar" : link.hreflang;
      link.href = `${canonical}?lang=${alternateLang}`;
    });
  }, [lang, location]);

  return null;
}