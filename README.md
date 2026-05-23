# Tolstoy Home Assignment

MVP demo for a PM interview: a shopper-facing flow that “analyzes” a store (or uploaded context) and returns three Tolstoy product recommendations (AI Player, AI Studio, AI Shopper, Interactive Video).

Built with **React 19**, **Vite 6**, and **React Router 7**.

## Quick start

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build    # production build → dist/
npm run preview  # preview production build
```

## User flows


| Flow                  | How to trigger                                                  | Result                                          |
| --------------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| **Named demo store**  | Enter URL matching a known brand (e.g. `gymshark.com`)          | Tailored audit for that brand                   |
| **Unknown URL**       | Any other valid domain                                          | General recommendations; `storeName` = hostname |
| **Screenshot upload** | Drag/drop images on Enter URL (no URL)                          | `generalFromPhotos` audit                       |
| **Insufficient data** | `blanksite.com`                                                 | Missing data page → retry or upload-directly    |
| **Upload directly**   | Missing data → “Upload Content Directly”, or `/upload-directly` | 5-step questionnaire → general recommendations  |


## Routes


| Path                | Page            | Role                        |
| ------------------- | --------------- | --------------------------- |
| `/`                 | Onboarding      | Welcome                     |
| `/enter-url`        | Enter URL       | URL or file input           |
| `/loading-feedback` | Loading         | Mock analysis (~3.2s)       |
| `/feedback`         | Feedback        | Strategy + 3 cards          |
| `/missing-data`     | Missing data    | Crawl / content failure     |
| `/upload-directly`  | Upload directly | Written brand questionnaire |


## Project structure

```
public/
  tolstoy-icon.svg, globe-icon.svg, upload-icon.svg
  examples/recommendations-generated/   # Lightbox photos (JPEG/PNG, one per recommendation id)
  examples/recommendations/*.svg        # Legacy SVG placeholders (optional)

scripts/
  generate-recommendation-examples.mjs   # Regenerates SVGs + recommendationExamples.js

src/
  main.jsx, App.jsx, index.css
  context/AnalysisInputContext.jsx   # Shared funnel state
  data/uploadDirectlySteps.js        # Questionnaire step config
  pages/                             # One component per route
  components/                        # Cards, lightbox, icons
  mock/
    storeAudits.js                   # Audit copy + recommendations
    resolveAudit.js                  # URL validation + audit routing
    loadingMessages.js
    recommendationExamples.js        # Auto-generated image map
    recommendationExamples.icons.js  # Fallbacks by icon type
  utils/generateChatUrl.js           # Tolstoy platform deep links
```

## Demo store URLs


| Brand                     | Example domain     |
| ------------------------- | ------------------ |
| Gymshark                  | `gymshark.com`     |
| Glossier                  | `glossier.com`     |
| Kith                      | `kith.com`         |
| Our Place                 | `fromourplace.com` |
| Away                      | `awaytravel.com`   |
| No content (missing data) | `blanksite.com`    |


## Regenerating example images

```bash
node scripts/generate-recommendation-examples.mjs
```

Updates `public/examples/recommendations/` only. Lightbox paths are in `src/mock/recommendationExamples.js` and should reference `recommendations-generated/`.

## Design notes

- Font: **Heebo** (loaded in `index.html`)
- Primary text: `#1D293D`, accent: `#FF006E`
- Styles live in `src/index.css` (BEM-style class names per page)

