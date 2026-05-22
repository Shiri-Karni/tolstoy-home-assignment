/** Modal overlay for full-size recommendation example SVG previews. */
import { useEffect } from 'react'

export default function ExampleLightbox({
  imageSrc,
  imageAlt,
  caption,
  onClose,
}) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="example-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Feature example preview"
      onClick={onClose}
    >
      <div
        className="example-lightbox-panel"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="example-lightbox-close"
          onClick={onClose}
          aria-label="Close example"
        >
          ×
        </button>
        <img
          src={imageSrc}
          alt={imageAlt}
          className="example-lightbox-image"
        />
        {caption && (
          <p className="example-lightbox-caption">{caption}</p>
        )}
      </div>
    </div>
  )
}
