# Tarun Adari — Portfolio Website

Personal portfolio and resume website for **Tarun Adari**, Senior Staff Software Engineer.

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript front end — no build step
- Node.js + Express server (`server.js`) for the **"Ask My AI"** chat widget (Anthropic Claude) and the contact-form email endpoint
- Google Fonts: Syne (display) · Space Mono (monospace) · Cormorant Garamond (name/headings)
- Warm premium **light + dark** theme (gold accent, steel-blue secondary), toggled in the nav and remembered via `localStorage`

## Features

- **Light/dark theme toggle** — respects `prefers-color-scheme`, persists choice, no flash on load
- **AI chat widget** — ask questions about Tarun's background; answered by Claude via `/api/chat`
- **Rotating hero tagline** — smooth fade/slide between phrases (no layout jank); honors reduced-motion
- **Animated count-up stats** on scroll into view
- **Working contact form** — posts to `/api/contact` (Resend email); gracefully falls back to a `mailto:` link if email isn't configured
- **SEO + social** — meta description, Open Graph + Twitter cards, `og-image.png`, SVG favicon, apple-touch-icon
- **Accessibility** — labelled form fields, `prefers-reduced-motion` support

## Project Structure

```
tarun-adari-portfolio/
├── .idea/                          ← IntelliJ IDEA project files
│   ├── modules.xml
│   ├── tarun-adari-portfolio.iml
│   ├── misc.xml
│   ├── vcs.xml
│   └── workspace.xml
├── src/
│   ├── index.html                  ← Main HTML (all sections)
│   ├── css/
│   │   └── styles.css              ← All styles (design tokens, layout, components)
│   └── js/
│       └── main.js                 ← Interactivity (nav highlight, scroll reveal, typed effect, form, back-to-top)
├── public/                         ← Static assets for deployment (copy src/ here)
├── docs/                           ← Resume PDFs, additional docs
├── .gitignore
└── README.md
```

## Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | Hero | Name, title, 4 key stats, CTA buttons |
| 02 | About | Bio, contact card (email, phone, LinkedIn, location) |
| 03 | Skills | 9 skill categories — AI/MCP/Agents highlighted |
| 04 | Experience | Full 14-year timeline (8 companies) |
| 05 | Projects | 6 project cards incl. MCP Agentic Workflows & FedEx ePRS |
| 06 | Certifications | 5 earned + 3 "Currently Pursuing" (clearly labelled) |
| 07 | Education | B.Tech — JNTU Kakinada |
| 08 | Blog | 6 article cards |
| 09 | Connect | LinkedIn card + working contact form |

## Opening in IntelliJ IDEA

1. **File → Open** → select the `tarun-adari-portfolio/` folder
2. IntelliJ will detect the `.idea/` folder and load the project automatically
3. Right-click `src/index.html` → **Open In → Browser** (or use the browser toolbar that appears top-right)
4. Alternatively, use IntelliJ's built-in **Live Preview** (View → Tool Windows → Live Preview)

## Running Locally

The site is served by the Express app so the AI chat and contact endpoints work:

```bash
npm install
cp .env.example .env      # then add your ANTHROPIC_API_KEY
npm start                 # → http://localhost:3000 (PORT in .env)
```

> Front-end only? You can still serve `src/` with any static server (`cd src && python3 -m http.server 3000`),
> but the **Ask My AI** widget and the contact form's email path need the Node server running.

## Configuration (.env)

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | ✅ | Powers the "Ask My AI" chat widget |
| `PORT` | — | Server port (default 3000) |
| `RESEND_API_KEY` | — | Enables contact-form email via [Resend](https://resend.com). If unset, the form falls back to `mailto:` |
| `CONTACT_TO` | — | Inbox that receives form submissions (default `adari.tarun@gmail.com`) |
| `CONTACT_FROM` | — | Verified Resend sender (use `onboarding@resend.dev` for testing) |

## Before You Publish ✅

1. **Replace `src/resume.pdf`** — currently a placeholder; drop in your real résumé (the hero "↓ Résumé" button links to it).
2. **Set your real domain** — update the `og:url`, `og:image`, `twitter:image`, and `<link rel="canonical">` URLs in `index.html` (they use `https://tarunadari.dev/`). Social link previews need absolute URLs on your live domain.
3. *(Optional)* **Regenerate `og-image.png`** if you change the hero text — edit `src/og-image.svg` and re-export to PNG (1200×630).
4. *(Optional)* **Enable contact emails** — add `RESEND_API_KEY` + a verified `CONTACT_FROM`.

## Deploying

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/tarunadari/portfolio.git
git push -u origin main
# Enable GitHub Pages → Settings → Pages → Source: main / src folder
```

### Netlify / Vercel
- Drag and drop the `src/` folder onto netlify.com/drop
- Or connect your GitHub repo — set **publish directory** to `src`

### Custom Domain
Update the `<title>` and any absolute URLs in `index.html`, then point your domain's DNS to your host.

## Customization

### Colors (css/styles.css → `:root` for light, `[data-theme="dark"]` for dark)
| Variable | Light | Usage |
|----------|-------|-------|
| `--neon` | `#b8860b` | Gold accent — labels, borders, highlights |
| `--neon2` | `#4a7fa5` | Steel blue — roles, AI tags |
| `--bg` | `#f0ece3` | Page background |
| `--card` | `#f7f4ed` | Card surfaces |
| `--text` | `#1a1a18` | Primary text |
| `--muted` | `#6b6b63` | Secondary text |

Dark-mode equivalents live in the `[data-theme="dark"]` block just below `:root`.

### Adding a Blog Post
Copy a `.blog-card` div in `index.html` and update the tag, title, excerpt, and date.

### Adding a Project
Copy a `.project-card` div and update the number, title, company, description, and tags.

## Contact

- **Email:** adari.tarun@gmail.com
- **Phone:** 610-427-1437
- **LinkedIn:** linkedin.com/in/tarun-adari
- **Location:** Plano, TX, USA
