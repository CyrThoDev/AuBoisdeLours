// app/page.tsx — Au bois de l'ours (page d'attente)
// Polices : voir layout.tsx (variables --font-display et --font-sans)

const PHONE_DISPLAY = "06 65 77 71 51";
const PHONE_LINK = "tel:+33665777151";
const FACEBOOK_URL = "https://www.facebook.com/"; // ← mettre l'URL de la page de Nicolas
const PHOTO = "/atelier.webp"; // la photo du tour (dans /public)

/* ---------- Coupe de bûche : cernes générés, irréguliers mais stables ---------- */

function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Forme commune à toute la bûche (les cernes se suivent), plus une petite variation par année
type Shape = { a1: number; a2: number; p1: number; p2: number };

function ring(r: number, cx: number, cy: number, sh: Shape, rand: () => number) {
  const a3 = 0.003 + rand() * 0.008;
  const p3 = rand() * Math.PI * 2;
  const pts: string[] = [];
  const n = 120;
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * Math.PI * 2;
    const k =
      r *
      (1 + sh.a1 * Math.sin(2 * t + sh.p1) + sh.a2 * Math.sin(3 * t + sh.p2) + a3 * Math.sin(7 * t + p3));
    pts.push(`${(cx + k * Math.cos(t)).toFixed(1)},${(cy + k * Math.sin(t)).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}

function buildLog() {
  const rand = rng(1931);
  const sh: Shape = { a1: 0.03, a2: 0.012, p1: 0.6, p2: 2.1 };
  // le cœur est un peu décentré, comme sur une vraie coupe
  const cx = 488;
  const cy = 510;
  const rings: { d: string; w: number }[] = [];
  let r = 258;
  while (r < 438) {
    const w = rand() < 0.25 ? 3.2 : 1.2 + rand() * 0.8; // bois d'été plus marqué certaines années
    rings.push({ d: ring(r, cx, cy, sh, rand), w });
    r += rand() < 0.3 ? 5 + rand() * 5 : 12 + rand() * 18; // années sèches, années humides
  }
  const bark = ring(458, cx + 4, cy - 4, sh, () => 0);
  return { rings, bark, cx, cy };
}

const LOG = buildLog();

function LogSection() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      className="h-auto w-full lg:h-[94svh] lg:w-auto lg:max-w-none"
      role="img"
      aria-label="Un œuf en bois en cours de tournage, au cœur d'une coupe de bûche"
    >
      <defs>
        <clipPath id="coeur">
          <circle cx={LOG.cx} cy={LOG.cy} r="240" />
        </clipPath>
      </defs>

      {/* écorce + aubier */}
      <path d={LOG.bark} fill="#4B382C" stroke="#21170F" strokeWidth="22" className="bark" />

      {/* cernes */}
      <g fill="none" stroke="#7A5F4B" strokeLinecap="round">
        {LOG.rings.map(({ d, w }, i) => (
          <path
            key={i}
            d={d}
            strokeWidth={w}
            pathLength={1}
            className="cerne"
            style={{ animationDelay: `${120 + i * 70}ms` }}
          />
        ))}
      </g>

      {/* fente de séchage */}
      <path
        d="M930 470 L872 478 L828 486 L796 489"
        fill="none"
        stroke="#21170F"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* la photo, au cœur */}
      <image
        href={PHOTO}
        x={LOG.cx - 240}
        y={LOG.cy - 300}
        width="480"
        height="640"
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#coeur)"
      />
      <circle cx={LOG.cx} cy={LOG.cy} r="240" fill="none" stroke="#21170F" strokeWidth="4" />
    </svg>
  );
}

/* ---------- Page ---------- */

export default function Home() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-[#3A2A20] font-[family-name:var(--font-sans)] text-[#EFE3CC] antialiased">
      <style>{`
        .cerne { stroke-dasharray: 1; stroke-dashoffset: 0; animation: pousse 1.1s cubic-bezier(.3,.7,.2,1) both; }
        @keyframes pousse { from { stroke-dashoffset: 1; opacity: 0 } to { stroke-dashoffset: 0; opacity: 1 } }
        @media (prefers-reduced-motion: reduce) { .cerne { animation: none } }
      `}</style>

      <div className="mx-auto grid min-h-svh max-w-[88rem] items-center lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* La bûche déborde du bord de l'écran sur grand écran */}
        <div className="-mx-[12%] -mt-[14%] sm:-mx-[4%] lg:-ml-[16%] lg:mr-0 lg:mt-0 lg:flex lg:justify-end">
          <LogSection />
        </div>

        <article className="px-6 pb-14 pt-2 sm:px-10 lg:max-w-[34rem] lg:px-0 lg:py-20">
          <p className="text-[0.95rem] text-[#C9B596]">
            Tournage sur bois à Lacaugne, en Haute-Garonne
          </p>

          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[3.4rem] leading-[0.95] tracking-[-0.01em] sm:text-7xl lg:text-[5.6rem]">
            Au bois
            <br />
            de l&apos;ours
          </h1>

          <div className="mt-10 space-y-4 text-[1.075rem] leading-[1.65] text-[#E4D5BA]">
            <p>
              Passionné de nature et de forêt depuis toujours, l&apos;envie de créer autour du
              bois m&apos;est naturellement venue il y a quelques années.
            </p>
            <p>
              Plusieurs stages m&apos;ont poussé davantage dans cette voie et voici aujourd&apos;hui
              un échantillon de mes créations.
            </p>
          </div>

          <p className="mt-7 font-[family-name:var(--font-display)] text-xl leading-snug">
            Bon voyage au Bois de l&apos;Ours.
            <span className="mt-1 block text-base text-[#C9B596]">Nicolas Kreutz</span>
          </p>

          <div className="mt-12 border-l-2 border-[#7A5F4B] pl-5">
            <p className="max-w-[28rem] text-[0.95rem] leading-relaxed text-[#C9B596]">
              Le site complet est encore sur l&apos;établi. D&apos;ici là, appelez-moi pour une
              pièce ou une commande, ou suivez l&apos;atelier sur Facebook.
            </p>
            <a
              href={PHONE_LINK}
              className="mt-4 inline-block font-[family-name:var(--font-display)] text-[2rem] leading-none underline decoration-[#B7BE8B] decoration-2 underline-offset-[10px] transition-colors hover:text-[#B7BE8B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7BE8B] sm:text-[2.5rem]"
            >
              {PHONE_DISPLAY}
            </a>
            <p className="mt-6">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[1.05rem] underline decoration-[#7A5F4B] underline-offset-4 hover:decoration-[#B7BE8B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B7BE8B]"
              >
                L&apos;atelier sur Facebook
              </a>
            </p>
          </div>

          <p className="mt-16 text-sm text-[#A8937A]">© 2026 Au bois de l&apos;ours</p>
        </article>
      </div>
    </main>
  );
}
