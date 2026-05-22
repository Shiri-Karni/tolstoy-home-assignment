/**
 * Simulated analysis loading screen. Resolves a mock audit, then routes to
 * /feedback or /missing-data (blanksite.com / insufficient-data).
 */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAnalysisInput } from '../context/AnalysisInputContext.jsx'
import {
  LOADING_MESSAGE_INTERVAL_MS,
  LOADING_STATUS_MESSAGES,
} from '../mock/loadingMessages.js'
import {
  MOCK_ANALYSIS_DURATION_MS,
  resolveAudit,
  resolveUploadDirectlyAudit,
} from '../mock/resolveAudit.js'

export default function LoadingFeedbackPage() {
  const navigate = useNavigate()
  const {
    storeUrl,
    uploadedFiles,
    inputMode,
    canSubmit,
    uploadDirectlyPending,
    uploadDirectlyAnswers,
    setAnalysisResult,
  } = useAnalysisInput()

  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const fromUploadDirectly = uploadDirectlyPending

    if (!canSubmit && !fromUploadDirectly) {
      navigate('/enter-url', { replace: true })
      return
    }

    const result = fromUploadDirectly
      ? resolveUploadDirectlyAudit(uploadDirectlyAnswers)
      : resolveAudit({ storeUrl, uploadedFiles, inputMode })
    setAnalysisResult(result)

    const startTime = Date.now()

    const messageTimer = setInterval(() => {
      setMessageIndex((i) => (i + 1) % LOADING_STATUS_MESSAGES.length)
    }, LOADING_MESSAGE_INTERVAL_MS)

    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const next = Math.min(100, (elapsed / MOCK_ANALYSIS_DURATION_MS) * 100)
      setProgress(next)
    }, 50)

    const doneTimer = setTimeout(() => {
      setProgress(100)
      const destination =
        result.source === 'insufficient-data' ? '/missing-data' : '/feedback'
      navigate(destination, { replace: true })
    }, MOCK_ANALYSIS_DURATION_MS)

    return () => {
      clearInterval(messageTimer)
      clearInterval(progressTimer)
      clearTimeout(doneTimer)
    }
  }, [
    canSubmit,
    uploadDirectlyPending,
    uploadDirectlyAnswers,
    storeUrl,
    uploadedFiles,
    inputMode,
    navigate,
    setAnalysisResult,
  ])

  if (!canSubmit && !uploadDirectlyPending) {
    return null
  }

  return (
    <main className="loading-feedback-page" data-page="loading-feedback">
      <header className="loading-feedback-header">
        <Link to="/" className="loading-feedback-logo-link">
          <img
            src="/tolstoy-icon.svg"
            alt="Tolstoy"
            className="loading-feedback-logo"
          />
        </Link>
      </header>

      <div className="loading-feedback-content">
        <div className="loading-feedback-dots" aria-hidden="true">
          <span className="loading-feedback-dot" />
          <span className="loading-feedback-dot" />
          <span className="loading-feedback-dot" />
        </div>

        <p
          key={messageIndex}
          className="loading-feedback-status"
          role="status"
          aria-live="polite"
        >
          {LOADING_STATUS_MESSAGES[messageIndex]}
        </p>

        <div
          className="loading-feedback-progress-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Analysis progress"
        >
          <div
            className="loading-feedback-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </main>
  )
}
