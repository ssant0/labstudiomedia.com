# SEO Todo — LabStudio Media
Auditoría generada el 2026-04-08. Score inicial: **42 / 100**

---

## Sprint 1 — Esta semana (Rastreabilidad + Confianza básica)

### 1. Canonical dinámico
- [x] `src/layouts/IndexLayout.astro` — reemplazar `href="https://labstudiomedia.com"` con `href={`https://labstudiomedia.com${Astro.url.pathname}`}`
- [x] `src/layouts/SubPageLayout.astro` — mismo cambio

### 2. Arreglar `robots.txt`
- [x] Eliminar `Disallow: /desarrollo-web`
- [x] Eliminar `Disallow: /fotografia` (página fantasma, no existe en `src/pages/`)
- [x] Eliminar `Disallow: /produccion-de-video` (página fantasma)
- [x] Cambiar dominio de `www.labstudiomedia.com` → `labstudiomedia.com` en la línea `Sitemap:`

### 3. Arreglar Open Graph en `IndexLayout.astro`
- [x] Cambiar `name="og:title"` → `property="og:title"`
- [x] Cambiar `name="og:description"` → `property="og:description"`
- [x] Cambiar `content="/pageView.webp"` → `content="https://labstudiomedia.com/pageView.webp"` (URL absoluta)

### 4. Eliminar `<title>` duplicado
- [x] `src/layouts/IndexLayout.astro` — eliminar el `<title>` duplicado (línea ~51, dejar solo el de la línea ~26)
- [x] `src/layouts/SubPageLayout.astro` — mismo cambio

### 5. Regenerar `public/sitemap.xml`
- [x] Cambiar todos los dominios de `www.labstudiomedia.com` → `labstudiomedia.com`
- [x] Eliminar URL fantasma `/fotografia`
- [x] Agregar `/tarjetas-nfc`
- [x] Agregar los 10 blog posts faltantes:
  - [x] `/blog/10-motivos-por-los-cuales-una-pagina-web-es-importante-para-un-negocio`
  - [x] `/blog/como-incorporar-imagenes-con-drones-en-estrategias-de-marketing-digital`
  - [x] `/blog/drones-para-fotografia-de-eventos-capturando-momentos-unicos-desde-nuevas-perspectivas`
  - [x] `/blog/elige-el-dron-perfecto-para-tus-proyectos`
  - [x] `/blog/innovaciones-en-tecnologia-de-drones-lo-ultimo-en-camaras-y-estabilizacion-para-video-y-fotografia`
  - [x] `/blog/la-importancia-de-la-fotografia-profesional-para-tu-negocio`
  - [x] `/blog/la-importancia-del-diseno-responsivo-en-la-era-movil`
  - [x] `/blog/post-produccion-en-fotografia-de-productos-retoca-como-un-profesional`
  - [x] `/blog/tendencias-de-diseno-web-en-2024-lo-que-necesitas-saber`
  - [x] `/blog/10-errores-comunes-de-diseno-web-y-como-evitarlos`
- [x] Eliminar `<changefreq>` y `<priority>` de todas las entradas (Google los ignora)
- [x] Actualizar `<lastmod>` a fecha actual

---

## Sprint 2 — Próximas 2 semanas (Schema + Identidad)

### 6. Agregar JSON-LD `Organization` + `WebSite` al homepage
- [x] Insertar en `src/layouts/IndexLayout.astro` dentro de `<head>`:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": "https://labstudiomedia.com/#business",
  "name": "LabStudio Media",
  "url": "https://labstudiomedia.com",
  "logo": "https://labstudiomedia.com/favicon/144x144.png",
  "image": "https://labstudiomedia.com/pageView.webp",
  "description": "Agencia de marketing digital en Los Mochis, Sinaloa. Servicios de fotografía, producción de video, desarrollo web y tarjetas NFC.",
  "telephone": "+526681057964",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Los Mochis",
    "addressRegion": "Sinaloa",
    "addressCountry": "MX"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.8055853,
    "longitude": -108.9964254
  },
  "sameAs": [
    "https://www.instagram.com/labstudiomedia/",
    "https://www.facebook.com/labstudiomedia/",
    "https://www.tiktok.com/@labstudiomedia",
    "https://www.linkedin.com/company/labstudiomedia/",
    "https://www.youtube.com/@labstudiomedia"
  ],
  "priceRange": "$$",
  "areaServed": { "@type": "State", "name": "Sinaloa" },
  "inLanguage": "es-MX"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://labstudiomedia.com/#website",
  "url": "https://labstudiomedia.com",
  "name": "LABSTUDIO | Marketing Digital",
  "description": "Agencia de marketing digital, desarrollo web y tarjetas NFC en Los Mochis, Sinaloa.",
  "inLanguage": "es-MX",
  "publisher": { "@id": "https://labstudiomedia.com/#business" }
}
</script>
```

### 7. Agregar `BlogPosting` schema dinámico
- [x] En `src/components/blog/BlogEntry.astro` — agregar prop `schema` o slot de head en `SubPageLayout` para inyectar JSON-LD por post
- [x] Convertir fecha de string español (ej. "Mayo 29, 2024") a ISO 8601 antes de usarla en el schema

### 8. Crear página `/sobre-nosotros`
- [ ] Nueva ruta: `src/pages/sobre-nosotros.astro`
- [ ] Contenido mínimo: historia de la agencia, nombres y roles del equipo, años en operación, ciudad/estado en el cuerpo del texto (no solo en meta)
- [ ] Agregar al Nav y Footer
- [ ] Agregar al sitemap

### 9. Crear página `/aviso-de-privacidad`
- [x] Nueva ruta: `src/pages/aviso-de-privacidad.astro`
- [x] Requerido por la LFPDPPP (ley mexicana de protección de datos)
- [x] Agregar enlace en el Footer
- [x] Agregar al sitemap (auto-generado por @astrojs/sitemap)

### 10. Corregir imagen hero — usar `<Image>` de `astro:assets`
- [x] `src/pages/index.astro:43-49` — reemplazar `<img>` con `<Image>` desde `astro:assets`
- [x] Agregar `loading="eager"` y `fetchpriority="high"` al componente `<Image>` del hero
- [x] Verificar `width` y `height` explícitos para prevenir CLS
- [x] `src/pages/index.astro:90,103,115` — corregir `<img>` de tarjetas de servicios con `<Image>`

---

## Sprint 3 — Este mes (Contenido + Performance)

### 11. Expandir `desarrollo-web.astro` a 800+ palabras
- [ ] Agregar sección del proceso de desarrollo (pasos)
- [ ] Mencionar tecnologías en el cuerpo del texto: Angular, TypeScript, Astro, Go, Node.js
- [ ] Agregar "Los Mochis, Sinaloa" en texto visible (no solo en meta keywords)
- [ ] Agregar al menos un resultado real de cliente (puede ser anónimo)

### 12. Agregar secciones FAQ en páginas de servicio
- [ ] `src/pages/desarrollo-web.astro` — 5 a 7 preguntas frecuentes
- [ ] `src/pages/tarjetas-nfc.astro` — 5 a 7 preguntas frecuentes (incluir precio, tiempo de entrega, cobertura)
- [ ] Agregar schema `FAQPage` JSON-LD en cada página

### 13. Arreglar performance de fuentes
- [ ] `public/styles/theme.bundle.css` — agregar `font-display: swap` en la declaración `@font-face`
- [ ] Eliminar archivos `.otf` y `.woff` de `public/fonts/HKGroteskPro/` — servir solo `.woff2`
- [ ] Reducir a 2-3 pesos de fuente (Regular, Bold, opcional Medium)

### 14. Optimizar carga de JS
- [x] Auditar `public/js/vendor.bundle.js` (726 KB) — agregar `defer` a ambos scripts
- [x] Revisar si `theme.bundle.js` puede cargarse con `defer` también

### 15. Arreglar alt text de imágenes en blog
- [ ] `src/components/blog/BlogEntry.astro:39` — reemplazar `alt="linea"` con texto descriptivo dinámico basado en el título del post o contenido

### 16. Agregar geo-términos locales en páginas de servicio
- [ ] `src/pages/desarrollo-web.astro` — agregar "Los Mochis, Sinaloa" en párrafo visible
- [ ] `src/pages/tarjetas-nfc.astro` — mismo cambio

### 17. Convertir logos de clientes a testimonios
- [ ] `src/pages/index.astro:302-313` — agregar nombre, industria y resultado para 2-3 clientes
- [ ] Considerar crear página `/casos-de-exito` con 2-3 casos estructurados

---

## Backlog (cuando haya tiempo)

- [ ] Agregar `hreflang="es-MX"` en ambos layouts
- [ ] Corregir orden de columnas hero en mobile — H1 debe aparecer antes que la imagen (`order-1` en columna de texto)
- [x] Agregar `@astrojs/sitemap` a `astro.config.mjs` con `site: 'https://labstudiomedia.com'` y `exclude: ['/links']` para auto-generación
- [ ] Agregar schema `BreadcrumbList` en subpáginas
- [ ] Agregar schema `Service` en `/desarrollo-web` y `/tarjetas-nfc`
- [ ] Configurar headers de seguridad en el hosting (`X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy`)
- [ ] Corregir tamaño del logo en navbar — servir a ~300px en vez de 3229px
- [ ] Corregir typo: "por que" → "porque" en `src/pages/index.astro:62`
- [ ] Reducir meta keywords de 25+ términos a 8-10 enfocados
- [ ] Envolver fechas de posts en `<time datetime="YYYY-MM-DD">`

---

## Publicación de blog (Continuo)

- [ ] Meta: mínimo 2 posts por mes
- [ ] Priorizar queries con intención local:
  - "agencia de marketing digital Los Mochis"
  - "desarrollo web para negocios en Sinaloa"
  - "tarjetas NFC para negocios México"
  - "fotografía profesional Los Mochis"
- [ ] Expandir posts existentes a 1,500+ palabras (actualmente todos tienen <600)

---

## Score objetivo por sprint

| Sprint | Acción principal | Score estimado |
|--------|-----------------|---------------|
| Inicial | — | 42 / 100 |
| Sprint 1 | Canonical, robots, OG, sitemap | ~55 / 100 |
| Sprint 2 | Schema, About, imágenes | ~68 / 100 |
| Sprint 3 | Contenido, performance, FAQ | ~78 / 100 |
| Backlog completo | Todo lo anterior | ~85 / 100 |
