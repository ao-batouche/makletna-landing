import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dist = process.env.SEO_DIST_DIR
  ? path.resolve(process.env.SEO_DIST_DIR)
  : path.resolve(new URL("../dist/public", import.meta.url).pathname);
const shell = await readFile(path.join(dist, "index.html"), "utf8");
const siteUrl = (process.env.SEO_SITE_URL ?? "https://makletna.replit.app").replace(/\/$/, "");
const baseSegment = (process.env.SEO_BASE_PATH ?? "/landing/").replace(/^\/|\/$/g, "");
const basePath = baseSegment ? `/${baseSegment}/` : "/";
const routes = {
  terms: {
    title: "الشروط والأحكام | ماكلتنا",
    description: "اطّلع على الشروط والأحكام التي تنظّم الوصول إلى منصة ماكلتنا واستخدامها.",
  },
  contact: {
    title: "تواصل مع ماكلتنا | أسئلة وملاحظات",
    description: "تواصل مع فريق ماكلتنا لطرح الأسئلة والملاحظات والاستفسارات حول منصة الطعام الجزائرية.",
  },
  partners: {
    title: "انضم كمقدّم خدمة في ماكلتنا",
    description: "انضم إلى ماكلتنا كمقدّم خدمة طعام جزائري مستقل للوصول إلى زبائن أكثر.",
  },
  invest: {
    title: "استثمر في ماكلتنا | منصة الطعام الجزائرية",
    description: "تعرّف على مهمة ماكلتنا في ربط الزبائن بمقدّمي خدمات الطعام الجزائري المستقلين.",
  },
};

for (const [route, metadata] of Object.entries(routes)) {
  const routeUrl = `${siteUrl}${basePath}${route}`;
  const html = shell
    .replace(/<title>.*?<\/title>/, `<title>${metadata.title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${metadata.description}" />`)
    .replace(/<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${routeUrl}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${metadata.title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${metadata.description}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${routeUrl}" />`)
    .replace(/<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${metadata.title}" />`)
    .replace(/<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${metadata.description}" />`)
    .replace(/(<link rel="alternate" hreflang="(?:ar|en|fr|x-default)" href=")[^"]+(" \/>)/g, (_match, start, end) => {
      const lang = _match.match(/hreflang="([^"]+)"/)?.[1] ?? "ar";
      return `${start}${routeUrl}?lang=${lang === "x-default" ? "ar" : lang}${end}`;
    });
  const routeDir = path.join(dist, route);
  await mkdir(routeDir, { recursive: true });
  await writeFile(path.join(routeDir, "index.html"), html);
}

console.log(`Generated ${Object.keys(routes).length} route-aware HTML shells.`);