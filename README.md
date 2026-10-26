# Pathora
**Turning Skills Into Opportunities**

Pathora is a React + TypeScript + Vite web application. This repository currently includes a frontend, demo data, and Supabase authentication client integration.

## Tech stack
- React 18, TypeScript, Vite
- React Router, Tailwind CSS
- Lucide React, Recharts
- Supabase Auth (`@supabase/supabase-js`)
- Vercel hosting and GitHub source control

## Requirements
- Node.js (current LTS recommended)
- npm
- A Supabase project for authentication

## Run locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Devakawale/Pathora.git
   cd Pathora
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env.local` in the project root:
   ```dotenv
   VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
   ```
   Replace placeholders with your own Supabase values. Never commit `.env.local`.
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the local URL printed by Vite.

## Build
```bash
npm run build
npm run preview
```
Vite outputs the production build to `dist/`.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | Yes | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | Supabase browser publishable/anon key |

Important: Vite variables prefixed with `VITE_` are included in client-side code. Never put a Supabase `service_role` key, database password, or server secret in a `VITE_` variable.

## Supabase production setup
1. In Supabase, open **Authentication → URL Configuration**.
2. Set Site URL to your deployed website URL.
3. Add your production URL to Redirect URLs, for example `https://YOUR-VERCEL-DOMAIN.vercel.app/**`.
4. Keep your local development URL in Redirect URLs if needed.
5. Configure email confirmation and password reset settings as required.

## Deploy to Vercel
1. Import `Devakawale/Pathora` from GitHub.
2. Select the Vite preset and repository root.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel Environment Variables for Production (and Preview/Development if required).
4. Deploy, then configure Supabase URL settings for the production domain.
5. Test signup, confirmation, login, logout and password reset.

## Repository layout
```text
src/
  components/   Reusable UI components
  config/       Brand configuration
  data/         Demo/sample data
  lib/          Supabase client
  pages/        Application pages
  App.tsx
  main.tsx
  styles.css
docs/
  TECHNICAL_DESIGN.md
  TEST_CASES.md
  sample-data.json
```

See `docs/TEST_CASES.md` for manual tests and `docs/sample-data.json` for illustrative fixtures. These are not automated tests.

## License
This repository includes the MIT License. See `LICENSE`.
