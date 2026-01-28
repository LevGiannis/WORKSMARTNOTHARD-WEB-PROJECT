# Project Map — τι κάνει κάθε αρχείο/φάκελος

Σύντομος οδηγός για το τι υπάρχει μέσα στο project (React + TypeScript + Vite).

> Σημείωση: Κάποια folders είναι *generated* (π.χ. `dist/`, `portable/`, `node_modules/`) και δεν είναι “πηγαίος κώδικας”.

## Root

- `.gitignore` — ignore rules (π.χ. `dist/`, `portable/`, `dist-electron/`, `node_modules/`).
- `index.html` — Vite entry HTML (mount point για το React app).
- `package.json` — npm scripts και dependencies.
  - `dev` → local dev server
  - `build` → production web build (`dist/`)
  - `build:portable` → portable build (`portable/`) + postbuild patch για `file://`
- `package-lock.json` — pinned dependency tree για reproducible installs.
- `tsconfig.json` — TypeScript compiler settings.
- `vite.config.ts` — Vite config (κυρίως `base` για GitHub Pages vs `./` για portable).
- `tailwind.config.cjs` — Tailwind configuration.
- `postcss.config.cjs` — PostCSS pipeline (Tailwind + autoprefixer).

### Τεκμηρίωση / Δεδομένα

- `README.md` — οδηγίες χρήσης (dev/build/portable), backup/import, troubleshooting.
- `AUDIT_REPORT.md` — συνοπτική “audit” αναφορά/τεχνικές σημειώσεις.
- `PROJECT_MAP.md` — αυτό το αρχείο (περιγραφή δομής).
- `demo.json` — demo **importable** backup (format `worksmart-backup` v1) για εισαγωγή από Προφίλ.

## CI / GitHub Actions

- `.github/workflows/deploy-pages.yml` — build & deploy σε GitHub Pages (τρέχει στο `main`).
- `.github/workflows/build-portable.yml` — build portable folder και zip artifact (τρέχει στο `main`).

## Scripts

- `scripts/portable-postbuild.mjs` — postbuild βήμα για portable output (π.χ. patch στο `portable/index.html` ώστε να δουλεύει σωστά σε `file://`).

## Public assets

- `public/404.html` — fallback page (χρήσιμο για Pages/file routing).
- `public/sw.js` — service worker entry (το app αποφεύγει SW registration σε `file://`).
- `public/*.svg` — icons/illustrations (favicon, hero svgs, brand mark).
- `public/.nojekyll` — GitHub Pages helper (απενεργοποιεί Jekyll processing).

## Source code (`src/`)

### Entry points

- `src/main.tsx` — bootstraps React, επιλέγει `BrowserRouter` για web και `HashRouter` για `file://`/portable.
- `src/App.tsx` — κύρια routes/layout του app.
- `src/index.css` — global styles (Tailwind + custom CSS, includes cross-platform fixes όπως για `select/option`).

### Pages (`src/pages/`)

- `AddEntryPage.tsx` — φόρμα καταχώρησης νέας γραμμής/entry.
- `AddGoalPage.tsx` — φόρμα στόχου μήνα/κατηγορίας.
- `HistoryPage.tsx` — ιστορικό καταχωρήσεων.
- `MainPage.tsx` — κεντρική σελίδα/overview.
- `PendingPage.tsx` — δημιουργία/επεξεργασία μίας εκκρεμότητας.
- `PendingsPage.tsx` — λίστα εκκρεμοτήτων.
- `ProfilePage.tsx` — προφίλ + export/import backup + storage tools.
- `StatsPage.tsx` — στατιστικά/φίλτρα (ημέρα/μήνας/περίοδος) και KPIs.
- `TasksPage.tsx` — λίστα εργασιών (to‑do).

### UI components (`src/components/`)

- `Button.tsx` — κουμπί με κοινό styling.
- `Card.tsx` — card container.
- `DarkToggle.tsx` — toggle dark theme.
- `EmptyState.tsx` — empty state component.
- `Input.tsx` — input wrapper με κοινό styling.
- `Modal.tsx` — modal dialog.
- `PageHeader.tsx` — page title/subtitle/breadcrumb.
- `Table.tsx` — simple table wrapper.

### Hooks (`src/hooks/`)

- `useProgress.ts` — helper hook για progress/στόχους (όπου χρησιμοποιείται).

### Services (`src/services/`)

- `storage.ts` — storage layer:
  - primary `localStorage`
  - fallback σε in‑memory store (αν `localStorage` μπλοκάρεται)
  - export/import backup (`worksmart-backup` v1)

### Utils (`src/utils/`)

- `exportExcel.ts` — export δεδομένων σε Excel (`xlsx`).
- `notifications.ts` — notifications/service worker registration rules.
- `safeLocalStorage.ts` — helpers για ασφαλή πρόσβαση στο `localStorage`.

## Build outputs (generated)

- `dist/` — output του `npm run build` (web). Generated/ignored by git.
- `portable/` — output του `npm run build:portable` (portable). Generated/ignored by git.
- `node_modules/` — installed dependencies. Generated/ignored by git.

## Legacy / ειδικές περιπτώσεις

- `dist-electron/` — παλιό/legacy output (Electron main/preload JS). Δεν υπάρχει αυτή τη στιγμή npm script που να το χρησιμοποιεί· αν δεν το θες, μπορεί να αφαιρεθεί.
