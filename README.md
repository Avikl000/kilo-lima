# Kilo Lima

Minimal [Eleventy](https://www.11ty.dev/) test site managed with [Pages CMS](https://pagescms.org) and deployed on [Vercel](https://vercel.com) at [kilo-lima.xyz](https://kilo-lima.xyz).

- Content lives in `content/` (homepage `content/index.njk`, posts in `content/posts/`)
- `.pages.yml` defines what Pages CMS can edit
- Vercel builds with `npm run build` (Eleventy → `_site/`)

## Local development

```
npm install
npm run dev
```
