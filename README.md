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

Enter a store URL or upload screenshots on **Enter URL**, then follow the loading screen to the outcome below.


| Store / URL                                        | Flow              | Result                                                        |
| -------------------------------------------------- | ----------------- | ------------------------------------------------------------- |
| **Gymshark** · `gymshark.com`                      | Named demo store  | Tailored activewear & fitness audit → `/feedback`             |
| **Glossier** · `glossier.com`                      | Named demo store  | Tailored beauty & skincare audit → `/feedback`                |
| **Kith** · `kith.com`                              | Named demo store  | Tailored streetwear & lifestyle audit → `/feedback`           |
| **Our Place** · `fromourplace.com`, `ourplace.com` | Named demo store  | Tailored home & cookware audit → `/feedback`                  |
| **Away** · `awaytravel.com`, `away.com`            | Named demo store  | Tailored travel & accessories audit → `/feedback`             |
| Any other valid domain                             | Unknown URL       | General recommendations; `storeName` = hostname → `/feedback` |
| — (screenshots, no URL)                            | Screenshot upload | `generalFromPhotos` audit → `/feedback`                       |
| `blanksite.com`                                    | Insufficient data | Missing data page → retry or upload-directly                  |
| — (questionnaire)                                  | Upload directly   | 5-step form → general recommendations → `/feedback`           |


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

## Design notes

- Font: **Heebo** (loaded in `index.html,`inspired by Tolstoy's font.)
- Primary text: `#1D293D`, accent: `#FF006E`
- Styles live in `src/index.css`

## Link to supporting presentation

https://canva.link/0wi93pbtz17pmd1
