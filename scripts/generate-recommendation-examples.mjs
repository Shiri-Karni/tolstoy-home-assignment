/**
 * Generates storefront feature-preview SVGs under public/examples/recommendations/
 * and regenerates src/mock/recommendationExamples.js.
 *
 * Run: node scripts/generate-recommendation-examples.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '..', 'public', 'examples', 'recommendations')

const W = 720
const H = 420
const HIGHLIGHT = '#FF006E'
const HIGHLIGHT_FILL = '#FFE8F1'
const CARD = { x: 48, y: 72, w: 624, h: 288 }

function escapeXml(text) {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/—/g, '-')
}

const BRANDS = {
  gymshark: { name: 'Gymshark', accent: '#000000', dot: '#000000' },
  glossier: { name: 'Glossier', accent: '#000000', dot: '#FEAFC8' },
  kith: { name: 'Kith', accent: '#000000', dot: '#000000' },
  ourPlace: { name: 'Our Place', accent: '#C45C3E', dot: '#C45C3E' },
  away: { name: 'Away', accent: '#1B2A4A', dot: '#1B2A4A' },
  generic: { name: 'Your store', accent: '#1D293D', dot: '#64748B' },
}

function defs(brand) {
  return `<defs>
    <linearGradient id="storyGrad-${brand}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF006E"/>
      <stop offset="50%" stop-color="#FF8C00"/>
      <stop offset="100%" stop-color="#FF006E"/>
    </linearGradient>
    <filter id="cardShadow" x="-8%" y="-8%" width="116%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.08"/>
    </filter>
  </defs>`
}

function storyRing(cx, cy, r, active, gradId) {
  const stroke = active
    ? `stroke="url(#${gradId})" stroke-width="3.5"`
    : `stroke="#CBD5E1" stroke-width="2"`
  const fill = active ? '#1a1a1a' : '#E2E8F0'
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r + 6}" fill="none" ${stroke}/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>
    ${active ? `<polygon points="${cx - 6},${cy + 2} ${cx - 6},${cy - 6} ${cx + 5},${cy - 1}" fill="#fff"/>` : ''}
  </g>`
}

function featureLabel(x, y, text) {
  return `<rect x="${x}" y="${y}" width="${Math.min(text.length * 6.2 + 28, CARD.w)}" height="28" rx="14" fill="${HIGHLIGHT_FILL}" stroke="${HIGHLIGHT}" stroke-width="1.5"/>
  <text x="${x + 14}" y="${y + 19}" fill="${HIGHLIGHT}" font-size="11" font-weight="700" font-family="system-ui,sans-serif">${escapeXml(text)}</text>`
}

function brandPill(brand) {
  const b = BRANDS[brand] ?? BRANDS.generic
  return `<g opacity="0.9">
    <circle cx="${CARD.x + 18}" cy="${CARD.y + 22}" r="5" fill="${b.dot}"/>
    <text x="${CARD.x + 30}" y="${CARD.y + 26}" fill="#64748B" font-size="10" font-family="system-ui,sans-serif">${escapeXml(b.name)}</text>
  </g>`
}

/** Cropped feature showcase — no browser chrome */
function featureShowcase({ brand = 'generic', label, caption, content }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img">
  ${defs(brand)}
  <rect width="${W}" height="${H}" rx="12" fill="#F1F5F9"/>
  ${featureLabel(CARD.x, 28, label)}
  <g filter="url(#cardShadow)">
    <rect x="${CARD.x}" y="${CARD.y}" width="${CARD.w}" height="${CARD.h}" rx="16" fill="#ffffff"/>
    ${brandPill(brand)}
    ${content}
  </g>
  <text x="${W / 2}" y="${H - 18}" text-anchor="middle" fill="#64748B" font-size="11" font-family="system-ui,sans-serif">${escapeXml(caption)}</text>
</svg>`
}

function playButton(cx, cy, r = 24) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0F172A" opacity="0.82"/>
  <polygon points="${cx - 7},${cy + 1} ${cx - 7},${cy - 11} ${cx + 9},${cy - 4}" fill="#fff"/>`
}

function storiesRow(brand, count = 4, ringR = 28) {
  const cx0 = CARD.x + CARD.w / 2 - ((count - 1) * 72) / 2
  const cy = CARD.y + CARD.h / 2 - 8
  let rings = ''
  for (let i = 0; i < count; i++) {
    rings += storyRing(cx0 + i * 72, cy, ringR, i === 0, `storyGrad-${brand}`)
  }
  return `${rings}
  <text x="${CARD.x + CARD.w / 2}" y="${cy + ringR + 36}" text-anchor="middle" fill="#64748B" font-size="11" font-family="system-ui,sans-serif">Tap to watch · shop from story</text>`
}

function showcaseStories(brand) {
  return featureShowcase({
    brand,
    label: 'Shoppable stories on PDP',
    caption: 'Story rings shoppers see above your product gallery',
    content: `
    <rect x="${CARD.x + 24}" y="${CARD.y + 52}" width="${CARD.w - 48}" height="4" rx="2" fill="#E2E8F0"/>
    <rect x="${CARD.x + 24}" y="${CARD.y + 64}" width="140" height="12" rx="3" fill="#E2E8F0"/>
    ${storiesRow(brand, 4, 30)}
    <rect x="${CARD.x + 24}" y="${CARD.y + CARD.h - 72}" width="200" height="56" rx="8" fill="#F8FAFC" stroke="#E2E8F0"/>
    <text x="${CARD.x + 124}" y="${CARD.y + CARD.h - 40}" text-anchor="middle" fill="#94A3B8" font-size="10" font-family="system-ui,sans-serif">Product gallery</text>`,
  })
}

function showcaseHomepageFeed(brand) {
  const y = CARD.y + 108
  const cardW = 148
  const cardH = 168
  const startX = CARD.x + (CARD.w - cardW * 3 - 32) / 2
  return featureShowcase({
    brand,
    label: 'Shoppable video feed',
    caption: 'Scrollable product videos on your homepage',
    content: `
    <text x="${CARD.x + CARD.w / 2}" y="${CARD.y + 88}" text-anchor="middle" fill="#0F172A" font-size="13" font-weight="700" font-family="system-ui,sans-serif">For You</text>
    <rect x="${startX}" y="${y}" width="${cardW}" height="${cardH}" rx="12" fill="#111827"/>
    ${playButton(startX + cardW / 2, y + cardH / 2 - 12, 22)}
    <rect x="${startX + 10}" y="${y + cardH - 32}" width="64" height="22" rx="6" fill="#ffffff"/>
    <text x="${startX + 42}" y="${y + cardH - 17}" text-anchor="middle" fill="#0F172A" font-size="10" font-weight="600" font-family="system-ui,sans-serif">Shop $48</text>
    <rect x="${startX + cardW + 16}" y="${y}" width="${cardW}" height="${cardH}" rx="12" fill="#374151"/>
    ${playButton(startX + cardW + 16 + cardW / 2, y + cardH / 2 - 12, 22)}
    <rect x="${startX + (cardW + 16) * 2}" y="${y}" width="${cardW}" height="${cardH}" rx="12" fill="#1F2937"/>
    ${playButton(startX + (cardW + 16) * 2 + cardW / 2, y + cardH / 2 - 12, 22)}`,
  })
}

function showcaseTopQuestions(brand, productName) {
  const panelX = CARD.x + 72
  const panelW = CARD.w - 144
  const qY = CARD.y + 88
  const questions = [
    'Which shade is right for me?',
    'Can I use this with my routine?',
    'Good for sensitive skin?',
  ]
  const chips = questions
    .map((q, i) => {
      const y = qY + i * 52
      return `<rect x="${panelX}" y="${y}" width="${panelW}" height="42" rx="21" fill="#ffffff" stroke="#E2E8F0" stroke-width="1.5"/>
      <text x="${panelX + 18}" y="${y + 26}" fill="#0F172A" font-size="12" font-family="system-ui,sans-serif">${escapeXml(q)}</text>`
    })
    .join('')
  return featureShowcase({
    brand,
    label: 'Top questions on PDP',
    caption: 'AI Shopper answers common questions on the product page',
    content: `
    <text x="${CARD.x + CARD.w / 2}" y="${CARD.y + 72}" text-anchor="middle" fill="#0F172A" font-size="14" font-weight="700" font-family="system-ui,sans-serif">${escapeXml(productName)}</text>
    <text x="${CARD.x + CARD.w / 2}" y="${CARD.y + 88}" text-anchor="middle" fill="#64748B" font-size="10" font-family="system-ui,sans-serif">Shoppers tap a question for an instant answer</text>
    ${chips}
    <rect x="${panelX}" y="${qY + 168}" width="${panelW}" height="48" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
    <text x="${panelX + 16}" y="${qY + 198}" fill="#94A3B8" font-size="10" font-family="system-ui,sans-serif">Powered by AI Shopper</text>`,
  })
}

function showcaseChat(brand) {
  const chatW = 280
  const chatH = 220
  const chatX = CARD.x + (CARD.w - chatW) / 2
  const chatY = CARD.y + 56
  return featureShowcase({
    brand,
    label: 'AI sales chat on PDP',
    caption: 'Embedded chat answers questions and suggests products',
    content: `
    <rect x="${chatX}" y="${chatY}" width="${chatW}" height="${chatH}" rx="18" fill="#ffffff" stroke="#E2E8F0" stroke-width="2"/>
    <rect x="${chatX}" y="${chatY}" width="${chatW}" height="44" rx="18" fill="${HIGHLIGHT}"/>
    <text x="${chatX + chatW / 2}" y="${chatY + 28}" text-anchor="middle" fill="#ffffff" font-size="12" font-weight="700" font-family="system-ui,sans-serif">Ask about this product</text>
    <rect x="${chatX + 16}" y="${chatY + 58}" width="${chatW - 32}" height="40" rx="10" fill="#F1F5F9"/>
    <text x="${chatX + 28}" y="${chatY + 84}" fill="#64748B" font-size="11" font-family="system-ui,sans-serif">Will this fit carry-on rules?</text>
    <rect x="${chatX + 16}" y="${chatY + 108}" width="${chatW - 32}" height="72" rx="10" fill="${HIGHLIGHT_FILL}"/>
    <text x="${chatX + 28}" y="${chatY + 132}" fill="#0F172A" font-size="11" font-family="system-ui,sans-serif">Yes — fits most airline bins.</text>
    <text x="${chatX + 28}" y="${chatY + 152}" fill="#0F172A" font-size="11" font-family="system-ui,sans-serif">Want the Flex size instead?</text>
    <rect x="${chatX + 16}" y="${chatY + 192}" width="${chatW - 32}" height="16" rx="8" fill="#E2E8F0"/>
    <text x="${chatX + 28}" y="${chatY + 204}" fill="#94A3B8" font-size="9" font-family="system-ui,sans-serif">Type a message…</text>`,
  })
}

function showcaseTryOn(brand) {
  const panelX = CARD.x + 80
  const panelW = CARD.w - 160
  const top = CARD.y + 64
  return featureShowcase({
    brand,
    label: 'Virtual try-on & sizing',
    caption: 'Shoppers upload a photo and get size guidance on PDP',
    content: `
    <text x="${CARD.x + CARD.w / 2}" y="${top}" text-anchor="middle" fill="#0F172A" font-size="13" font-weight="700" font-family="system-ui,sans-serif">See it on you</text>
    <rect x="${panelX}" y="${top + 20}" width="${panelW}" height="120" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="1.5" stroke-dasharray="8 5"/>
    <circle cx="${CARD.x + CARD.w / 2}" cy="${top + 78}" r="28" fill="#E2E8F0"/>
    <text x="${CARD.x + CARD.w / 2}" y="${top + 84}" text-anchor="middle" fill="#64748B" font-size="11" font-family="system-ui,sans-serif">+ Upload photo</text>
    <text x="${panelX}" y="${top + 162}" fill="#0F172A" font-size="12" font-weight="600" font-family="system-ui,sans-serif">Find your size</text>
    <rect x="${panelX}" y="${top + 172}" width="${panelW}" height="40" rx="8" fill="#F1F5F9" stroke="#E2E8F0"/>
    <text x="${panelX + 14}" y="${top + 198}" fill="#94A3B8" font-size="10" font-family="system-ui,sans-serif">Height · weight · usual size</text>
    <rect x="${panelX}" y="${top + 222}" width="${panelW}" height="40" rx="8" fill="#0F172A"/>
    <text x="${CARD.x + CARD.w / 2}" y="${top + 248}" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="700" font-family="system-ui,sans-serif">Complete the look</text>`,
  })
}

function showcaseGallery(brand) {
  const gx = CARD.x + (CARD.w - 340) / 2
  const gy = CARD.y + 72
  return featureShowcase({
    brand,
    label: 'Expanded PDP gallery',
    caption: 'More lifestyle angles and on-model shots per SKU',
    content: `
    <rect x="${gx}" y="${gy}" width="220" height="168" rx="10" fill="#F1F5F9" stroke="#E2E8F0"/>
    <text x="${gx + 110}" y="${gy + 90}" text-anchor="middle" fill="#94A3B8" font-size="12" font-family="system-ui,sans-serif">Main image</text>
    <rect x="${gx + 236}" y="${gy + 108}" width="72" height="72" rx="8" fill="#E2E8F0"/>
    <rect x="${gx + 236}" y="${gy + 24}" width="72" height="72" rx="8" fill="#FCE7F3"/>
    <rect x="${gx + 320}" y="${gy + 24}" width="72" height="72" rx="8" fill="#E2E8F0"/>
    <rect x="${gx + 320}" y="${gy + 108}" width="72" height="72" rx="8" fill="#FDF2F8"/>
    <text x="${gx + 272}" y="${gy + 196}" text-anchor="middle" fill="#64748B" font-size="9" font-family="system-ui,sans-serif">On model</text>
    <text x="${gx + 356}" y="${gy + 196}" text-anchor="middle" fill="#64748B" font-size="9" font-family="system-ui,sans-serif">Lifestyle</text>`,
  })
}

function showcaseCollectionTiles(brand) {
  const cardW = 168
  const cardH = 200
  const y = CARD.y + 72
  const startX = CARD.x + (CARD.w - cardW * 3 - 24) / 2
  const tiles = [0, 1, 2]
    .map((i) => {
      const x = startX + i * (cardW + 12)
      const showPlay = i < 2
      return `<rect x="${x}" y="${y}" width="${cardW}" height="${cardH}" rx="10" fill="#F8FAFC" stroke="#E2E8F0"/>
      ${showPlay ? playButton(x + cardW / 2, y + cardH / 2 - 8, 26) : `<text x="${x + cardW / 2}" y="${y + cardH / 2 + 6}" text-anchor="middle" fill="#CBD5E1" font-size="22" font-family="system-ui,sans-serif">+</text>`}
      <rect x="${x + 12}" y="${y + cardH - 28}" width="80" height="10" rx="3" fill="#E2E8F0"/>`
    })
    .join('')
  return featureShowcase({
    brand,
    label: 'Video on collection tiles',
    caption: 'Play-in-place video on category product cards',
    content: `
    <text x="${CARD.x + CARD.w / 2}" y="${CARD.y + 58}" text-anchor="middle" fill="#0F172A" font-size="13" font-weight="700" font-family="system-ui,sans-serif">New Arrivals</text>
    ${tiles}`,
  })
}

function showcaseInteractive(brand, options) {
  const videoW = 480
  const videoH = 140
  const videoX = CARD.x + (CARD.w - videoW) / 2
  const videoY = CARD.y + 56
  const btnY = videoY + videoH + 28
  const btnW = Math.min(140, Math.floor((videoW - (options.length - 1) * 12) / options.length))
  const totalW = options.length * btnW + (options.length - 1) * 12
  const btnStart = videoX + (videoW - totalW) / 2
  const buttons = options
    .map((label, i) => {
      const x = btnStart + i * (btnW + 12)
      const active = i === 0
      return `<rect x="${x}" y="${btnY}" width="${btnW}" height="40" rx="20" fill="${active ? HIGHLIGHT : '#ffffff'}" stroke="${active ? HIGHLIGHT : '#E2E8F0'}" stroke-width="2"/>
      <text x="${x + btnW / 2}" y="${btnY + 25}" text-anchor="middle" fill="${active ? '#ffffff' : '#0F172A'}" font-size="10" font-weight="600" font-family="system-ui,sans-serif">${escapeXml(label)}</text>`
    })
    .join('')
  return featureShowcase({
    brand,
    label: 'Interactive video',
    caption: 'Branching paths let shoppers choose what to watch next',
    content: `
    <rect x="${videoX}" y="${videoY}" width="${videoW}" height="${videoH}" rx="14" fill="#111827"/>
    ${playButton(videoX + videoW / 2, videoY + videoH / 2, 28)}
    <text x="${videoX + videoW / 2}" y="${btnY - 10}" text-anchor="middle" fill="#64748B" font-size="10" font-family="system-ui,sans-serif">Choose an option</text>
    ${buttons}`,
  })
}

function showcaseBeforeAfter(featureLabel, afterContent) {
  const colW = 248
  const colH = 220
  const gap = 40
  const leftX = CARD.x + 32
  const rightX = leftX + colW + gap
  const colY = CARD.y + 52
  return featureShowcase({
    brand: 'generic',
    label: featureLabel,
    caption: 'What changes when Tolstoy is live on your store',
    content: `
    <text x="${leftX + colW / 2}" y="${colY - 10}" text-anchor="middle" fill="#94A3B8" font-size="10" font-weight="600" font-family="system-ui,sans-serif">Before</text>
    <rect x="${leftX}" y="${colY}" width="${colW}" height="${colH}" rx="12" fill="#F8FAFC" stroke="#CBD5E1" stroke-dasharray="6 4"/>
    <text x="${leftX + colW / 2}" y="${colY + colH / 2 + 4}" text-anchor="middle" fill="#94A3B8" font-size="11" font-family="system-ui,sans-serif">Your screenshot</text>
    <text x="${rightX + colW / 2}" y="${colY - 10}" text-anchor="middle" fill="${HIGHLIGHT}" font-size="10" font-weight="700" font-family="system-ui,sans-serif">After</text>
    <rect x="${rightX}" y="${colY}" width="${colW}" height="${colH}" rx="12" fill="#ffffff" stroke="${HIGHLIGHT}" stroke-width="2"/>
    <g transform="translate(${rightX + 16}, ${colY + 16})">${afterContent}</g>`,
  })
}

const examples = {
  'gymshark-pdp-stories': showcaseStories('gymshark'),
  'gymshark-ai-shopper': showcaseTryOn('gymshark'),
  'gymshark-homepage-feed': showcaseHomepageFeed('gymshark'),

  'glossier-ugc-stories': showcaseStories('glossier'),
  'glossier-top-questions': showcaseTopQuestions('glossier', 'Cloud Paint'),
  'glossier-ai-studio': showcaseGallery('glossier'),

  'kith-homepage-feed': showcaseHomepageFeed('kith'),
  'kith-interactive-drops': showcaseInteractive('kith', ['Early access', 'Enter code', 'Join list']),
  'kith-collection-stories': showcaseCollectionTiles('kith'),

  'our-place-interactive-founder': showcaseInteractive('ourPlace', ['Materials', 'Recipes', 'Care']),
  'our-place-pdp-howto': showcaseStories('ourPlace'),
  'our-place-ai-studio': showcaseGallery('ourPlace'),

  'away-pdp-feature-video': showcaseStories('away'),
  'away-ai-shopper-compare': showcaseChat('away'),
  'away-interactive-faq': showcaseInteractive('away', ['Warranty', 'Sizing', 'Returns']),

  'general-pdp-stories': showcaseStories('generic'),
  'general-ai-shopper': showcaseChat('generic'),
  'general-homepage-feed': showcaseHomepageFeed('generic'),

  'photos-pdp-stories': showcaseBeforeAfter(
    'PDP stories on your store',
    `${storyRing(88, 72, 24, true, 'storyGrad-generic')}
     <rect x="12" y="108" width="200" height="88" rx="8" fill="#111827"/>
     <text x="112" y="160" text-anchor="middle" fill="#ffffff" font-size="10" font-family="system-ui,sans-serif">Story plays here</text>`,
  ),
  'photos-ai-studio': showcaseBeforeAfter(
    'Richer PDP gallery',
    `<rect x="0" y="0" width="56" height="56" rx="6" fill="#FCE7F3"/>
     <rect x="64" y="0" width="56" height="56" rx="6" fill="#E2E8F0"/>
     <rect x="128" y="0" width="56" height="56" rx="6" fill="#FDF2F8"/>
     <rect x="0" y="68" width="184" height="100" rx="8" fill="#F1F5F9" stroke="#E2E8F0"/>`,
  ),
  'photos-interactive': showcaseBeforeAfter(
    'Interactive homepage video',
    `<rect x="8" y="8" width="200" height="88" rx="10" fill="#111827"/>
     ${playButton(108, 52, 20)}
     <rect x="56" y="108" width="96" height="36" rx="18" fill="${HIGHLIGHT}"/>
     <text x="104" y="132" text-anchor="middle" fill="#ffffff" font-size="10" font-weight="600" font-family="system-ui,sans-serif">Watch</text>`,
  ),
}

fs.mkdirSync(outDir, { recursive: true })
for (const [id, svg] of Object.entries(examples)) {
  fs.writeFileSync(path.join(outDir, `${id}.svg`), svg.trim())
}

const mapEntries = Object.keys(examples)
  .map((id) => `  '${id}': '/examples/recommendations/${id}.svg',`)
  .join('\n')

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'mock', 'recommendationExamples.js'),
  `/**
 * Maps recommendation IDs to example preview images. Auto-generated — do not edit.
 * Regenerate: node scripts/generate-recommendation-examples.mjs
 */
import { EXAMPLE_IMAGE_BY_ICON } from './recommendationExamples.icons.js'

export { EXAMPLE_IMAGE_BY_ICON }

/** Paths to SVG mockups keyed by recommendation.id from storeAudits.js */
export const EXAMPLE_IMAGE_BY_RECOMMENDATION_ID = {
${mapEntries}
}

/** Resolves the lightbox image for a recommendation (by id, then icon fallback). */
export function getExampleImageForRecommendation(recommendation) {
  if (recommendation?.id && EXAMPLE_IMAGE_BY_RECOMMENDATION_ID[recommendation.id]) {
    return EXAMPLE_IMAGE_BY_RECOMMENDATION_ID[recommendation.id]
  }
  return EXAMPLE_IMAGE_BY_ICON[recommendation?.icon] ?? EXAMPLE_IMAGE_BY_ICON.video
}
`,
)

console.log(`Generated ${Object.keys(examples).length} feature showcase SVGs`)
