import type { ReactNode } from "react";

const asset = (name: string) => `${import.meta.env.BASE_URL}hero-food/${name}.webp`;

/** Photographic food cutouts; SVG is only the responsive frame and motion layer. */
function FoodFrame({ id, children }: { id: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true" focusable="false"
      className="sticker-svg" data-sticker={id}>
      {children}
    </svg>
  );
}

export function CouscousSticker() {
  return (
    <FoodFrame id="couscous">
      <defs>
        <linearGradient id="food-steam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#b5a695" stopOpacity=".4" />
          <stop offset="1" stopColor="#d5ccbd" stopOpacity="0" />
        </linearGradient>
      </defs>
      <image className="food-cutout" href={asset("couscous")} x="6" y="45" width="148" height="98" />
      {[54, 80, 105].map((x, i) => (
        <path key={x} className={`steam-wisp steam-wisp--${i}`}
          d={`M${x} 59 C${x - 10} 46 ${x + 12} 34 ${x} 15`}
          fill="none" stroke="url(#food-steam)" strokeWidth="2.8" strokeLinecap="round" />
      ))}
    </FoodFrame>
  );
}

export function BourekSticker() {
  return (
    <FoodFrame id="bourek">
      <image className="food-cutout" href={asset("bourek")} x="4" y="35" width="152" height="100" />
      <image className="st-parsley" href={asset("parsley")} x="117" y="109" width="34" height="23" />
    </FoodFrame>
  );
}

export function MatloukhSticker() {
  return (
    <FoodFrame id="matlouh">
      <defs>
        <radialGradient id="food-flame">
          <stop offset="0" stopColor="#fff0b2" stopOpacity=".85" />
          <stop offset=".55" stopColor="#f1a036" stopOpacity=".65" />
          <stop offset="1" stopColor="#c76328" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="st-flame">
        <path d="M68 137 Q71 125 75 121 Q74 130 79 132 Q86 126 88 119 Q95 136 83 140 Z"
          fill="url(#food-flame)" />
      </g>
      <image className="food-cutout" href={asset("matlouh")} x="4" y="24" width="152" height="112" />
    </FoodFrame>
  );
}

export function MakroutSticker() {
  return (
    <FoodFrame id="makrout">
      <defs>
        <linearGradient id="food-honey" x1="0" x2="1">
          <stop offset="0" stopColor="#b86b16" />
          <stop offset=".45" stopColor="#f4c671" stopOpacity=".9" />
          <stop offset="1" stopColor="#c38428" />
        </linearGradient>
      </defs>
      <image className="food-cutout" href={asset("makrout")} x="7" y="18" width="146" height="118" />
      <path className="st-honey-drop" d="M87 128 C87 133 85 138 86 140 C89 143 92 140 91 137 L89 128 Z"
        fill="url(#food-honey)" opacity=".85" />
    </FoodFrame>
  );
}
