# WorkSmartNotHard — Web + Portable (Double‑Click)

React/Vite SPA που τρέχει:

- ως **Web app** (π.χ. GitHub Pages) με αποθήκευση στο `localStorage`
- ως **Portable offline** build που ανοίγει με **διπλό κλικ** στο `portable/index.html` (χωρίς server)

## Γρήγορη εικόνα

- **Web mode**: δεδομένα ανά browser/profile (χωρίς sync)
- **Portable mode**: ίδιο app σε `file://` (σε μερικά εταιρικά/locked‑down περιβάλλοντα το storage μπορεί να καθαρίζεται)
- **Routing**: Web `BrowserRouter` / Portable `HashRouter` (auto‑detect)

## Προαπαιτούμενα (development)

- Node.js 18+ (προτείνεται 20)
- npm 9+

## Τοπικό development (Web)

```bash
npm ci
npm run dev
```

## Build (Web)

```bash
npm run build
npm run preview
```

## Portable Offline (διπλό κλικ)

Φτιάχνει self‑contained folder για άνοιγμα με διπλό κλικ (χωρίς server):

```bash
npm ci
npm run build:portable
```

Μετά άνοιξε:

- `portable/index.html`

### Portable troubleshooting

- Αν δεις κενή σελίδα, θα εμφανιστεί **Portable Debug** panel.
- Πάτα **Download log** και δες/στείλε το `worksmart-portable-log.txt`.

DevTools shortcuts:

- Windows: `Ctrl+Shift+I` (ή `Fn+F12` σε laptops)
- macOS: `Cmd+Option+I`

### Portable download (zip) από GitHub

GitHub → **Actions** → **Build Portable (Double-Click Index)** → artifact `WorkSmartNotHard-portable`.

## Δεδομένα & Backup

### Πού αποθηκεύονται τα δεδομένα;

- Web/Portable: `localStorage` (δες `src/services/storage.ts`)

Σε `file://` ή σε locked‑down browsers, το app μπορεί να δουλέψει **χωρίς μόνιμη αποθήκευση** (fallback σε in‑memory storage). Για πιο σταθερή συμπεριφορά:

- Πήγαινε **Προφίλ** → ζήτησε **Μόνιμη αποθήκευση** (όπου υποστηρίζεται)

### Export / Import

Από τη σελίδα **Προφίλ**:

- **Export**: κατεβάζει αρχείο `worksmart-backup-YYYY-MM-DDTHH-MM-SS.json`
- **Import**: εισάγει backup και κάνει refresh

Το backup είναι σε format:

- `format: "worksmart-backup"`
- `version: 1`
- `data`: raw JSON strings για τα app keys (entries/goals/tasks/pendings + profile/suggestions)

### Demo δεδομένα

Το [demo.json](demo.json) είναι έτοιμο **importable backup** που γεμίζει demo entries (χωρίς να πειράζει profile/suggestions).

## GitHub Pages

Το deploy γίνεται με workflow:

- `/.github/workflows/deploy-pages.yml` (τρέχει σε push στο `main`)

Σημείωση: το base path για Pages είναι hardcoded στο `vite.config.ts` (`PAGES_BASE`). Αν αλλάξεις όνομα repo, ενημέρωσε αυτό το path.

## Workflows

- `/.github/workflows/deploy-pages.yml`: deploy στο GitHub Pages (`main`)
- `/.github/workflows/build-portable.yml`: build portable artifact (`main` + manual)

## Troubleshooting

### Dev: “vite: command not found”

Λείπουν dependencies:

```bash
npm ci
```

## Audit

Δες [AUDIT_REPORT.md](AUDIT_REPORT.md) για συνοπτικό έλεγχο (τι υποστηρίζεται, builds, γνωστά θέματα, προτάσεις).
