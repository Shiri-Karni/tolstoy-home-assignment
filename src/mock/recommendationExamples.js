/**
 * Maps recommendation IDs to example preview images for the "See an example" lightbox.
 * Assets live under public/examples/recommendations-generated/.
 */
import { EXAMPLE_IMAGE_BY_ICON } from './recommendationExamples.icons.js'

export { EXAMPLE_IMAGE_BY_ICON }

/** Paths keyed by recommendation.id from storeAudits.js */
export const EXAMPLE_IMAGE_BY_RECOMMENDATION_ID = {
  'gymshark-pdp-stories':
    '/examples/recommendations-generated/gymshark-pdp-stories.png',
  'gymshark-ai-shopper':
    '/examples/recommendations-generated/gymshark-ai-shopper.mp4',
  'gymshark-homepage-feed':
    '/examples/recommendations-generated/gymshark-homepage-feed.png',
  'glossier-ugc-stories':
    '/examples/recommendations-generated/glossier-ugc-stories.jpeg',
  'glossier-top-questions':
    '/examples/recommendations-generated/glossier-top-questions.jpeg',
  'glossier-ai-studio':
    '/examples/recommendations-generated/glossier-ai-studio.jpeg',
  'kith-homepage-feed':
    '/examples/recommendations-generated/kith-homepage-feed.jpeg',
  'kith-interactive-drops':
    '/examples/recommendations-generated/kith-interactive-drops.jpeg',
  'kith-collection-stories':
    '/examples/recommendations-generated/kith-collection-stories.jpeg',
  'our-place-interactive-founder':
    '/examples/recommendations-generated/our-place-interactive-founder.jpeg',
  'our-place-pdp-howto':
    '/examples/recommendations-generated/our-place-pdp-howto.jpeg',
  'our-place-ai-studio':
    '/examples/recommendations-generated/our-place-ai-studio.jpeg',
  'away-pdp-feature-video':
    '/examples/recommendations-generated/away-pdp-feature-video.jpeg',
  'away-ai-shopper-compare':
    '/examples/recommendations-generated/away-ai-shopper-compare.jpeg',
  'away-interactive-faq':
    '/examples/recommendations-generated/away-interactive-faq.jpeg',
  'general-pdp-stories':
    '/examples/recommendations-generated/general-pdp-stories.jpeg',
  'general-ai-shopper':
    '/examples/recommendations-generated/general-ai-shopper.jpeg',
  'general-homepage-feed':
    '/examples/recommendations-generated/general-homepage-feed.jpeg',
  'photos-pdp-stories':
    '/examples/recommendations-generated/photos-pdp-stories.jpeg',
  'photos-ai-studio':
    '/examples/recommendations-generated/photos-ai-studio.jpeg',
  'photos-interactive':
    '/examples/recommendations-generated/photos-interactive.jpeg',
}

/** True when the example asset is a video (e.g. .mp4) rather than an image. */
export function isExampleVideo(src) {
  return /\.(mp4|webm|mov)(\?.*)?$/i.test(src ?? '')
}

/** Resolves the lightbox image for a recommendation (by id, then icon fallback). */
export function getExampleImageForRecommendation(recommendation) {
  if (recommendation?.id && EXAMPLE_IMAGE_BY_RECOMMENDATION_ID[recommendation.id]) {
    return EXAMPLE_IMAGE_BY_RECOMMENDATION_ID[recommendation.id]
  }
  return EXAMPLE_IMAGE_BY_ICON[recommendation?.icon] ?? EXAMPLE_IMAGE_BY_ICON.video
}
