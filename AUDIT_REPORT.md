# Audit Report — WorkSmartNotHard (Web + Portable)

Date: 2026-01-28
Branch: `main`

## Executive Summary

- Το project είναι λειτουργικό ως **Web SPA (Vite/React)** και ως **Portable offline** build (double‑click `portable/index.html`).
- Τα builds που ισχύουν στο repo: `npm run build` (web) και `npm run build:portable` (portable).
- Κύρια “τριβή” σε portable διανομή: σε ορισμένα περιβάλλοντα, το browser storage σε `file://` μπορεί να καθαρίζεται/μπλοκάρεται.

## Project Overview

### Stack
- UI: React 18 + TypeScript
- Bundler: Vite 5
- Styling: Tailwind 3 + PostCSS + Autoprefixer
- Routing: `react-router-dom` (BrowserRouter για web, HashRouter για `file://`)

### Repo Structure (high level)
- `src/`: React app
- `dist/`: build output (web)
- `portable/`: build output (portable)
- `.github/workflows/`: CI for GitHub Pages + Portable builds

## Build & CI Validation

### Local builds
- `npm run build` ✅ (web)
- `npm run build:portable` ✅ (portable)

Notes:
- Το terminal μπορεί να αναφέρει “vite: command not found” όταν λείπουν dependencies. Με `npm ci` αποκαθίσταται.

### Dependency security (npm audit)

Πρακτική πρόταση:

- Μην τρέξεις άκριτα `npm audit fix --force` στο ίδιο branch.
- Κάν’ το σε ξεχωριστό branch και επιβεβαίωσε `npm run build` και `npm run build:portable`.

### GitHub Actions workflows
- `/.github/workflows/deploy-pages.yml`
  - Trigger: `push` στο `main` + `workflow_dispatch`
  - Deploy: GitHub Pages
- `/.github/workflows/build-portable.yml`
  - Trigger: `push` στο `main` + `workflow_dispatch`
  - Artifact: `WorkSmartNotHard-portable.zip`

Operational note:
- Για να εμφανίζεται/τρέχει πάντα εύκολα από Actions UI, το workflow πρέπει πρακτικά να υπάρχει στο default branch.

## Storage (Web + Portable)

- Storage abstraction στο `src/services/storage.ts`:
  - Primary: `localStorage`
  - Fallback: in‑memory store όταν το `localStorage` δεν είναι διαθέσιμο/επιτρέπεται
  - Optional hook: αν υπάρχει `window.wsDeviceStorage`, χρησιμοποιείται ως async backend (κρατήθηκε για πιθανή future desktop ενσωμάτωση)

Observations:
- Η αποθήκευση entries/goals/tasks/pendings είναι async.
- `getProgressSummary()` είναι sync helper και δουλεύει μόνο με `localStorage`.

## Routing & Offline

- Web: `BrowserRouter` με `basename` από `import.meta.env.BASE_URL`.
- Portable (`file://`): `HashRouter` για να μην εξαρτάται από path routing.
- Service worker:
  - `src/utils/notifications.ts` αποφεύγει SW registration σε `file://`.

## Findings & Recommendations

### Medium
- **Docs**: README χρειάζεται σαφείς οδηγίες για backup/import και portable περιορισμούς (`file://`).

### Low
- **Typed deps**: υπάρχει `@types/react-router-dom` ενώ χρησιμοποιείται `react-router-dom@6` (στο v6 συνήθως δεν χρειάζεται). Αν δεν προκαλεί πρόβλημα, μπορεί να μείνει, αλλά είναι υποψήφιο για cleanup.
- **Vite CJS deprecation warning**: πληροφοριακό. Δεν σπάει build.

## Suggested Next Steps (pick & choose)

1) Docs-first (άμεσο):
- Backup/export/import (format, demo file)
- Portable troubleshooting (`file://`, storage persistence)

2) Stability:
- Προσθήκη/βελτίωση UX για persistent storage αίτημα (όπου υποστηρίζεται)

## Appendix

### Commands
- Web dev: `npm run dev`
- Web build: `npm run build`
- Portable build: `npm run build:portable`
