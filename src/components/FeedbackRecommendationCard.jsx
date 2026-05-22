/**
 * Single strategy recommendation: icon, copy, Generate (Tolstoy chat), and example lightbox.
 */
import { useState } from 'react'
import { getExampleImageForRecommendation } from '../mock/recommendationExamples.js'
import { buildGenerateChatUrl } from '../utils/generateChatUrl.js'
import ExampleLightbox from './ExampleLightbox.jsx'
import RecommendationIcon from './RecommendationIcon.jsx'

export default function FeedbackRecommendationCard({
  recommendation,
  storeName,
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const exampleSrc = getExampleImageForRecommendation(recommendation)
  const generateHref = buildGenerateChatUrl({
    title: recommendation.title,
    description: recommendation.description,
    tolstoyProduct: recommendation.tolstoyProduct,
    storeName,
  })

  return (
    <article className="feedback-recommendation-card">
      <RecommendationIcon type={recommendation.icon} />
      <h2 className="feedback-recommendation-card-title">
        {recommendation.title}
      </h2>
      <p className="feedback-recommendation-card-description">
        {recommendation.description}
      </p>
      <a
        href={generateHref}
        target="_blank"
        rel="noopener noreferrer"
        className="feedback-recommendation-card-generate"
      >
        <span className="feedback-recommendation-card-generate-icon" aria-hidden="true">
          ✨
        </span>
        Generate
      </a>
      <button
        type="button"
        className="feedback-recommendation-card-example"
        onClick={() => setLightboxOpen(true)}
      >
        <svg
          className="feedback-recommendation-card-example-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="2" />
        </svg>
        See an example
      </button>

      {lightboxOpen && (
        <ExampleLightbox
          imageSrc={exampleSrc}
          imageAlt={`Example: ${recommendation.title}`}
          caption={`${recommendation.tolstoyProduct} · ${recommendation.title}`}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </article>
  )
}
