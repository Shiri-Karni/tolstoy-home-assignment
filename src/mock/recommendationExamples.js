/**
 * Maps recommendation IDs to example preview images. Auto-generated — do not edit.
 * Regenerate: node scripts/generate-recommendation-examples.mjs
 */
import { EXAMPLE_IMAGE_BY_ICON } from './recommendationExamples.icons.js'

export { EXAMPLE_IMAGE_BY_ICON }

/** Paths to SVG mockups keyed by recommendation.id from storeAudits.js */
export const EXAMPLE_IMAGE_BY_RECOMMENDATION_ID = {
  'gymshark-pdp-stories': '/examples/recommendations/gymshark-pdp-stories.svg',
  'gymshark-ai-shopper': '/examples/recommendations/gymshark-ai-shopper.svg',
  'gymshark-homepage-feed': '/examples/recommendations/gymshark-homepage-feed.svg',
  'glossier-ugc-stories': '/examples/recommendations/glossier-ugc-stories.svg',
  'glossier-top-questions': '/examples/recommendations/glossier-top-questions.svg',
  'glossier-ai-studio': '/examples/recommendations/glossier-ai-studio.svg',
  'kith-homepage-feed': '/examples/recommendations/kith-homepage-feed.svg',
  'kith-interactive-drops': '/examples/recommendations/kith-interactive-drops.svg',
  'kith-collection-stories': '/examples/recommendations/kith-collection-stories.svg',
  'our-place-interactive-founder': '/examples/recommendations/our-place-interactive-founder.svg',
  'our-place-pdp-howto': '/examples/recommendations/our-place-pdp-howto.svg',
  'our-place-ai-studio': '/examples/recommendations/our-place-ai-studio.svg',
  'away-pdp-feature-video': '/examples/recommendations/away-pdp-feature-video.svg',
  'away-ai-shopper-compare': '/examples/recommendations/away-ai-shopper-compare.svg',
  'away-interactive-faq': '/examples/recommendations/away-interactive-faq.svg',
  'general-pdp-stories': '/examples/recommendations/general-pdp-stories.svg',
  'general-ai-shopper': '/examples/recommendations/general-ai-shopper.svg',
  'general-homepage-feed': '/examples/recommendations/general-homepage-feed.svg',
  'photos-pdp-stories': '/examples/recommendations/photos-pdp-stories.svg',
  'photos-ai-studio': '/examples/recommendations/photos-ai-studio.svg',
  'photos-interactive': '/examples/recommendations/photos-interactive.svg',
}

/** Resolves the lightbox image for a recommendation (by id, then icon fallback). */
export function getExampleImageForRecommendation(recommendation) {
  if (recommendation?.id && EXAMPLE_IMAGE_BY_RECOMMENDATION_ID[recommendation.id]) {
    return EXAMPLE_IMAGE_BY_RECOMMENDATION_ID[recommendation.id]
  }
  return EXAMPLE_IMAGE_BY_ICON[recommendation?.icon] ?? EXAMPLE_IMAGE_BY_ICON.video
}
