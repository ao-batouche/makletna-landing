import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { CouscousSticker, BourekSticker, MatloukhSticker, MakroutSticker } from "./FoodStickers";

const LABELS = {
  en: { pause: "Pause food sticker animation", play: "Play food sticker animation", p: "Pause", r: "Play" },
  fr: { pause: "Mettre en pause l'animation des autocollants", play: "Lancer l'animation des autocollants", p: "Pause", r: "Lecture" },
  ar: { pause: "إيقاف حركة الملصقات مؤقتاً", play: "تشغيل حركة الملصقات", p: "إيقاف", r: "تشغيل" },
} as const;

export default function FoodStickerHero() {
  const { lang } = useLanguage();
  const L = LABELS[lang];
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [tabOn, setTabOn] = useState(true);

  useEffect(() => {
    const el = ref.current;
    const io = typeof IntersectionObserver === "undefined" ? null
      : new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.05 });
    if (el) io?.observe(el);
    const onVis = () => setTabOn(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const running = !paused && visible && tabOn;
  const items = [CouscousSticker, BourekSticker, MatloukhSticker, MakroutSticker];

  return (
    <div className="sticker-hero" ref={ref} data-running={running ? "true" : "false"}>
      <div className="sticker-row" aria-hidden="true">
        {items.map((Item, i) => (
          <div key={i} className={`sticker sticker--${i + 1}`}>
            <Item />
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="button-sticker-motion"
        className="sticker-toggle"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? L.play : L.pause}
      >
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        <span>{paused ? L.r : L.p}</span>
      </button>
    </div>
  );
}
