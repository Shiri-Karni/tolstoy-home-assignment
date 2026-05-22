/**
 * Shown when the store URL is valid but content could not be analyzed.
 * Demo trigger: blanksite.com. Offers retry or the upload-directly flow.
 */
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAnalysisInput } from '../context/AnalysisInputContext.jsx'
import { isInsufficientDataStore } from '../mock/resolveAudit.js'

const HELP_ITEMS = [
  'Make sure your website is publicly accessible',
  'Check that images on your site are loading correctly',
  'Ensure your site has enough content and product images',
  'If you prefer, you can try uploading text directly about your brand and products',
]

export default function MissingDataPage() {
  const navigate = useNavigate()
  const { storeUrl, analysisResult } = useAnalysisInput()

  const isMissingDataFlow =
    analysisResult?.source === 'insufficient-data' ||
    isInsufficientDataStore(storeUrl)

  useEffect(() => {
    if (!isMissingDataFlow) {
      navigate('/enter-url', { replace: true })
    }
  }, [isMissingDataFlow, navigate])

  if (!isMissingDataFlow) {
    return null
  }

  return (
    <main className="missing-data-page" data-page="missing-data">
      <header className="missing-data-header">
        <Link to="/" className="missing-data-logo-link">
          <img
            src="/tolstoy-icon.svg"
            alt="Tolstoy"
            className="missing-data-logo"
          />
        </Link>
      </header>

      <div className="missing-data-content">
        <div className="missing-data-alert-icon" aria-hidden="true">
          <span className="missing-data-alert-mark">!</span>
        </div>

        <h1 className="missing-data-title">We need a bit more information</h1>

        <p className="missing-data-description">
          We weren&apos;t able to fully understand your site&apos;s content and
          imagery. This could be because the site is private, images aren&apos;t
          loading properly, or there isn&apos;t enough content to analyze.
        </p>

        <section className="missing-data-help-card" aria-labelledby="missing-data-help-heading">
          <h2 id="missing-data-help-heading" className="missing-data-help-heading">
            <span className="missing-data-help-icon" aria-hidden="true">
              ?
            </span>
            What might help:
          </h2>
          <ul className="missing-data-help-list">
            {HELP_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="missing-data-actions">
          <Link to="/enter-url" className="missing-data-button missing-data-button--primary">
            Try Again
          </Link>
          <Link
            to="/upload-directly"
            className="missing-data-button missing-data-button--secondary"
          >
            <img
              src="/upload-icon.svg"
              alt=""
              className="missing-data-button-icon"
              aria-hidden="true"
            />
            Upload Content Directly
          </Link>
        </div>

        <p className="missing-data-support">
          Need help?{' '}
          <a
            href="https://www.gotolstoy.com/contact-sales"
            target="_blank"
            rel="noopener noreferrer"
            className="missing-data-support-link"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </main>
  )
}
