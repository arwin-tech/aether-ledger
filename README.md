# AetherLedger

**Track emissions. Predict their path. Protect your people.**

AetherLedger is a web app that calculates your carbon footprint, shows how pollution could spread across the UAE over the next few days, and suggests where to place air purifiers to protect schools, hospitals and other vulnerable places. It was built at BITS Tech Fest 2025 (Engenuity).

**Live demo:** [aether-ledger.vercel.app](https://aether-ledger.vercel.app)

> [!NOTE]
> This is a hackathon prototype. It uses sample data, and the pollution forecast is simulated.

## Features

- **Dashboard:** emissions stats, trends and alerts at a glance
- **Carbon Calculator:** estimate your monthly CO₂ from travel, home energy, work and lifestyle, and get tips to reduce it
- **Dispersion Map:** see how pollution from Dubai, Abu Dhabi, Sharjah and Jebel Ali could spread over 24, 48 and 72 hours
- **Filter Advisor:** see suggested spots for air purifiers near schools, hospitals, homes and elderly care, and compare which filters work best
- **Satellite Insights:** pollution sources, wind paths, and advice on where to build and where not to

## Tech Stack

React · TypeScript · Vite · Tailwind CSS · Leaflet · Chart.js · Framer Motion · Vercel

## Run Locally

You need Node.js 18 or newer.

```bash
git clone https://github.com/<your-username>/aether-ledger.git
cd aether-ledger
npm install
npm run dev
```

Then open http://localhost:5173.

## Future Plans

- Connect real satellite, air-quality and wind data
- Replace the simulated forecast with a proper dispersion model
- Add AI assistants for forecasting and filter recommendations
