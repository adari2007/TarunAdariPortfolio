# Tarun Adari — Portfolio Website

Personal portfolio and resume website for **Tarun Adari**, Senior Staff Software Engineer.

## Tech Stack

- Pure HTML5 / CSS3 / Vanilla JavaScript — zero dependencies, zero build step
- Google Fonts: Syne (display) + Space Mono (monospace)
- Professional dark navy + gold + steel-blue color palette

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
| 05 | Projects | 6 project cards incl. MCP Agentic Workflows & RummyScoreKeeper |
| 06 | Certifications | 6 professional certifications |
| 07 | Education | B.Tech — JNTU Kakinada |
| 08 | LinkedIn | Profile card with connect link |
| 09 | Blog | 6 article cards |
| 10 | Contact | Form with mailto handler |

## Opening in IntelliJ IDEA

1. **File → Open** → select the `tarun-adari-portfolio/` folder
2. IntelliJ will detect the `.idea/` folder and load the project automatically
3. Right-click `src/index.html` → **Open In → Browser** (or use the browser toolbar that appears top-right)
4. Alternatively, use IntelliJ's built-in **Live Preview** (View → Tool Windows → Live Preview)

## Running a Local Dev Server

No build step required. You can serve it with any static server:

```bash
# Python 3
cd src && python3 -m http.server 3000

# Node.js (npx)
cd src && npx serve .

# VS Code / IntelliJ Live Server plugin
# Right-click index.html → Open with Live Server
```

Then open: http://localhost:3000

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

### Colors (css/styles.css → :root)
| Variable | Value | Usage |
|----------|-------|-------|
| `--neon` | `#c9a84c` | Gold accent — labels, borders, highlights |
| `--neon2` | `#5b9bd5` | Steel blue — roles, AI tags |
| `--bg` | `#0b0f17` | Deepest background |
| `--card` | `#111827` | Card surfaces |
| `--text` | `#edf2f7` | Primary text |
| `--muted` | `#8a9bb8` | Secondary text |

### Adding a Blog Post
Copy a `.blog-card` div in `index.html` and update the tag, title, excerpt, and date.

### Adding a Project
Copy a `.project-card` div and update the number, title, company, description, and tags.

## Contact

- **Email:** adari.tarun@gmail.com
- **Phone:** 610-427-1437
- **LinkedIn:** linkedin.com/in/tarunadari
- **Location:** Plano, TX, USA
