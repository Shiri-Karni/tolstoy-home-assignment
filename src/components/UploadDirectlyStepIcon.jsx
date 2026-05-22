/** Step illustration icons for the upload-directly questionnaire. */
const ICONS = {
  building: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 20V6l8-4 8 4v14H4z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.75" />
      <path d="M9 10h1M14 10h1M9 13h1M14 13h1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ),
  chart: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 18V6M8 18v-5M12 18V9M16 18v-3M20 18V4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  ),
  sparkle: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3z"
        fill="currentColor"
      />
      <path
        d="M5 14l.8 2.6L8.4 17l-2.6.8L5 20.4l-.8-2.6L1.6 17l2.6-.8L5 14zM19 5l.6 1.8L21.4 7.4l-1.8.6L19 9.8l-.6-1.8L16.6 7.4l1.8-.6L19 5z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  ),
  users: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3 19c0-3.3 2.7-5 6-5s6 1.7 6 5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="17" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M14 19c.3-2.2 1.8-3.5 4.5-3.5 2.2 0 3.8 1 4.5 3.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  ),
  goals: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19l3-9 4 2 3-7 4 14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="6" r="1.5" fill="currentColor" />
    </svg>
  ),
}

export default function UploadDirectlyStepIcon({ name }) {
  return (
    <span className="upload-directly-step-icon" aria-hidden="true">
      {ICONS[name] ?? ICONS.sparkle}
    </span>
  )
}
