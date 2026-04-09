# CLAUDE.md — LabStudio Media

## Project overview

Marketing agency website for LabStudio Media (Los Mochis, Sinaloa). Built with Astro v6, static output, content in Spanish. Services: marketing digital, tarjetas NFC, desarrollo web.

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
│   ├── tarjetas-nfc.astro
│   ├── links.astro
│   ├── blog.astro
│   ├── blog/         # Individual blog posts
│   └── 404.astro
├── layouts/
│   ├── IndexLayout.astro     # Homepage layout (full SEO + GTM)
│   └── SubPageLayout.astro   # Secondary pages
├── components/
│   ├── shared/       # Nav, Footer, WhatsApp, Gtm, GtmBody, Maps, CustomBtn, CheckIconGreen
│   ├── index/        # Homepage sections (PricingCard, ClientCard…)
│   ├── blog/         # BlogEntry, BlogEntryCard
│   ├── web-dev/      # TestimonialCard
│   ├── helpers/      # Show.astro (conditional render)
│   └── photos/
├── interfaces/       # TypeScript interfaces (BlogContentList)
├── enums/            # JobSkills enum
└── img/              # Source images (optimized at build time)

docs/
└── nfc.md            # Product copy for the NFC cards landing page

public/
├── styles/
│   ├── theme.bundle.css   # Bootstrap + theme overrides (includes pt-10, pt-12, mb-8… extended spacing)
│   ├── libs.bundle.css    # AOS and other libs
│   └── shared.css         # Custom utilities, brand colors and variables
└── js/
    ├── theme.bundle.js    # Bootstrap wrappers + AOS init (8 KB, defer) — pre-compiled, do not modify
    └── vendor.bundle.js   # Third-party libs: Bootstrap, AOS, etc. (726 KB, defer) — pre-compiled, do not modify
                           # Only Bootstrap component used in markup: navbar collapse (Nav.astro)
```

## Pages

| Route | File | Layout | Description |
|-------|------|---------|-------------|
| `/` | `index.astro` | `IndexLayout` | Homepage |
| `/desarrollo-web` | `desarrollo-web.astro` | `SubPageLayout` | Web development services |
| `/tarjetas-nfc` | `tarjetas-nfc.astro` | `SubPageLayout` | NFC business cards landing |
| `/links` | `links.astro` | `SubPageLayout` | Social links hub |
| `/blog` | `blog.astro` | `SubPageLayout` | Blog index |
| `/blog/[slug]` | `blog/*.astro` | `SubPageLayout` | Individual blog posts |
| `/aviso-de-privacidad` | `aviso-de-privacidad.astro` | `SubPageLayout` | Privacy policy (LFPDPPP) |

## Styling conventions

- Bootstrap utility classes for layout (`.row`, `.col-*`, `.d-flex`, `.pt-*`, etc.)
- The theme extends Bootstrap spacing up to scale 12 — `.pt-10`, `.pt-12`, `.mb-8`, etc. are valid
- Custom classes use `.lab-*` or `.labs-*` prefix
- Brand colors defined in `public/styles/shared.css`:
  - Primary purple: `#633fb9`
  - Gradient: `rgba(153,86,255,1)` → `rgba(118,69,237,1)` (buttons / accents)
  - Dark gradient (text): `rgb(135,72,230)` → `rgb(102,61,196)`
  - Eyebrow / accent text: `#9554fd`
- Gradient text: use class `text-labs-gradient`
- Gradient background: use class `labs-btn-gradient`
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
- CTAs always use `<CustomBtn>` — props: `isPrimary`, `href`, `blank`, `extraClasses`, `aos`

## Layouts usage

```astro
<!-- Full page with all SEO fields -->
<IndexLayout title="..." ogTitle="..." description="..." ogDescription="..." keywords="...">

<!-- Secondary pages (desarrollo-web, tarjetas-nfc, blog, links…) -->
<SubPageLayout title="..." ogTitle="..." description="..." ogDescription="..." keywords="...">
```

Both layouts include GTM head/body snippets automatically.

`SubPageLayout` has a `<slot name="head" />` inside `<head>` — use it to inject page-specific JSON-LD:
```astro
<SubPageLayout ...>
  <script type="application/ld+json" slot="head" set:html={schemaJson} />
```

## Nav & Footer

- **Nav** links (in order): Inicio · Desarrollo Web · Tarjetas NFC · Blog
  - Add new pages here by inserting an `<a class="nav-link">` with `data-astro-reload` and `data-aos="fade-down"` — increment `data-aos-delay` by 25–50ms per link
  - Active link gets `text-labs-gradient` class automatically via the inline script
- **Footer** "Enlaces" column mirrors the Nav links
- `Footer.astro` accepts `useMap: boolean` — pass `false` on pages without a map

## SEO

- Language: `lang="es"`
- Every page requires: title, og:title, description, og:description, keywords
- Canonical URL is dynamic: `` `https://labstudiomedia.com${Astro.url.pathname}` `` (set in both layouts)
- Google Site Verification included in layouts
- Partytown offloads GTM to a worker thread (configured in `astro.config.mjs`)
- Sitemap auto-generated by `@astrojs/sitemap` on every build — never edit `public/sitemap.xml` manually; `/links` excluded via filter in `astro.config.mjs`
- `IndexLayout.astro` includes static `Organization` + `WebSite` JSON-LD (homepage only)
- `BlogEntry.astro` auto-generates `BlogPosting` JSON-LD from props — date is converted from Spanish string (e.g. "Mayo 29, 2024") to ISO 8601 internally
- No physical location — LabStudio Media operates remotely from Los Mochis, Sinaloa; use `Organization` schema, not `LocalBusiness`

## Blog posts

- Located in `src/pages/blog/`
- Content structured as array of `BlogContent` objects: `{ subTitle, text, img? }`
- Written in Spanish
- Use `SubPageLayout` with relevant metadata

## Key integrations

- **WhatsApp CTA**: `https://wa.me/526681057964` — pre-fill messages with `?text=URL-encoded-message`
- **Google Maps**: pin at `{ lat: 25.8055853, lng: -108.9964254 }` with mapId `ebec91dda5c2b1c2`
- **GTM**: Manually added via `Gtm.astro` (head) and `GtmBody.astro` (body)
- **Social links**: Instagram, Facebook, TikTok, WhatsApp, YouTube, LinkedIn (`/company/labstudiomedia/`)

## Important notes

- All user-facing content is in **Spanish**
- Do not add `<img>` tags — always use `<Image>` from `astro:assets`
- Do not introduce new npm dependencies without checking if Bootstrap or Astro already provides the feature
- The `Show` helper component is the preferred way to conditionally render blocks
- For new landing pages, follow the section pattern in `tarjetas-nfc.astro`: hero → benefits → use cases → CTA
- AOS animations: use `data-aos="fade-up"` for cards/content, `data-aos="fade-in"` for decorative elements; stagger siblings with `data-aos-delay` in 50ms increments
