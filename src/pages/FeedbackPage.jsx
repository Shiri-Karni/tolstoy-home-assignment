/**
 * Strategy results: summary plus three recommendation cards.
 * Requires analysisResult from the loading step (guards direct URL access).
 */
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FeedbackRecommendationCard from '../components/FeedbackRecommendationCard.jsx'
import { useAnalysisInput } from '../context/AnalysisInputContext.jsx'

const DEFAULT_RECOMMENDATIONS = [
  {
    id: 'fallback-1',
    icon: 'video',
    tolstoyProduct: 'AI Player',
    title: 'Add shoppable video on PDPs',
    description:
      'Bring UGC and product video onto your product pages so shoppers can see real use and buy without leaving the experience.',
  },
  {
    id: 'fallback-2',
    icon: 'growth',
    tolstoyProduct: 'AI Studio',
    title: 'Scale catalog visuals with AI Studio',
    description:
      'Generate on-brand images and short videos from existing product shots and publish them across your storefront.',
  },
  {
    id: 'fallback-3',
    icon: 'users',
    tolstoyProduct: 'AI Shopper',
    title: 'Deploy AI Shopper for product Q&A',
    description:
      'Answer top product questions, recommend sizes and bundles, and let customers add to cart from a brand-trained chat.',
  },
]

export default function FeedbackPage() {
  const navigate = useNavigate()
  const { analysisResult, canSubmit } = useAnalysisInput()

  useEffect(() => {
    if (!analysisResult) {
      navigate(canSubmit ? '/loading-feedback' : '/enter-url', {
        replace: true,
      })
      return
    }
    if (analysisResult.source === 'insufficient-data') {
      navigate('/missing-data', { replace: true })
    }
  }, [analysisResult, canSubmit, navigate])

  if (!analysisResult) {
    return null
  }

  const audit = analysisResult.audit ?? {}
  const storeName = audit.storeName ?? 'Your store'
  const summary =
    audit.summary ??
    'Your storefront is a strong fit for interactive video and AI-powered shopping experiences.'
  const recommendations =
    audit.recommendations?.length >= 3
      ? audit.recommendations.slice(0, 3)
      : DEFAULT_RECOMMENDATIONS

  return (
    <main className="feedback-page" data-page="feedback">
      <header className="feedback-page-header">
        <Link to="/" className="feedback-page-logo-link">
          <img
            src="/tolstoy-icon.svg"
            alt="Tolstoy"
            className="feedback-page-logo"
          />
        </Link>
      </header>

      <div className="feedback-page-body">
        <div className="feedback-page-hero">
          <p className="feedback-page-badge">
            <span className="feedback-page-badge-icon" aria-hidden="true">
              ✓
            </span>
            Analysis Complete
          </p>
          <h1 className="feedback-page-title">Your Strategy is Ready!</h1>
          <p className="feedback-page-summary">{summary}</p>
          <p className="feedback-page-recommendations-label">
            Here are our 3 top recommendations:
          </p>
        </div>

        <div className="feedback-page-cards">
          {recommendations.map((recommendation) => (
            <FeedbackRecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
              storeName={storeName}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
