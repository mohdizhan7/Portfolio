# Portfolio Revamp — Apple-style Vite + GitHub Pages

Repo: `mohdizhan7/Portfolio`  
Live: https://mohdizhan7.github.io/Portfolio/

## Status (today)
- ✅ Apple-ish UI (tinted bg, glass cards, gradient accents)
- ✅ Inter font (Google Fonts)
- ✅ Parallax hero, magnetic CTA, scroll dots
- ✅ Accent color switcher
- ✅ Dark mode (separate palette), persisted
- ✅ GitHub Pages deploy workflow stable

## Decisions
- Framework: Vite + React + TS
- Animations: framer-motion
- Hosting: GitHub Pages (branch: `gh-pages` via Actions)
- Image pathing: `import.meta.env.BASE_URL`

## Backlog / To-Dos
- [ ] Content: replace placeholder bullet points with resume highlights
- [ ] Images: convert `public/izhan.jpg` → WebP, 512–768px, <100KB
- [ ] SEO: `<title>`, meta description, canonical, OG/Twitter tags
- [ ] Favicon + PWA manifest (16/32/180/512 sizes)
- [ ] Analytics (Plausible or GA4)
- [ ] Accessibility: color contrast, focus rings, skip link
- [ ] Performance: preconnect fonts, font-display swap, lazy-load sections
- [ ] 404 page for Pages + nicer “not found”
- [ ] Custom domain (optional): add `CNAME` + DNS
- [ ] Lighthouse ≥ 90 on Performance/SEO/Best Practices/A11y
- [ ] QA: iOS Safari, Android Chrome, macOS Safari/Chrome/Edge

## How to work locally
```bash
npm install
npm run dev  # open the URL Vite prints
