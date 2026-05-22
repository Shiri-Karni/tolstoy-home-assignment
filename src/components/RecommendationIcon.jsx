/** Colored icon badge for recommendation cards (video / growth / users). */
const ICON_CONFIG = {
  video: { className: 'feedback-card-icon-box--video', label: 'Video' },
  growth: { className: 'feedback-card-icon-box--growth', label: 'Growth' },
  users: { className: 'feedback-card-icon-box--users', label: 'Shoppers' },
}

export default function RecommendationIcon({ type }) {
  const config = ICON_CONFIG[type] ?? ICON_CONFIG.video

  return (
    <div
      className={`feedback-card-icon-box ${config.className}`}
      aria-hidden="true"
    >
      {type === 'video' && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="14"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M17 9l4-2v10l-4-2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {type === 'growth' && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 16l5-5 4 4 7-9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 6h5v5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {type === 'users' && (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
          <path
            d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M14 19c.3-2.5 2-4.5 4.5-4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  )
}
