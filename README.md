# WorkSmart Web Prototype

## Overview
- **English:** A modern React + TypeScript (Vite) single-page application that mirrors the key flows of the WorkSmartNotHard Android app. It focuses on quick goal tracking, production entry, team statistics, and pending actions with a consistent UI.
- **Ελληνικά:** Μια σύγχρονη εφαρμογή React + TypeScript (Vite) που αναπαράγει τις βασικές ροές της WorkSmartNotHard Android εφαρμογής. Δίνει έμφαση στην ταχεία καταγραφή στόχων, καταχωρήσεων, στατιστικών και εκκρεμοτήτων με κοινή, σταθερή αισθητική.

## Key Features
- **English:** Unified layout with reusable `PageHeader`, responsive hero dashboard, quick actions, and domain-specific entry logic (e.g., automatic appointment totals, Vodafone Home subtypes).
- **Ελληνικά:** Ενοποιημένη διάταξη με κοινό `PageHeader`, προσαρμοστικό hero dashboard, γρήγορα κουμπιά δράσης και λογική ειδικών καταχωρήσεων (π.χ. αυτόματος υπολογισμός ραντεβού, υποτύποι Vodafone Home).

## Requirements
- **English:** Node.js 18+, npm 9+, modern browser with localStorage support.
- **Ελληνικά:** Node.js 18+, npm 9+, σύγχρονος περιηγητής με υποστήριξη localStorage.

## Quick Start / Γρήγορη Εκκίνηση
```bash
git clone <repository>
cd worksmart-web
npm install
npm run dev
```

- **English:** Open the dev server URL (default: http://localhost:5173) to explore the SPA.
- **Ελληνικά:** Άνοιξε το URL του dev server (προεπιλογή: http://localhost:5173) για να δεις την εφαρμογή.

## Available Scripts / Διαθέσιμες Εντολές
- `npm run dev` — **English:** start Vite in development mode · **Ελληνικά:** εκκίνηση Vite σε development.
- `npm run build` — **English:** create a production bundle · **Ελληνικά:** δημιουργεί production build.
- `npm run preview` — **English:** serve the production bundle locally · **Ελληνικά:** τοπική προεπισκόπηση build.

## Project Structure / Δομή Έργου
- `src/main.tsx` — **English:** app bootstrap and router setup · **Ελληνικά:** αρχικοποίηση εφαρμογής & router.
- `src/pages/*` — **English:** route-driven screens (home, stats, entries, goals, profile, pendings) · **Ελληνικά:** οθόνες ανά σελίδα (αρχική, στατιστικά, καταχωρήσεις, στόχοι, προφίλ, εκκρεμότητες).
- `src/components/*` — **English:** reusable UI blocks (PageHeader, tables, modals) · **Ελληνικά:** επαναχρησιμοποιήσιμα στοιχεία UI.
- `src/services/storage.ts` — **English:** persistence layer using `localStorage` · **Ελληνικά:** αποθήκευση δεδομένων με χρήση `localStorage`.
- `public/sw.js` — **English:** service worker scaffold for notifications · **Ελληνικά:** service worker για ειδοποιήσεις.

## Data & Persistence / Δεδομένα & Αποθήκευση
- **English:** All entities (entries, goals, pending items) are stored in the browser via `localStorage`. No backend is required; data is scoped per device/profile.
- **Ελληνικά:** Όλες οι εγγραφές, στόχοι και εκκρεμότητες αποθηκεύονται στον περιηγητή μέσω `localStorage`. Δεν απαιτείται backend· τα δεδομένα είναι τοπικά ανά συσκευή.

## Styling
- **English:** Custom CSS with Tailwind-inspired utility classes (processed by PostCSS). The `index.css` file contains explicit fallbacks so the UI renders even without Tailwind compilation.
- **Ελληνικά:** Προσαρμοσμένο CSS με utilities τύπου Tailwind (μέσω PostCSS). Το `index.css` έχει ρητές fallback κλάσεις ώστε το UI να εμφανίζεται ακόμη και χωρίς build Tailwind.

## Development Notes / Σημειώσεις Ανάπτυξης
- **English:**
	- Home page hero and quick tiles adapt responsively.
	- `AddEntryPage` enforces business rules for Vodafone Home subtypes and appointment amounts.
	- Notifications can be enabled via the provided service worker.
- **Ελληνικά:**
	- Η αρχική σελίδα και τα πλακίδια προσαρμόζονται σε όλες τις διαστάσεις.
	- Η σελίδα καταχώρησης εφαρμόζει κανόνες για Vodafone Home και ραντεβού.
	- Οι ειδοποιήσεις μπορούν να ενεργοποιηθούν μέσω του service worker.

## Next Steps / Επόμενα Βήματα
- **English:**
	- Integrate real bonus calculation logic from the Android codebase.
	- Add automated tests (unit + e2e) and CI/CD workflow.
	- Consider syncing data to a backend for multi-device access.
- **Ελληνικά:**
	- Ενσωμάτωση της πραγματικής φόρμουλας bonus από το Android project.
	- Προσθήκη αυτοματοποιημένων tests (unit + e2e) και ροής CI/CD.
	- Επέκταση με backend συγχρονισμό για πρόσβαση από πολλές συσκευές.

---

**English:** Contributions and issue reports are welcome—open a Pull Request or GitHub issue.

**Ελληνικά:** Οποιαδήποτε συμβολή ή αναφορά προβλήματος είναι ευπρόσδεκτη—άνοιξε Pull Request ή issue στο GitHub.
