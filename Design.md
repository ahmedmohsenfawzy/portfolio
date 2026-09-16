# Design system — Ahmed EL-Tlawy portfolio

Current visual language: dark night-sky canvas, spring-green accent, HTML-tag decorations, and a fixed 80px icon rail. Designed to be read at **100% browser zoom** (not 75%). Visual reference: [Sudip / Metaloopa](https://portfolio-metaloopa.vercel.app/).

Stack: Astro 7 (static), Tailwind CSS 3, custom CSS in `src/styles/global.css`. Copy lives in `src/data/portfolio-data.ts`. Deploy target: Vercel (`vercel.json`, Node 22 via `.node-version`).

---

## Principles

1. **Dark first.** Night sky, not a light document. Type is white or muted gray; color is reserved for accent, gold, and hover orange.
2. **Accent is the brand.** Spring green (`#00ff7f`) marks headings, tags, borders, buttons, and focus. Do not introduce a second primary accent.
3. **HTML as decoration.** Script-style `&lt;h1&gt;` / `&lt;body&gt;` tags frame sections. They are visual, not semantic (`aria-hidden`).
4. **One source of content.** Do not hardcode bio, projects, skills, or contact details in components. Edit `src/data/portfolio-data.ts`.
5. **Motion is optional.** Letter bounce, star drift, cube spin, and tag cloud respect `prefers-reduced-motion`.
6. **Keep the chrome quiet.** Sidebar, page tags, and sky stay consistent on every route. Page content changes; the shell does not.
7. **Comfortable at 100% zoom.** Root type is 15px. Display titles stay in the 4rem range, not 5.3–5.75rem.

---

## Color

CSS variables in `:root` (`src/styles/global.css`) and Tailwind tokens (`tailwind.config.mjs`) should stay in sync.

| Token | Hex | Use |
| --- | --- | --- |
| `--sidebar` / `ink` | `#181818` | Sidebar, html/body fallback, chrome |
| `--bg-main` / `navy.900` | `#022c43` | Glass fills, cube faces |
| `--bg-deep` / `navy.950` | `#090a0f` | Sky gradient end |
| Sky mid | `#1b2735` | Radial sky start |
| `--accent` / `accent` | `#00ff7f` | Headings, buttons, tags, borders, selection |
| `--gold` / `gold` | `#ffd700` | Active/hover nav, current route icon |
| `--muted` | `#8d8d8d` | Hero kicker, secondary labels |
| `--icon-idle` | `#4d4d4e` | Idle nav and social icons |
| Hover orange | `#ff4500` | Letter hover, skill cloud, GitHub hover |
| Selection | accent on black | `::selection` |

Surfaces:

- **Sky:** fixed radial gradient, stars as 1–3px box-shadow points.
- **Glass card:** `rgba(8, 18, 32, 0.72)` + `1px` accent border at ~18% opacity.
- **Page shell** (if used): navy at 42% + blur 10px + 1.5rem radius.
- **Project card:** accent at 5% fill, 20% border, 15px radius; hover lifts 5px and brightens the glow.

Do not use bright cyan as a new primary. Journey cards currently mix a little Tailwind cyan for timeline markers; new work should prefer accent/gold.

---

## Typography

Loaded in `BaseLayout.astro` from Google Fonts.

| Role | Family | Tailwind | Usage |
| --- | --- | --- | --- |
| Display | Oswald | `font-display` | Page titles, hero name, project titles, cube labels |
| Body | Inter | `font-sans` (default) | Paragraphs, UI |
| Script | La Belle Aurore | `font-script` / `.page-tags` | Decorative HTML tags |
| Mono | JetBrains Mono | `font-mono` | Email, dates, issuers, small meta |

Root: `html { font-size: 15px; }` so rem-based Tailwind is slightly compact.

Scale (typical, at 100% zoom):

- Hero name: `text-5xl` → `sm:text-6xl` → `lg:text-[4.25rem]`, leading `~1.05`.
- Page titles (About, Projects, Skills, Journey): `text-5xl` → `sm:text-6xl` → `lg:text-[4rem]`, `text-accent`, `leading-none`.
- Contact title: a hair smaller than other pages — `text-[2.75rem]` → `sm:text-[3.5rem]` → `lg:text-[calc(4rem-4px)]`.
- Body: `15px` / `text-base`, `font-light`, relaxed leading, max width `max-w-xl` next to a visual.
- Kicker: uppercase, `tracking-[0.24em]`, `text-xs` / `sm:text-sm`, muted gray.
- Buttons (`.flat-button`): uppercase, `0.8rem`, `letter-spacing: 0.28em`, padding `0.65rem 1.1rem`.
- Page tags: `1rem` script, 85% opacity.
- Nav hover labels: 9px, wide tracking, gold.
- Project titles: `text-xl` / `sm:text-2xl`.
- 404: `text-5xl` accent.

Job title in the hero is display type in **accent**. The first letter of the name is a boxed `A` (`w-11 h-11` / `sm:w-12 sm:h-12`, border + accent), matching the sidebar logo.

---

## Layout

### Shell

```
┌────────┬──────────────────────────────────────┐
│ Sidebar│  Sky (stars) + main                  │
│ 80px   │  <body> tag top-left of content      │
│ fixed  │                                      │
│        │  Page content (max 1180px)           │
│        │                                      │
│        │  </body></html> bottom-left          │
└────────┴──────────────────────────────────────┘
```

- Sidebar: `fixed`, `w-[80px]`, `bg-ink`, full viewport height, `z-50`. Hidden below `md`; replaced by a 64px top bar + drawer.
- Main offset: `md:pl-[80px]`. Sky starts at `left: 80px` so it does not paint under the rail. On mobile, sky starts below the 64px header.
- Decorative body tags: `absolute`, `left-[88px]`, `top-8` / `bottom-6`, desktop only. They sit just inside the content, not on the icons.
- Content padding: `px-5 sm:px-10 lg:px-14` (Journey uses `px-5 sm:px-8 lg:px-10`).
- Vertical padding: about `py-12 md:py-16` on most pages; Contact is `py-11 md:py-14`.
- Content max width: `max-w-[1180px]` on all main pages.
- Split pages: 12-column grid, copy `lg:col-span-7` (or 5), visual `lg:col-span-5` (or 7).

### Sidebar

Top to bottom:

1. Logo: display `A` + 9px `AHMED`.
2. Icon nav (28px icons via `size={28}` + `class="w-7 h-7"`, 56px row height). Idle `#4d4d4e`. Current route and hover: gold. Hover swaps the icon for the route label (`data-label`).
3. LinkedIn + GitHub (`size={22}` + `class="w-6 h-6"`, 24px).

Mobile: hamburger, full-width drawer under the header. Same routes.

### Routes

| Path | Page | Dominant layout |
| --- | --- | --- |
| `/` | Home | Hero + spinning tech cube |
| `/about` | About | Bio + stats glass cards + cube |
| `/projects` | Projects | Sticky intro + filter chips; scrollable card column |
| `/skills` | Skills | Copy + TagCloud sphere |
| `/certifications` | Journey | Cert grid + alternating timeline |
| `/contact` | Contact | Details + underline form + map (slightly denser than other pages) |
| `404` | Not found | Centered 404 + flat button |

Footer is present as a component; keep it visually secondary to the sidebar chrome.

---

## Components

| Piece | Class / file | Behavior |
| --- | --- | --- |
| Page tags | `.page-tags` | Script accent, `1rem`, 85% opacity, no pointer events |
| CTA | `.flat-button` | Transparent, 1px accent border, 0.4rem radius. Hover: fill accent, text black |
| Glass | `.glass-card` | Dark glass, accent border; hover brightens border + green glow |
| Project card | `.project-card` | Glass-like accent panel, `p-5 sm:p-6`; hover lift + glow |
| Filter chip | `.filter-btn` | Pill. Active/hover: solid accent, black text |
| Nav item | `.nav-link` | Icon → gold label on hover |
| Reveal | `.reveal-on-scroll` | Fade/slide in via IntersectionObserver in `BaseLayout` |
| Cube | `.stage-cube` / `.cubespinner` | **210px** faces, `translateZ(105px)`, 1.5rem labels, 12s spin |
| Skill cloud | `.tagcloud` | Orange labels (16px / 18px xl); hover accent. Radii 125 / 175 / 230. Library: `TagCloud` |
| Flip card | `.flip-card` | 180° Y flip on hover/focus; disabled when reduced motion |
| Stars | `.sky` / `.stars-*` | Three layers, 50s / 100s / 150s vertical drift |

Icons: `src/components/icons/Icon.astro`. Default class is `w-5 h-5`. **Always pass matching `class` and `size`** when you need a different size. Width/height attributes alone will not win over the Tailwind class.

---

## Motion

| Effect | Where | Notes |
| --- | --- | --- |
| `bounceIn` | Hero letters | Staggered delay (~0.08s per character) |
| `rubberBand` + orange | Letter hover | Playful; keep it on the name only |
| `fadeInUp` late | Hero kicker, tagline, CTA, cube | 1.6s delay so letters land first |
| Cube spin | Home, About | Infinite; removed under reduced motion |
| Star drift | Global | Transform only |
| Tag cloud | Skills | Destroy/recreate on resize; slow if reduced motion |
| Card reveal | Projects, journey | Observer `rootMargin: 0px 0px -40px` |
| Nav label | Sidebar | 0.2s opacity |

If a new animation cannot be turned off with `prefers-reduced-motion`, do not ship it.

---

## Content patterns

- **Headings:** script open tag → display title in accent → script close tag → one or two light body paragraphs.
- **Stats:** 2×2 glass cards; 11px uppercase accent label + small white value.
- **Projects:** category / year / badge pills; title + gradient rule + GitHub; problem blurb; up to four architecture bullets; tool pills; Code link.
- **Filters:** All plus `Streaming & Real-Time`, `Analytics Engineering`, `Data Warehousing`.
- **Journey:** certification tiles (status pill + issuer + date) then a vertical line with alternating cards on desktop.
- **Contact:** mailto/tel/location, language chips, FormSubmit POST, Google Maps embed (`height="176"`). Inputs are underline-only (`border-b`, `py-2.5`, `15px` type), not boxed. Form card `p-5`. Keep this page ~4px tighter than the others.

---

## Responsive

| Breakpoint | Behavior |
| --- | --- |
| `< md` (767px) | Top header + drawer. No sidebar, no body tags. Sky below header. Cube stacks under copy. Timeline is a left rail, not centered. |
| `md+` | 80px sidebar, body tags, sky inset. |
| `lg` | Two-column hero/about/skills/contact. |
| `xl` | Projects: sticky left column, independent scroll on the card list (`max-h-[78vh]`). |

Hit areas on the sidebar stay full width of the rail. Do not shrink the rail below 80px without also updating `md:pl-[80px]`, `.sky { left }`, and body-tag `left-[88px]`.

---

## Accessibility

- Skip link to `#main-content`.
- Current nav item: `aria-current="page"`.
- Decorative tags and cube: `aria-hidden="true"`.
- Icon-only links: `aria-label`.
- Form labels: visually hidden (`sr-only`) but present.
- Focus: keep accent visible on links/buttons; do not remove outlines without a replacement.
- Reduced motion: see `global.css` `@media (prefers-reduced-motion: reduce)` and the observer short-circuit in `BaseLayout.astro`.

---

## Deploy

- Static Astro (`output: "static"` in `astro.config.mjs`).
- `vercel.json`: framework Astro, `npm run build`, output `dist`, no trailing slash.
- Node **22** (`.node-version` and `package.json` `engines`).
- No environment variables. Contact uses FormSubmit.
- Canonical site URL: `https://portfolio-ahmed-el-tlawy.vercel.app` (`astro.config.mjs`, `public/robots.txt`). Update both if the live URL changes.
- `.gitignore` excludes `/dist`, `/node_modules`, `.astro/`, `.vercel`, and `.env*`.

---

## File map

```
src/layouts/BaseLayout.astro    shell, SEO, sky, body tags, reveal script
src/components/Sidebar.astro    rail + mobile header
src/components/Hero.astro       home
src/components/About.astro
src/components/Projects.astro
src/components/ProjectCard.astro
src/components/SkillsMatrix.astro
src/components/CertificationsTimeline.astro
src/components/Contact.astro
src/components/Footer.astro
src/components/icons/Icon.astro
src/data/portfolio-data.ts      all site copy
src/styles/global.css           tokens + motion + component CSS
src/lib/stars.ts                star box-shadow generator
tailwind.config.mjs             colors + fonts
vercel.json                     Vercel build settings
.node-version                   22
```

---

## When you change the UI

- New page: reuse `BaseLayout`, the `&lt;h1&gt;` tag sandwich, display title in accent (`lg:text-[4rem]` unless Contact), and the 12-column split if there is a visual. Cap content at `max-w-[1180px]`.
- New color: add it as a one-off hover (`#ff4500`) or extend the existing tokens. Do not add a third “brand” green.
- Wider/narrower sidebar: update width, main padding, sky `left`, and body-tag `left` together.
- Bigger icons: set both `size` and Tailwind `w-* h-*` on `Icon`.
- Copy edits: `portfolio-data.ts` only.
- Do not bump display titles back to 5.3rem+ or root font-size to 16px without checking 100% zoom.
- Cube size and `translateZ` stay paired (half of face width). Current pair: 210 / 105.
