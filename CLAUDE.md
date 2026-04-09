# CLAUDE.md — LabStudio Media

## Project overview

Marketing agency website for LabStudio Media (Los Mochis, Sinaloa). Built with Astro v6, static output, content in Spanish. Services: marketing digital, fotografía, video, desarrollo web.

## Commands

```bash
npm run dev       # Dev server → http://localhost:4321
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro v6 |
| Styling | Bootstrap 5.2.3 + custom CSS |
| Language | TypeScript |
| Images | `astro:assets` + Sharp |
| Animations | AOS (Animate On Scroll) |
| Analytics | Google Tag Manager (via Gtm.astro / GtmBody.astro) |
| Maps | Google Maps JS API |
| Font | HKGroteskPro |

## Project structure

```
src/
├── pages/            # File-based routes (.astro)
│   ├── index.astro
│   ├── desarrollo-web.astro
│   ├── links.astro
│   ├── blog.astro
│   ├── blog/         # Individual blog posts
│   └── 404.astro
├── layouts/
│   ├── IndexLayout.astro     # Homepage layout (full SEO + GTM)
│   └── SubPageLayout.astro   # Secondary pages
├── components/
│   ├── shared/       # Nav, Footer, WhatsApp, Gtm, GtmBody, Maps
│   ├── index/        # Homepage sections (PricingCard, ClientCard…)
│   ├── blog/         # BlogEntry, BlogEntryCard
│   ├── web-dev/      # TestimonialCard
│   ├── helpers/      # Show.astro (conditional render)
│   └── photos/
├── interfaces/       # TypeScript interfaces (BlogContentList)
├── enums/            # JobSkills enum
└── img/              # Source images (optimized at build time)

public/
├── styles/
│   ├── theme.bundle.css   # Bootstrap + theme overrides
│   ├── libs.bundle.css    # AOS and other libs
│   └── shared.css         # Custom utilities and variables
└── js/
    ├── theme.bundle.js
    └── vendor.bundle.js
```

## Styling conventions

- Bootstrap utility classes for layout (`.row`, `.col-*`, `.d-flex`, `.pt-*`, etc.)
- Custom classes use `.lab-*` or `.labs-*` prefix
- Brand colors defined in `public/styles/shared.css`:
  - Primary purple: `#633fb9`
  - Gradient: `rgba(99,56,255,1)` → `rgba(118,69,237,1)`
- Component-scoped `<style>` blocks inside `.astro` files for component-specific styles
- Responsive breakpoints follow Bootstrap defaults (sm/md/lg/xl)

## Component conventions

```astro
---
interface Props {
  propName: type;
}
const { propName } = Astro.props;
---
```

- Images always via `<Image>` from `astro:assets` (never `<img>` directly)
- Conditional rendering uses `<Show show={boolean}>` helper component
- Social icons use inline Bootstrap Icons SVGs (no icon library dependency)

## Layouts usage

```astro
<!-- Full page with all SEO fields -->
<IndexLayout title="..." ogTitle="..." description="..." ogDescription="..." keywords="..." ogImage="...">

<!-- Secondary pages -->
<SubPageLayout title="..." ogTitle="..." description="..." ogDescription="..." keywords="...">
```

Both layouts include GTM head/body snippets automatically.

## SEO

- Language: `lang="es"`
- Every page requires: title, og:title, description, og:description, keywords
- Canonical URL hardcoded to `https://labstudiomedia.com`
- Google Site Verification included in layouts
- Partytown offloads GTM to a worker thread (configured in `astro.config.mjs`)

## Blog posts

- Located in `src/pages/blog/`
- Content structured as array of `BlogContent` objects: `{ subTitle, text, img? }`
- Written in Spanish
- Use `SubPageLayout` with relevant metadata

## Key integrations

- **WhatsApp**: `https://wa.me/526681057964` — used for CTAs throughout
- **Google Maps**: pin at `{ lat: 25.8055853, lng: -108.9964254 }` with mapId `ebec91dda5c2b1c2`
- **GTM**: Manually added via `Gtm.astro` (head) and `GtmBody.astro` (body)
- **Social links**: Instagram, Facebook, TikTok, WhatsApp, YouTube, LinkedIn (`/company/labstudiomedia/`)

## Important notes

- All user-facing content is in **Spanish**
- Do not add `<img>` tags — always use `<Image>` from `astro:assets`
- Do not introduce new npm dependencies without checking if Bootstrap or Astro already provides the feature
- The `Show` helper component is the preferred way to conditionally render blocks
- `Footer.astro` has a `useMap: boolean` prop that controls Google Maps visibility
