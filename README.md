# WorkSmartNotHard — Web + Portable (Double‑Click)

React/Vite SPA που τρέχει:

- ως **Web app** (π.χ. GitHub Pages) με αποθήκευση στο `localStorage`
- ως **Portable offline** build που ανοίγει με **διπλό κλικ** στο `index.html` (χωρίς server)

## Γρήγορη Εικόνα

- Web mode: δεδομένα ανά browser/profile (χωρίς κοινό sync)
- Portable mode: ίδιο app μέσω `file://` (ορισμένα περιβάλλοντα μπορεί να “σβήνουν” τα browser δεδομένα)
- Routing: Web `BrowserRouter` / Portable `HashRouter`

## Προαπαιτούμενα (για development)

- Node.js 18+ (προτείνεται 20)
- npm 9+

## Local Development (Web)

```bash
npm ci
npm run dev
```

## Build (Web)

```bash
npm run build
npm run preview
```

## Portable Offline (διπλό κλικ σε `index.html`)

Φτιάχνει ένα self‑contained folder που ανοίγει με **διπλό κλικ** (χωρίς server/Electron):

```bash
npm ci
npm run build:portable
```

Μετά άνοιξε με διπλό κλικ το `portable/index.html`.

### Portable troubleshooting (αν ανοίγει “κενό”)

Στο `file://` δεν υπάρχει log αρχείο στον δίσκο (ο browser δεν μπορεί να γράψει αρχεία).

- Αν δεις κενή σελίδα, θα εμφανιστεί ένα **Portable Debug** panel.
- Πάτα **Download log** και στείλε το `worksmart-portable-log.txt`.

Σημείωση: Αν θες DevTools, συνήθως είναι `Ctrl+Shift+I` (Windows) ή `Cmd+Option+I` (Mac). Σε laptops το `F12` μπορεί να είναι πλήκτρο ήχου (χρειάζεται `Fn+F12`).

### Portable “χωρίς terminal” download (zip)

GitHub → **Actions** → **Build Portable (Double-Click Index)** → κατέβασε artifact `WorkSmartNotHard-portable`.

## Πού αποθηκεύονται τα δεδομένα;

- **Web / Portable**: `localStorage` (δες `src/services/storage.ts`)

Δεν υπάρχει κοινός συγχρονισμός μεταξύ συσκευών.

## Troubleshooting

### Dev: “vite: command not found”

Σημαίνει ότι δεν υπάρχουν εγκατεστημένα dependencies.

```bash
npm ci
```

## Workflows

- `/.github/workflows/deploy-pages.yml`: deploy στο GitHub Pages (branch `main`)
- `/.github/workflows/build-portable.yml`: build portable artifact (double‑click)

## Τεκμηρίωση ελέγχου (Audit)

Δες `AUDIT_REPORT.md` για πλήρη αναφορά (builds, αρχιτεκτονική, γνωστά θέματα διανομής, προτάσεις).

## Dependency audit (σημείωση)

`npm audit --audit-level=moderate` αναφέρει αυτή τη στιγμή moderate θέματα που κλείνουν με major upgrades (Electron/Vite). Αν θες να τα λύσουμε, κάν’ το σε ξεχωριστό branch και επιβεβαίωσε builds (`npm run build`, `npm run electron:dist`).
