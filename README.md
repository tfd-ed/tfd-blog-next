# TFDevs Blog

The official website and blog for [tfdevs.com](https://tfdevs.com) — a technology education platform sharing programming, AI, and software development content for the Cambodian community.

Built with **Nuxt 4**, fully bilingual (Khmer & English), with interactive AI playrooms.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Nuxt 4 + Vue 3 |
| UI | @nuxt/ui v4 + Tailwind CSS |
| Content | @nuxt/content v3 (Markdown) |
| i18n | @nuxtjs/i18n (km / en) |
| Fonts | @nuxt/fonts (Google Sans) |
| Images | @nuxt/image + nuxt-og-image |
| Animation | motion-v |
| AI Runtime | onnxruntime-web (YOLO v8) |
| Sitemap | @nuxtjs/sitemap |

## Project Structure

```
app/
  pages/          # Route pages
  components/     # Vue components
  layouts/        # Layout templates
  assets/         # CSS and static images
content/
  en/             # English markdown content
  km/             # Khmer markdown content
i18n/
  locales/        # en.json / km.json translation files
public/
  images/         # Article and hero images
  models/         # ONNX model files (YOLO)
```

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/about-us` | About TFDevs |
| `/services` | Services |
| `/articles` | Article listing |
| `/articles/[slug]` | Article detail |
| `/courses` | Courses |
| `/projects` | Projects |
| `/playrooms` | AI Playrooms index |
| `/playrooms/object-detection` | YOLO real-time object detection |
| `/playrooms/document-qa` | Document Q&A |
| `/playrooms/summarization` | Text summarization |

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build for production:

```bash
pnpm build

# yarn
yarn build

# bun
bun run build
```

Preview the production build locally:

```bash
pnpm preview
```

Generate a fully static site:

```bash
pnpm generate
```

## Content

Articles and pages are written in Markdown under `content/km/` (Khmer, default) and `content/en/` (English). Add new articles in both directories with matching filenames.

YOLO model files (`.onnx`) go in `public/models/` — see [docs/YOLO_SETUP.md](docs/YOLO_SETUP.md) for export instructions.
