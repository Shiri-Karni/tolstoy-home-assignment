/** Landing page: intro copy and link to start the store analysis flow. */
import { Link } from 'react-router-dom'

export default function OnboardingPage() {
  return (
    <main className="onboarding-page" data-page="onboarding">
      <div className="onboarding-container">
        <img
          src="/tolstoy-icon.svg"
          alt="Tolstoy"
          className="onboarding-logo"
        />
        <h1 className="onboarding-title">
          Let&apos;s unlock your store&apos;s potential!
        </h1>
        <p className="onboarding-description">
          Our AI will go over your store to craft a custom interactive content
          strategy, building authentic connections that boost engagement
          instantly.
        </p>
        <Link to="/enter-url" className="onboarding-start-button">
          Let&apos;s get started!
        </Link>
      </div>
    </main>
  )
}
