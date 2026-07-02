# Sanity setup

## 1. Environment

Create `.env` from `.env.example` and fill:

```bash
VITE_SANITY_PROJECT_ID=yourprojectid
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2025-02-19
VITE_SANITY_USE_CDN=true
SANITY_STUDIO_PROJECT_ID=yourprojectid
SANITY_STUDIO_DATASET=production
```

Published content works without a token. In Sanity, add your local and production domains to **API > CORS origins**.

## 2. Run the portfolio

```bash
npm run dev
```

The frontend reads the `siteContent` document. If credentials or content are missing, it uses the local fallback content.

## 3. Run Sanity Studio

```bash
npm run studio
```

Open the Studio URL, create or edit the singleton document named **Site Content**, then publish it.

## 4. Editable areas

The `siteContent` document controls:

- Hero terminal text, badge, CTAs, and targets.
- About text, profile photo gallery, floating notes, bottom cards, colors, and icons.
- Professional Experience cards, periods, labels, descriptions, stack chips, colors, and metrics.
- Projects, images/gallery, accent color, title, description, stack, status, console lines, and project link.
- Technical Skills categories, colors, canvas positions, skills, and proficiency.
- Certificates, names, issuer, info, credential link, image, icon, card color, and badge.
- Contact terminal text, links, labels, values, icons, and card colors.

## 5. Icons

Use one of these icon keys in Studio:

`award`, `code`, `download`, `github`, `graduation`, `instagram`, `linkedin`, `lock`, `mail`, `shield`, `shieldCheck`, `sparkles`, `user`.
