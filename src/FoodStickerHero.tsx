import { useLanguage } from "./LanguageContext";

const base = import.meta.env.BASE_URL;
// order: caterer, restaurant, homemade, sweets -> index into translations.categories.items
export const HERO_SERVICES = [
  { file: "catering", idx: 3 },
  { file: "restaurant", idx: 2 },
  { file: "homemade", idx: 0 },
  { file: "sweets", idx: 1 },
] as const;

export type HeroService = (typeof HERO_SERVICES)[number]["file"];

export default function FoodStickerHero({
  onServiceHover,
}: {
  onServiceHover?: (service: HeroService | null) => void;
}) {
  const { t } = useLanguage();
  return (
    <div className="arcade">
      <ul className="arcade-list">
        {HERO_SERVICES.map((s, i) => {
          const title = t.categories.items[s.idx].title;
          return (
            <li key={s.file} className="arcade-item" style={{ ["--i" as string]: i }}>
              <div className="arcade-frame"
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") onServiceHover?.(s.file);
                }}
                onPointerLeave={() => onServiceHover?.(null)}
                onPointerCancel={() => onServiceHover?.(null)}
              >
                <div className="arcade-photo">
                  <img src={`${base}hero-services/${s.file}.webp`} alt="" width={520} height={520} loading="eager" decoding="async" />
                  <span className="arcade-tile" aria-hidden="true" />
                  <span className="arcade-label">
                    <small aria-hidden="true">0{i + 1}</small>
                    {title}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="arcade-band" aria-hidden="true" />
    </div>
  );
}
