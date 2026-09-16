# Design system — Ahmed EL-Tlawy portfolio

Personal site for a Data Engineer. Visual language follows a developer-portfolio pattern: dark night-sky canvas, spring-green accent, HTML-tag decorations, and a fixed icon rail. Visual reference: [Sudip / Metaloopa](https://portfolio-metaloopa.vercel.app/).

Stack: Astro (static), Tailwind CSS 3, a small set of custom CSS in `src/styles/global.css`. Copy and structured content live in `src/data/portfolio-data.ts`.

---

## Principles

1. **Dark first.** The page is a night sky, not a light document. Type is white or muted gray; color is reserved for accent, gold, and hover orange.
2. **Accent is the brand.** Spring green (`#00ff7f`) marks headings, tags, borders, buttons, and focus. Do not introduce a second primary accent.
3. **HTML as decoration.** Script-style `&lt;h1&gt;` / `&lt;body&gt;` tags frame sections. They are visual, not semantic (`aria-hidden`).
4. **One source of content.** Do not hardcode bio, projects, skills, or contact details in components. Edit `src/data/portfolio-data.ts`.
5. **Motion is optional.** Letter bounce, star drift, cube spin, and tag cloud respect `prefers-reduced-motion`.
6. **Keep the chrome quiet.** Sidebar, page tags, and sky stay consistent on every route. Page content changes; the shell does not.

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

Scale (typical):

- Hero name: `text-6xl` → `lg:text-[5.75rem]`, tight leading (`~1.02`).
- Page titles (About, Projects, Skills, Journey, Contact): `text-6xl` → `lg:text-[5.3rem]`, `text-accent`, `leading-none`.
- Body: `17px` / `text-lg`, `font-light`, relaxed leading, max width ~`max-w-2xl` next to a visual.
- Kicker: uppercase, `tracking-[0.28em]`, muted gray.
- Buttons: uppercase, `letter-spacing: 0.28em`.
- Nav hover labels: 9px, wide tracking, gold.

Job title in the hero is display type in **accent**. The first letter of the name is a boxed `A` (border + accent), matching the sidebar logo.

---

## Layout

### Shell

```
┌────────┬──────────────────────────────────────┐
│ Sidebar│  Sky (stars) + main                  │
│ 80px   │  <body> tag top-left of content      │
│ fixed  │                                      │
│        │  Page content (max ~1400px)          │
│        │                                      │
│        │  </body></html> bottom-left          │
└────────┴──────────────────────────────────────┘
```

- Sidebar: `fixed`, `w-[80px]`, `bg-ink`, full viewport height, `z-50`. Hidden below `md`; replaced by a 64px top bar + drawer.
- Main offset: `md:pl-[80px]`. Sky starts at `left: 80px` so it does not paint under the rail. On mobile, sky starts below the 64px header.
- Decorative body tags: `absolute`, `left-[88px]`, `top-8` / `bottom-6`, desktop only. They sit just inside the content, not on the icons.
- Content padding: `px-6 sm:px-12 lg:px-20` (skills/contact use a slightly tighter `lg:px-16`).
- Content max width: `max-w-[1400px]` (home, about, projects, skills) or `max-w-7xl` (journey, contact).
- Split pages: 12-column grid, copy `lg:col-span-7` (or 5), visual `lg:col-span-5` (or 7).

### Sidebar

Top to bottom:

1. Logo: display `A` + 9px `AHMED`.
2. Icon nav (28px icons, 56px row height). Idle `#4d4d4e`. Current route and hover: gold. Hover swaps the icon for the route label (`data-label`).
3. LinkedIn + GitHub (24px).

Mobile: hamburger, full-width drawer under the header. Same routes.

### Routes

| Path | Page | Dominant layout |
| --- | --- | --- |
| `/` | Home | Hero + spinning tech cube |
| `/about` | About | Bio + stats glass cards + cube |
| `/projects` | Projects | Sticky intro + filter chips; scrollable card column |
| `/skills` | Skills | Copy + TagCloud sphere |
| `/certifications` | Journey | Cert grid + alternating timeline |
| `/contact` | Contact | Details + underline form |
| `404` | Not found | Centered 404 + flat button |

Footer is present as a component; keep it visually secondary to the sidebar chrome.

---

## Components

| Piece | Class / file | Behavior |
| --- | --- | --- |
| Page tags | `.page-tags` | Script accent, 1.25rem, 85% opacity, no pointer events |
| CTA | `.flat-button` | Transparent, 1px accent border, 0.4rem radius. Hover: fill accent, text black |
| Glass | `.glass-card` | Dark glass, accent border; hover brightens border + green glow |
| Project card | `.project-card` | Glass-like accent panel; hover lift + glow |
| Filter chip | `.filter-btn` | Pill. Active/hover: solid accent, black text |
| Nav item | `.nav-link` | Icon → gold label on hover |
| Reveal | `.reveal-on-scroll` | Fade/slide in via IntersectionObserver in `BaseLayout` |
| Cube | `.stage-cube` / `.cubespinner` | 280px faces, accent wireframe, 12s spin |
| Skill cloud | `.tagcloud` | Orange labels; hover accent. Library: `TagCloud` |
| Flip card | `.flip-card` | 180° Y flip on hover/focus; disabled when reduced motion |
| Stars | `.sky` / `.stars-*` | Three layers, 50s / 100s / 150s vertical drift |

Icons: `src/components/icons/Icon.astro`. Default class is `w-5 h-5`. **Always pass matching `class` and `size`** when you need a different size (sidebar already does `w-7 h-7` / `w-6 h-6`). Width/height attributes alone will not win over the Tailwind class.

---

## Motion

| Effect | Where | Notes |
| --- | --- | --- |
| `bounceIn` | Hero letters | Staggered delay (~0.08s per character) |
| `rubberBand` + orange | Letter hover | Playful; keep it on the name only |
| `fadeInUp` late | Hero kicker, tagline, CTA, cube | 1.6s delay so letters land first |
| Cube spin | Home, About | Infinite; pause conceptually under reduced motion |
| Star drift | Global | Transform only |
| Tag cloud | Skills | Destroy/recreate on resize; skip animation if reduced motion |
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
- **Contact:** mailto/tel/location, language chips, FormSubmit POST. Inputs are underline-only (`border-b`), not boxed.

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
src/components/icons/Icon.astro
src/data/portfolio-data.ts      all site copy
src/styles/global.css           tokens + motion + component CSS
src/lib/stars.ts                star box-shadow generator
tailwind.config.mjs             colors + fonts
```

---

## When you change the UI

- New page: reuse `BaseLayout`, the `&lt;h1&gt;` tag sandwich, display title in accent, and the 12-column split if there is a visual.
- New color: add it as a one-off hover (`#ff4500`) or extend the existing tokens. Do not add a third “brand” green.
- Wider/narrower sidebar: update width, main padding, sky `left`, and body-tag `left` together.
- Bigger icons: set both `size` and Tailwind `w-* h-*` on `Icon`.
- Copy edits: `portfolio-data.ts` only.
