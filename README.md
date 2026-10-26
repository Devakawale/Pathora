# Pathora

**Tagline:** Turning Skills Into Opportunities

A responsive React + TypeScript demo application for exploring career paths, sample labour-market signals, skill gaps, learning suggestions, employer hiring workflows, and reports.

## Requirements

- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

Create a production build with:

```bash
npm run build
npm run preview
```

## Demo workflows

- Landing page CTAs navigate to registration or login.
- Login and registration validate basic input and save a demo profile in browser local storage.
- "Continue with demo account" opens the dashboard without entering credentials.
- Dashboard navigation uses React Router.
- Labour market table supports search, role type filter, sorting, and pagination.
- Skill gap sliders update current proficiency and average score.
- Career suggestions can be saved to local storage.
- Hiring console supports candidate search, status filtering, quick profile review, and demo status updates.
- Reports can export a CSV and open the browser print dialog.
- Dashboard opportunity bookmarks can be toggled.

## Demo data and limitations

All market metrics, job listings, candidate profiles, fit scores, trends, and training suggestions are illustrative. They are not verified real-world data and are not a live labour-market feed.

Authentication is a local demo gate, not secure authentication. Data is not stored in a backend, and candidate changes are not persisted across refreshes. There are no real job posting, employer, learning-provider, notification, or market-data integrations. Do not use this demo to store real personal information.

## Central brand configuration

Edit `src/config/brand.ts` to change:
- Product name and tagline
- Logo monogram
- Theme colour values
- Navigation labels and paths
- Demo mode flag

The colour tokens are also defined in `tailwind.config.js`; most interface styles are in `src/styles.css`.

## Reference video note

This initial build is based on the written product brief because the reference recording was not available among the files exposed to the build environment. The page inventory should be checked against the recording before calling this a faithful recreation.
