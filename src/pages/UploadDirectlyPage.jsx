/**
 * Five-step questionnaire when the site cannot be crawled.
 * Completing the flow runs mock analysis and shows general recommendations.
 */
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UploadDirectlyStepIcon from '../components/UploadDirectlyStepIcon.jsx'
import { useAnalysisInput } from '../context/AnalysisInputContext.jsx'
import {
  UPLOAD_DIRECTLY_STEPS,
  UPLOAD_DIRECTLY_TOTAL_STEPS,
} from '../data/uploadDirectlySteps.js'

export default function UploadDirectlyPage() {
  const navigate = useNavigate()
  const {
    uploadDirectlyAnswers,
    setUploadDirectlyField,
    resetUploadDirectlyAnswers,
    startUploadDirectlyAnalysis,
  } = useAnalysisInput()

  const [stepIndex, setStepIndex] = useState(0)
  const step = UPLOAD_DIRECTLY_STEPS[stepIndex]
  const value = uploadDirectlyAnswers[step.field] ?? ''
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === UPLOAD_DIRECTLY_STEPS.length - 1
  const canContinue = !step.mandatory || value.trim().length > 0

  useEffect(() => {
    resetUploadDirectlyAnswers()
    setStepIndex(0)
  }, [resetUploadDirectlyAnswers])

  function handleContinue() {
    if (!canContinue) return
    if (isLastStep) {
      startUploadDirectlyAnalysis()
      navigate('/loading-feedback', { replace: true })
      return
    }
    setStepIndex((i) => i + 1)
  }

  function handleBack() {
    if (!isFirstStep) {
      setStepIndex((i) => i - 1)
    }
  }

  function handleSkip() {
    setUploadDirectlyField(step.field, '')
    if (isLastStep) {
      startUploadDirectlyAnalysis()
      navigate('/loading-feedback', { replace: true })
    } else {
      setStepIndex((i) => i + 1)
    }
  }

  return (
    <main className="upload-directly-page" data-page="upload-directly">
      <header className="upload-directly-header">
        <Link to="/" className="upload-directly-logo-link">
          <img
            src="/tolstoy-icon.svg"
            alt="Tolstoy"
            className="upload-directly-logo"
          />
        </Link>
      </header>

      <div className="upload-directly-progress-wrap">
        <div
          className="upload-directly-progress"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={UPLOAD_DIRECTLY_TOTAL_STEPS}
          aria-valuenow={step.step}
          aria-label={`Step ${step.step} of ${UPLOAD_DIRECTLY_TOTAL_STEPS}`}
        >
          {UPLOAD_DIRECTLY_STEPS.map((s) => (
            <span
              key={s.step}
              className={
                s.step === step.step
                  ? 'upload-directly-progress-segment upload-directly-progress-segment--active'
                  : 'upload-directly-progress-segment'
              }
            />
          ))}
        </div>
        <p className="upload-directly-step-label">
          Step {step.step} of {UPLOAD_DIRECTLY_TOTAL_STEPS}
        </p>
      </div>

      <div className="upload-directly-content">
        <UploadDirectlyStepIcon name={step.icon} />

        <h1 className="upload-directly-title">{step.title}</h1>

        {step.subtitle && (
          <p className="upload-directly-subtitle">{step.subtitle}</p>
        )}

        {step.inputType === 'textarea' ? (
          <textarea
            className="upload-directly-textarea"
            placeholder={step.placeholder}
            value={value}
            onChange={(event) =>
              setUploadDirectlyField(step.field, event.target.value)
            }
            rows={5}
            aria-required={step.mandatory}
          />
        ) : (
          <input
            type="text"
            className="upload-directly-input"
            placeholder={step.placeholder}
            value={value}
            onChange={(event) =>
              setUploadDirectlyField(step.field, event.target.value)
            }
            aria-required={step.mandatory}
          />
        )}

        <div
          className={`upload-directly-actions${isFirstStep ? ' upload-directly-actions--first' : ''}`}
        >
          {!isFirstStep && (
            <button
              type="button"
              className="upload-directly-button upload-directly-button--back"
              onClick={handleBack}
            >
              ← Back
            </button>
          )}
          <button
            type="button"
            className="upload-directly-button upload-directly-button--primary"
            onClick={handleContinue}
            disabled={!canContinue}
          >
            {step.primaryLabel ?? 'Continue'}
            {!isLastStep && <span aria-hidden="true"> →</span>}
          </button>
        </div>

        {step.allowSkip && (
          <button
            type="button"
            className="upload-directly-skip"
            onClick={handleSkip}
          >
            Skip this step
          </button>
        )}
      </div>
    </main>
  )
}
