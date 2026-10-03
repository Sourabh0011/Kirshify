import Image from "next/image";
import type { ReactElement } from "react";

import { getCrop } from "@/config/crops";
import { cn, seededRandom } from "@/lib/utils";
import type { Crop } from "@/types/crop";

const W = 240;
const H = 180;
const r1 = (n: number) => Math.round(n * 10) / 10;

const FALLBACK: Crop["art"] = { shape: "seed", background: "#5E7F28", fill: "#A8E05F", shade: "#7FA33A" };

type Shape = { y: number; el: ReactElement };

function generate(art: Crop["art"], rand: () => number): Shape[] {
  const out: Shape[] = [];
  const jitter = (amount: number) => (rand() - 0.5) * amount * 2;

  if (art.shape === "seed") {
    for (let y = -8; y < H + 16; y += 17) {
      for (let x = -8 + ((y / 17) % 2) * 8; x < W + 16; x += 17) {
        const cx = r1(x + jitter(4));
        const cy = r1(y + jitter(4));
        const r = r1(7.5 + rand() * 2.2);
        out.push({
          y: cy,
          el: (
            <g key={out.length}>
              <circle cx={cx} cy={cy} r={r} fill={rand() > 0.3 ? art.fill : art.shade} stroke={art.shade} strokeWidth="1.2" />
              <circle cx={r1(cx - r * 0.35)} cy={r1(cy - r * 0.35)} r={r1(r * 0.3)} fill="#fff" opacity="0.35" />
            </g>
          ),
        });
      }
    }
  } else if (art.shape === "grain") {
    for (let y = -10; y < H + 20; y += 15) {
      for (let x = -6; x < W + 12; x += 11) {
        const cx = r1(x + jitter(4));
        const cy = r1(y + jitter(5));
        const rot = Math.round(jitter(40));
        out.push({
          y: cy,
          el: (
            <ellipse
              key={out.length}
              cx={cx}
              cy={cy}
              rx="3.6"
              ry="9"
              transform={`rotate(${rot} ${cx} ${cy})`}
              fill={rand() > 0.35 ? art.fill : art.shade}
              stroke={art.shade}
              strokeWidth="0.8"
            />
          ),
        });
      }
    }
  } else if (art.shape === "round") {
    for (let y = 0; y < H + 30; y += 36) {
      for (let x = ((y / 36) % 2) * 18; x < W + 30; x += 38) {
        const cx = r1(x + jitter(7));
        const cy = r1(y + jitter(7));
        const r = r1(19 + rand() * 6);
        out.push({
          y: cy,
          el: (
            <g key={out.length}>
              <circle cx={cx} cy={cy} r={r} fill={art.shade} />
              <circle cx={r1(cx - r * 0.06)} cy={r1(cy - r * 0.08)} r={r1(r * 0.88)} fill={art.fill} />
              <ellipse cx={r1(cx - r * 0.38)} cy={r1(cy - r * 0.4)} rx={r1(r * 0.26)} ry={r1(r * 0.16)} fill="#fff" opacity="0.4" />
            </g>
          ),
        });
      }
    }
  } else if (art.shape === "fluff") {
    for (let y = 8; y < H + 20; y += 40) {
      for (let x = 8 + ((y / 40) % 2) * 22; x < W + 20; x += 46) {
        const cx = r1(x + jitter(8));
        const cy = r1(y + jitter(8));
        const petals = [0, 72, 144, 216, 288].map((deg) => {
          const a = ((deg + jitter(12)) * Math.PI) / 180;
          return { x: r1(cx + Math.cos(a) * 9), y: r1(cy + Math.sin(a) * 9), r: r1(9 + rand() * 3) };
        });
        out.push({
          y: cy,
          el: (
            <g key={out.length}>
              <circle cx={cx} cy={cy} r="15" fill="#6B4A2A" opacity="0.55" />
              {petals.map((p, pi) => (
                <circle key={pi} cx={p.x} cy={p.y} r={p.r} fill={art.fill} stroke={art.shade} strokeWidth="1" />
              ))}
              <circle cx={cx} cy={cy} r="7" fill={art.fill} />
            </g>
          ),
        });
      }
    }
  } else {
    // pod — turmeric fingers, chillies, groundnut shells
    for (let y = -6; y < H + 16; y += 20) {
      for (let x = -10 + ((y / 20) % 2) * 12; x < W + 20; x += 26) {
        const cx = r1(x + jitter(6));
        const cy = r1(y + jitter(6));
        const w = r1(30 + rand() * 12);
        const rot = Math.round(jitter(55));
        out.push({
          y: cy,
          el: (
            <rect
              key={out.length}
              x={r1(cx - w / 2)}
              y={r1(cy - 5.5)}
              width={w}
              height="11"
              rx="5.5"
              transform={`rotate(${rot} ${cx} ${cy})`}
              fill={rand() > 0.35 ? art.fill : art.shade}
              stroke={art.shade}
              strokeWidth="1"
            />
          ),
        });
      }
    }
  }

  return out.sort((a, b) => a.y - b.y);
}

interface CropArtProps {
  cropSlug: string;
  /** A real photo; when provided it replaces the generated art. */
  image?: string;
  alt: string;
  /** Changes the random layout so gallery thumbnails differ. */
  variant?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * Generated crop artwork used until real photos are uploaded.
 * Drop images in /public/images/crops and set `images` on the listing to switch.
 */
export function CropArt({ cropSlug, image, alt, variant = 0, sizes = "(min-width: 1024px) 25vw, 50vw", priority, className }: CropArtProps) {
  if (image) {
    return (
      <span className={cn("relative block size-full overflow-hidden", className)}>
        <Image src={image} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </span>
    );
  }

  const art = getCrop(cropSlug)?.art ?? FALLBACK;
  const shapes = generate(art, seededRandom(`${cropSlug}:${variant}`));

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={alt}
      className={cn("block size-full", className)}
    >
      <defs>
        <radialGradient id="kirshify-vignette" cx="50%" cy="45%" r="75%">
          <stop offset="55%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.38" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={art.background} />
      {shapes.map((s) => s.el)}
      <rect width={W} height={H} fill="url(#kirshify-vignette)" />
    </svg>
  );
}
