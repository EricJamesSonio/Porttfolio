# Eric James Sonio — Portfolio (Astro)

## Project Structure

```
portfolio-astro/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions (auto-deploys on push to main)
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   └── eric.jpg        ← copy your photo here
│   │   └── videos/
│   │       └── *.mp4           ← copy all your videos here
│   └── scripts/
│       └── main.js
├── src/
│   ├── components/
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── TechStack.astro
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       ├── base.css
│       ├── navbar.css
│       ├── hero.css
│       ├── about.css
│       ├── tech.css
│       ├── projects.css        ← includes video lazy loading states
│       ├── contact.css
│       ├── footer.css
│       └── responsive.css
├── astro.config.mjs
└── package.json
```

## Setup Steps

### 1. Copy your assets
```
public/assets/images/eric.jpg
public/Porttfolio/assets/videos/starbucks.mp4
public/Porttfolio/assets/videos/chatly.mp4
... (all your videos)
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run locally
```bash
npm run dev
# → http://localhost:4321
```

### 4. Deploy to GitHub Pages

In your GitHub repo settings:
- Go to **Settings → Pages**
- Set source to **GitHub Actions**

Then push to `main` — the workflow in `.github/workflows/deploy.yml` handles the rest automatically.

> If your repo is at `github.com/username/repo-name` (not a custom domain),
> update `astro.config.mjs` and set `base: '/repo-name'`

## What changed from the plain HTML version
- Zero behavior changes — same CSS, same JS, same design
- HTML split into reusable `.astro` components
- Videos use `data-src` lazy loading (already in the HTML via Projects.astro)
- Astro handles asset fingerprinting and build optimization automatically
