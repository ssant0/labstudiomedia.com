# SEO Pendientes — labstudiomedia.com

Auditoría: 2026-03-31 | Score: 31/100

---

## Críticos

- [ ] **Canonical tags dinámicos** — todas las páginas apuntan a `/`, subpáginas no se indexan individualmente. Cambiar en `src/layouts/IndexLayout.astro:25` y `src/layouts/SubPageLayout.astro:25`:
  ```astro
  <link rel="canonical" href={`https://www.labstudiomedia.com${Astro.url.pathname}`} />
  ```

- [ ] **robots.txt: remover `Disallow: /desarrollo-web`** — la página está activa, en el sitemap, y actualmente bloqueada. `public/robots.txt`

- [ ] **Agregar JSON-LD `LocalBusiness`** — cero datos estructurados en todo el sitio. Agregar en `<head>` de `IndexLayout.astro` con nombre, teléfono, dirección (Los Mochis, Sinaloa), email y perfiles sociales.

- [ ] **`og:image` debe ser URL absoluta** — actualmente `content="/pageView.webp"`. Cambiar a `https://www.labstudiomedia.com/pageView.webp` en ambos layouts.

- [ ] **OG meta tags: cambiar `name=` por `property=`** — `og:title`, `og:description`, `og:author` usan `name=` y son ignorados por todas las plataformas sociales. `IndexLayout.astro` líneas 30–36.

---

## Alta Prioridad

- [ ] **Eliminar `<title>` duplicado** — aparece en líneas 24 y 50 de ambos layouts. Remover línea 50.

- [ ] **Agregar `defer` a scripts de vendor** — `vendor.bundle.js` (726 KB) bloquea el hilo principal. Agregar `defer` en ambos layouts, fondo del `<body>`.

- [ ] **CSS render-blocking** — `theme.bundle.css` (354 KB) + `libs.bundle.css` (32 KB) bloqueando render. Extraer CSS crítico inline, diferir el resto. Correr PurgeCSS para eliminar utilidades Bootstrap no utilizadas.

- [ ] **Imagen LCP sin preload ni dimensiones** — `#welcome-image` (`intro-side-icon.webp`) no tiene `fetchpriority`, `preload` ni `width`/`height`. Agregar en `<head>`:
  ```html
  <link rel="preload" as="image" href="/src/img/labstudio/pageImages/intro-side-icon.webp" fetchpriority="high" />
  ```
  Y en `src/pages/index.astro`: agregar `width="1080" height="1080" fetchpriority="high"` al `#welcome-image`.

- [ ] **Redirects 301 para URLs muertas** — en `astro.config.mjs`:
  ```js
  redirects: {
    '/fotografia': '/fotografia-y-video',
    '/produccion-de-video': '/fotografia-y-video',
  }
  ```

- [ ] **Sitemap desactualizado e incompleto** — 4 URLs en el sitemap, 10 posts de blog sin incluir, `/fotografia` (404) listada. Instalar `@astrojs/sitemap` y agregar `site: 'https://www.labstudiomedia.com'` en `astro.config.mjs`. Eliminar `public/sitemap.xml` estático.

- [ ] **Cero keywords locales en el body** — "Los Mochis" y "Sinaloa" aparecen 0 veces en el texto visible. Agregar al menos una línea en el hero o sección de contacto.

- [ ] **Links externos sin `rel="noopener noreferrer"`** — 14 links con `target="_blank"` sin `rel`. Fix en `src/components/shared/CustomBtn.astro`: agregar `rel={blank ? "noopener noreferrer" : undefined}`.

- [ ] **Sin Política de Privacidad** — cero mención en todo el sitio. Crear página y agregar link en el footer.

---

## Prioridad Media

- [ ] `robots` meta: cambiar `"index"` → `"index, follow"` — ambos layouts, línea 23
- [ ] `online-store.png` (207 KB PNG a 75px) — convertir a WebP del tamaño correcto (`src/img/labstudio/pageImages/online-store.png`)
- [ ] Alt text de logos de clientes — los 7 logos comparten el mismo alt `"Logo de la empresa Alfer"`. Fix en `src/components/index/ClientCard.astro`
- [ ] Typed.js span sin altura reservada — causa CLS en el H2. Agregar `min-height` fijo al `<span id="for-your-text">`
- [ ] Google Maps cargando en todas las páginas eagerly — implementar lazy load via `IntersectionObserver` en `src/components/shared/Maps.astro`
- [ ] Agregar hints de preconnect para GTM y Maps API en `<head>` de `IndexLayout.astro`
- [ ] Inconsistencia www vs non-www — canonical, sitemap y robots.txt no coinciden. Estandarizar en `https://www.labstudiomedia.com`
- [ ] WhatsApp floating button sin `aria-label` — agregar `aria-label="Contactar por WhatsApp"` en `src/components/shared/WhatsApp.astro`
- [ ] Errores ortográficos en `src/pages/index.astro`: "Quitate" → "Quítate", "pagina" → "página", "linea" → "línea", "Mas" → "Más"
- [ ] Meta description sin señal geográfica ni CTA — reescribir en ambos layouts
- [ ] Agregar Twitter/X Card meta tags en ambos layouts
- [ ] Nav logo con `loading="lazy"` estando above the fold — `src/components/shared/Nav.astro`
- [ ] Agregar año de copyright en el footer
- [ ] Agregar JSON-LD `WebSite` para Sitelinks Searchbox en `IndexLayout.astro`
- [ ] Agregar JSON-LD `BreadcrumbList` en subpáginas — `SubPageLayout.astro`
- [ ] robots.txt: limpiar reglas obsoletas (`Allow: /fotografia`, `Disallow: /produccion-de-video`)

---

## Baja Prioridad

- [ ] Typo `<di>` en `src/pages/index.astro:102` — debería ser `<div>`
- [ ] Typed.js span vacío si JS está bloqueado — agregar texto fallback dentro del `<span>`
- [ ] Eliminar `intro-image-2.png` (1.3 MB, no se usa) del repositorio
- [ ] Estandarizar capitalización de marca — se usa "Labstudio", "LabStudio", "LABSTUDIO" y "labstudiomedia" indistintamente
- [ ] Agregar JSON-LD `BlogPosting` en posts del blog
- [ ] Mostrar 2–3 posts recientes del blog en la homepage
- [ ] Agregar sección "Quiénes somos" con nombres y roles del equipo (E-E-A-T)
- [ ] Agregar 2+ testimonios con nombres de clientes y resultados (E-E-A-T)
- [ ] Evaluar reemplazar librería AOS con animaciones CSS nativas (`@starting-style`) para reducir CLS

---

## Archivos clave

| Archivo | Cambios requeridos |
|---|---|
| `src/layouts/IndexLayout.astro` | Canonical dinámico, título duplicado, robots meta, og:image, OG property=, defer scripts, JSON-LD, preload hints, Twitter card |
| `src/layouts/SubPageLayout.astro` | Mismos que IndexLayout + BreadcrumbList |
| `public/robots.txt` | Remover Disallow desarrollo-web, limpiar reglas obsoletas |
| `public/sitemap.xml` | Reemplazar con @astrojs/sitemap |
| `astro.config.mjs` | site URL, redirects, @astrojs/sitemap |
| `src/pages/index.astro` | Dimensiones hero image, errores ortográficos, texto local, fallback Typed.js, typo `<di>` |
| `src/components/shared/CustomBtn.astro` | rel="noopener noreferrer" en blank links |
| `src/components/shared/WhatsApp.astro` | aria-label |
| `src/components/shared/Nav.astro` | loading="eager" en logo above fold |
| `src/components/index/ClientCard.astro` | Alt text único por logo |
