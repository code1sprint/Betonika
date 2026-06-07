# Betonika (BETONIKA)

Official website for Betonika Concrete Factory — a full-stack web application featuring a Persian (RTL) user interface, technical estimation tools, a quotation request system, and an AI-powered engineering consultant.

**[Live Demo](https://code1sprint.github.io/Betonika/)**

---

## Overview

Betonika is an industrial digital platform for showcasing concrete products, calculating construction materials online, submitting quotation requests, and providing technical consulting to civil engineers and contractors. The UI follows a modern industrial aesthetic (Industrial Minimalism) and delivers a professional experience for technical audiences.

---

## Screenshots

### Home Page — Hero and Product Showcase

![Betonika Home Page](src/assets/images/Betonika1.png)

Landing page with an industrial factory background, production line introduction, five product cards (ready-mix concrete, prestressed joists, foam concrete blocks, concrete curbs, hollow-core slabs), and a key company statistics bar.

### Products Page — Technical Catalog

![Betonika Products Page](src/assets/images/Betonika2.png)

Detailed product view including descriptions, factory base pricing, technical advantages, specification tables, and action buttons (estimate quantity / request invoice).

### Smart Material Estimation System

![Material Calculator](src/assets/images/Betonika3.png)

Interactive tool for estimating foundation concrete, joist-foam roof, and wall block volumes with dimension sliders, concrete grade selection, dead load estimates, mixer truck counts, and approximate costs — with direct transfer to the quotation form.

### Laboratory Simulator and Quality Assurance

![Compressive Strength Simulator](src/assets/images/Betonika4.png)

Engineering quality assurance section and an interactive concrete compressive strength test simulator (ASTM C39 / ISIRI 3206) with concrete grade selection, curing period, and stress calculation.

---

## Key Features

| Section | Description |
|---------|-------------|
| **Home** | Parallax hero, product cards, company stats, scroll progress bar |
| **Products** | Catalog of 5 products with technical specs, pricing, and production features |
| **AI Consultant** | Gemini-powered chatbot for civil engineering questions |
| **Material Calculator** | Concrete, joist, and block estimation with engineering formulas and live pricing |
| **Quotation Portal** | Quote request submission, status tracking, and calculator integration |
| **Projects** | Gallery of completed and ongoing projects |
| **About / Contact** | Company profile, contact form, and contact information |
| **Interactive Tools** | Batching workflow, lab simulator, technical FAQ |
| **Quick Guide** | Slide-out drawer with contact info and standards |

---

## Tech Stack

### Frontend
- **React 19** — Component-based UI
- **TypeScript** — Type-safe development
- **Vite 6** — Fast build and dev server
- **Tailwind CSS 4** — Utility-first styling
- **Motion** — Animations and transitions
- **Lucide React** — Icons

### Backend
- **Express.js** — Node.js server
- **Google Gemini API** (`@google/genai`) — AI engineering consultant
- **esbuild** — Server bundling for production

### Deployment
- **GitHub Actions** — Automated CI/CD
- **GitHub Pages** — Static frontend hosting

---

## Project Structure

```
Betonika/
├── .github/workflows/
│   └── deploy-pages.yml      # Automated GitHub Pages deployment
├── src/
│   ├── assets/images/        # Product images and screenshots
│   ├── components/
│   │   ├── AiConsultant.tsx          # AI engineering consultant
│   │   ├── MaterialCalculator.tsx    # Material estimator
│   │   ├── QuotationPortal.tsx       # Quotation portal
│   │   ├── HeroInteractiveCockpit.tsx
│   │   └── HomeExtraSections.tsx     # Workflow, lab, FAQ
│   ├── App.tsx               # Main layout and tab navigation
│   ├── data.ts               # Products, projects, and stats data
│   ├── types.ts              # TypeScript types
│   ├── main.tsx
│   └── index.css
├── server.ts                 # Express server + API + Vite middleware
├── vite.config.ts
├── package.json
└── .env.example
```

---

## Local Setup

### Prerequisites

- Node.js 20 or higher
- npm

### Install and Run

```bash
# Clone the repository
git clone https://github.com/code1sprint/Betonika.git
cd Betonika

# Install dependencies
npm install

# Copy environment file and set API key
cp .env.example .env
# Set GEMINI_API_KEY in the .env file

# Start development server (frontend + backend on port 3000)
npm run dev
```

Then open your browser at [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Vite HMR |
| `npm run build` | Production build (frontend + server) |
| `npm run build:pages` | Static build for GitHub Pages |
| `npm run start` | Run production server |
| `npm run lint` | Type-check with TypeScript |

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No* | Google Gemini API key for the AI consultant |
| `APP_URL` | No | Application host URL |
| `NODE_ENV` | No | Set to `production` in production mode |
| `VITE_BASE_PATH` | No | Base path for GitHub Pages (default: `/Betonika/`) |

> \* Without `GEMINI_API_KEY`, the AI consultant falls back to predefined responses.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/chat` | Send message to Gemini consultant |
| `POST` | `/api/quote` | Submit quotation request |
| `GET` | `/api/quotes` | List quotation requests |
| `POST` | `/api/contact` | Submit contact form |

---

## Deployment

### GitHub Pages (Static Frontend)

On every push to the `main` branch, the workflow automatically:

1. Runs `npm ci`
2. Runs `npm run build:pages` (with `VITE_BASE_PATH=/Betonika/`)
3. Uploads `dist/` to GitHub Pages

**Demo URL:** [https://code1sprint.github.io/Betonika/](https://code1sprint.github.io/Betonika/)

> Note: The GitHub Pages deployment serves only the static frontend. Backend APIs (AI chat, quotation submission) are not available unless a separate server is deployed.

### Full Production (Frontend + Backend)

```bash
npm run build
NODE_ENV=production npm run start
```

---

## Supported Products

1. **Ready-Mix Concrete** — Grades C20 to C50, cement content 300 to 500 kg/m3
2. **Prestressed Joists** — Spans up to 12 meters, PC wires
3. **Foam Concrete Blocks** — Thermal and acoustic insulation, lightweight
4. **Concrete Curbs** — Vibration-pressed, freeze-thaw resistant
5. **Hollow-Core Slabs** — Industrial precast floor panels

---

## License

This project is licensed under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).

---

<p align="center">
  <sub>Made with precision for Iranian Civil Engineers</sub>
</p>
