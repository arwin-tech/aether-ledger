<div align="center">
AetherLedger

Carbon Mapping & Predictive Air Defense

Track emissions. Predict their path. Protect your people.

Live demo

Show Image Show Image Show Image Show Image Show Image Show Image

</div>
About

Most carbon tools stop at "how much did I emit?". AetherLedger follows the emissions further and answers three connected questions:

How much? A footprint calculator estimates monthly CO₂e from transport, home energy, work and lifestyle.
Where will it go? A dispersion map forecasts how pollution plumes drift and spread over the next 24–72 hours.
Who needs protecting, and how? An advisor recommends where to deploy air-purification measures (moss walls, HEPA filtration, ionizers, green buffer zones), prioritising schools, hospitals and elderly-care sites in the plume's path.

The prototype is set in the UAE (Dubai, Abu Dhabi, Sharjah and the Jebel Ali industrial zone) and was built at BITS Tech Fest 2025 (Engenuity) in May 2025.

[!NOTE] This is a hackathon prototype running on demo data. Emissions, air-quality, wind and site figures are hand-curated sample values, and the dispersion forecast is a deterministic simulation. No live satellite or sensor feeds are connected yet; see the roadmap for the path to real data.

<!-- Screenshots: add images to docs/screenshots/ and uncomment this block <p align="center"> <img src="docs/screenshots/map.png" alt="Emission dispersion map" width="49%"> <img src="docs/screenshots/advisor.png" alt="Filter deployment advisor" width="49%"> </p> -->
Features
Module	Route	What it does
Dashboard	/dashboard	KPI cards (total emissions, carbon intensity, people protected, high-risk zones), an emissions trend chart with week / month / year views, a carbon-source breakdown, and recent-activity and alert feeds.
Carbon Calculator	/calculator	Four-tab questionnaire (transport, home energy, work, lifestyle) that returns a monthly kg CO₂e estimate with a per-category breakdown, a benchmark comparison and tailored reduction tips.
Dispersion Map	/map	Leaflet map of UAE emission hotspots with a Now / 24h / 48h / 72h forecast slider. Plumes drift with the prevailing wind, widen and dilute over time. Includes an AQI gauge, wind panel and legend.
Filter Advisor	/advisor	Ranks vulnerable sites (school, healthcare, residential, elderly care) by risk level and population affected, recommends an intervention for each, and compares filter types on PM2.5 vs CO₂ reduction.
Satellite Insights	/satellite-info	Source-attribution view: emission sources with wind vectors, dispersion corridors, a downwind no-build zone, a recommended upwind industrial zone, and siting advice for schools, hospitals and companies.
How it works
Carbon calculator

The footprint estimate is a transparent, rule-based model. The factors are illustrative values chosen for the MVP, not audited emission factors.

Category	Inputs	Factors
Transport	Vehicle type, distance driven, public-transport trips	0.20 (petrol) · 0.15 (diesel) · 0.10 (hybrid) · 0.05 (EV) kg CO₂ per km; 2 kg per public-transport trip
Home energy	Electricity, gas/heating, renewable share, occupants	0.5 kg per kWh and 2 kg per gas unit, reduced by the renewable share and split across occupants
Work	Work-from-home days, office building type	3 (LEED) to 8 (standard office) kg per day in the office
Lifestyle	Diet, shopping habits, flights	5–50 kg for diet, 5–40 kg for shopping, 500 kg per flight

The total is compared against fixed benchmark bands and paired with up to four tips triggered by the answers (for example: switch to a hybrid or EV, raise the renewable share, add a work-from-home day, eat less meat, fly less).

Dispersion forecast

Each hotspot starts with a position, a radius and an intensity score. For a forecast horizon h of 24, 48 or 72 hours, the map applies a simple advection-and-spread stand-in:

text
latitude   += 0.5 × h / 72       # drift north
longitude  += 0.8 × h / 48       # drift east (a north-easterly wind)
radius     ×= 1 + 0.5 × h / 24   # plume spreads
intensity  −= 15 × h / 24        # plume dilutes (floor of 20)

Circles are coloured by intensity: red above 70, amber above 50, green otherwise. The model is deliberately simple so the whole flow can be demoed end to end; replacing it with a physics-based model is on the roadmap.

Tech stack
Layer	Tools
Framework	React 18, TypeScript 5, Vite 6
Styling & motion	Tailwind CSS 3 with a custom palette, Framer Motion
Routing	React Router 6
Maps	Leaflet 1.9 + React-Leaflet 4 on OpenStreetMap tiles
Charts	Chart.js 4
Icons	Lucide React
Hosting	Vercel
Getting started

Prerequisites: Node.js 18+ and npm.

bash
git clone https://github.com/<your-username>/aether-ledger.git
cd aether-ledger
npm install
npm run dev

Then open http://localhost:5173. No environment variables or API keys are needed, since all demo data lives in the components.

Script	Purpose
npm run dev	Start the Vite dev server with hot reload
npm run build	Create a production build in dist/
npm run preview	Serve the production build locally
npm run lint	Run ESLint
Project structure
text
aether-ledger/
├── index.html
├── idea.txt                     # Original hackathon concept brief
├── src/
│   ├── App.tsx                  # Route definitions
│   ├── main.tsx                 # Entry point
│   ├── index.css                # Tailwind layers + shared .card / .btn / .input classes
│   ├── pages/
│   │   ├── HomePage.tsx         # Landing page
│   │   ├── DashboardPage.tsx
│   │   ├── CalculatorPage.tsx
│   │   ├── MapPage.tsx
│   │   ├── AdvisorPage.tsx
│   │   └── SatelliteInfoPage.tsx
│   └── components/
│       ├── layout/              # Header, Footer, Layout
│       ├── dashboard/           # MetricCard, EmissionsChart, AlertsPanel, RecentActivities
│       ├── calculator/          # CalculatorResults (emission model + tips)
│       ├── map/                 # EmissionMap (dispersion simulation), TimelineSlider, MapFilters, MapLegend
│       ├── advisor/             # AdvisorMap, RecommendationCard, FilterEffectiveness
│       └── satellite/           # SatelliteMap
├── tailwind.config.js
├── vite.config.ts
└── package.json
Deployment

The live site is deployed on Vercel with the default Vite preset (build command npm run build, output directory dist).

Because the app uses client-side routing, deep links such as /map can return a 404 when the page is refreshed. If that happens, add a vercel.json at the project root:

json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
Roadmap
 Live data: Sentinel-5P/TROPOMI pollutant columns via Copernicus, ground-station readings (e.g. OpenAQ) and wind forecasts (e.g. Open-Meteo)
 Physics-based dispersion: Gaussian-plume or HYSPLIT-style trajectories driven by real wind fields
 Wire up the map filter panel and the advisor's map controls
 Persist calculator results and enable report download and sharing
 Before/after view showing the effect of deployed filters on exposure
 AI agents from the original concept: Dispersion AI (exposure forecasting), Filter Bot (cost-effective interventions) and ESG Coach (reduction guidance)
 PDF summary of footprint, dispersion and recommended actions
Acknowledgements
Map tiles © OpenStreetMap contributors
Hero image from Pexels
Icons by Lucide
Built at BITS Tech Fest 2025 (Engenuity)
