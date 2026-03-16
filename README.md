# Parcel — parcelhomes.co

A clean, minimal single-page React app for Parcel — a new way to own in Santa Barbara.

## Quick Preview

Open `preview.html` directly in your browser. It loads React and Tailwind via CDN and works without any build step.

## Setup & Configuration

### 1. Add your Formspree ID

Replace `YOUR_FORMSPREE_ID` in two files:

- `src/App.jsx` (line 4) — the React app
- `preview.html` (line 24) — the standalone preview

Get a Formspree ID at [formspree.io](https://formspree.io). Create a form, and the ID is the last part of the endpoint URL (e.g., `https://formspree.io/f/xyzabcde` → `xyzabcde`).

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts. Vercel auto-detects the React app and builds it.

### Option B: GitHub + Vercel Dashboard

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push
gh repo create parcel-website --public --source=. --push

# Or manually:
git remote add origin https://github.com/YOUR_USERNAME/parcel-website.git
git push -u origin main
```

Then:

1. Go to [vercel.com](https://vercel.com)
2. Import the GitHub repo
3. Deploy (defaults work — Vercel detects Create React App)

### Connect custom domain

After deploying:

1. Go to your Vercel project → Settings → Domains
2. Add `parcelhomes.co`
3. Update DNS records as directed by Vercel

## Project Structure

```
parcel-website/
├── public/
│   └── index.html          # HTML shell with font loading
├── src/
│   ├── index.js             # React entry point
│   ├── index.css            # Tailwind + base styles
│   └── App.jsx              # Entire app (landing, buyer flow, owner panel)
├── preview.html             # Standalone preview (no build required)
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── package.json
└── README.md
```

## Design

- **Typography**: Instrument Serif (display) + DM Sans (body) via Google Fonts
- **Brand color**: Burnt orange `#E8651A`
- **Palette**: Black, white, warm neutrals
- **Mobile-first**, fully responsive
- **No images, no stock photos** — just type, whitespace, and color

## Forms

All forms submit to Formspree with an `inquiry_type` field:

| Form | `inquiry_type` | Fields |
|------|---------------|--------|
| Hero waitlist | `waitlist_quick` | email |
| Buyer flow | `homebuyer` | name, email, location, timeframe, budget |
| Homeowner | `homeowner` | name, email, property_address |
