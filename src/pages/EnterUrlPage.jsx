/**
 * Collects a store URL or screenshot uploads, then navigates to loading.
 * URL and file input are mutually exclusive. Resets context on mount.
 */
import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ACCEPTED_FILE_EXTENSIONS,
  useAnalysisInput,
} from '../context/AnalysisInputContext.jsx'
import { isValidStoreAddress } from '../mock/resolveAudit.js'

const URL_ERROR_MESSAGE =
  'The address you entered is not valid, please enter the right address'

export default function EnterUrlPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [urlError, setUrlError] = useState('')

  const {
    storeUrl,
    uploadedFiles,
    inputMode,
    canSubmit,
    setStoreUrl,
    setUploadedFiles,
    isAcceptedFile,
    clearAnalysisInput,
  } = useAnalysisInput()

  useEffect(() => {
    clearAnalysisInput()
    setUrlError('')
  }, [clearAnalysisInput])

  const urlInputDisabled = inputMode === 'files'
  const uploadDisabled = inputMode === 'url'

  function handleUrlChange(event) {
    const value = event.target.value
    setStoreUrl(value)
    if (urlError && isValidStoreAddress(value)) {
      setUrlError('')
    }
  }

  function handleUrlBlur() {
    const trimmed = storeUrl.trim()
    if (trimmed && !isValidStoreAddress(trimmed)) {
      setUrlError(URL_ERROR_MESSAGE)
    }
  }

  function handleFilesSelected(fileList) {
    if (uploadDisabled || !fileList?.length) return
    const files = Array.from(fileList).filter(isAcceptedFile)
    if (files.length > 0) {
      setUploadedFiles(files)
      setUrlError('')
    }
  }

  function handleFileInputChange(event) {
    handleFilesSelected(event.target.files)
    event.target.value = ''
  }

  function handleDropZoneClick() {
    if (!uploadDisabled) {
      fileInputRef.current?.click()
    }
  }

  function handleDragOver(event) {
    event.preventDefault()
    if (!uploadDisabled) setIsDragOver(true)
  }

  function handleDragLeave() {
    setIsDragOver(false)
  }

  function handleDrop(event) {
    event.preventDefault()
    setIsDragOver(false)
    if (!uploadDisabled) {
      handleFilesSelected(event.dataTransfer.files)
    }
  }

  function handleAnalyzeClick() {
    if (inputMode === 'url') {
      if (!isValidStoreAddress(storeUrl)) {
        setUrlError(URL_ERROR_MESSAGE)
        return
      }
    }

    if (!canSubmit) return
    navigate('/loading-feedback')
  }

  return (
    <main className="enter-url-page" data-page="enter-url">
      <header className="enter-url-header">
        <Link to="/" className="enter-url-logo-link">
          <img
            src="/tolstoy-icon.svg"
            alt="Tolstoy"
            className="enter-url-logo"
          />
        </Link>
      </header>

      <div className="enter-url-content">
        <h1 className="enter-url-title">Enter your store&apos;s URL</h1>

        <div className="enter-url-input-section">
          <div
            className={`enter-url-input-wrapper${urlInputDisabled ? ' enter-url-input-wrapper--disabled' : ''}${urlError ? ' enter-url-input-wrapper--error' : ''}`}
          >
            <img
              src="/globe-icon.svg"
              alt=""
              className="enter-url-input-icon"
              aria-hidden="true"
            />
            <input
              type="url"
              className="enter-url-input"
              placeholder="e.g., www.yoursitename.com"
              value={storeUrl}
              onChange={handleUrlChange}
              onBlur={handleUrlBlur}
              disabled={urlInputDisabled}
              aria-label="Store URL"
              aria-invalid={urlError ? 'true' : undefined}
              aria-describedby={urlError ? 'enter-url-error' : undefined}
            />
          </div>
          {urlError && (
            <p id="enter-url-error" className="enter-url-error" role="alert">
              {urlError}
            </p>
          )}
        </div>

        <div className="enter-url-divider" role="separator">
          <span className="enter-url-divider-line" />
          <span className="enter-url-divider-text">OR</span>
          <span className="enter-url-divider-line" />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="enter-url-file-input"
          accept={ACCEPTED_FILE_EXTENSIONS}
          multiple
          onChange={handleFileInputChange}
          tabIndex={-1}
          aria-hidden="true"
        />

        <button
          type="button"
          className={`enter-url-dropzone${isDragOver ? ' enter-url-dropzone--drag-over' : ''}${uploadDisabled ? ' enter-url-dropzone--disabled' : ''}`}
          onClick={handleDropZoneClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          disabled={uploadDisabled}
          aria-label="Upload store images"
        >
          <img
            src="/upload-icon.svg"
            alt=""
            className="enter-url-dropzone-icon"
            aria-hidden="true"
          />
          <p className="enter-url-dropzone-title">Drag &amp; Drop Images</p>
          <p className="enter-url-dropzone-description">
            Site not live yet? Drag and drop screenshots of your store, and our
            agent will analyze its design and layout.
          </p>
          {uploadedFiles.length > 0 && (
            <p className="enter-url-dropzone-files">
              {uploadedFiles.length} file{uploadedFiles.length === 1 ? '' : 's'}{' '}
              selected
            </p>
          )}
        </button>

        <button
          type="button"
          className="enter-url-submit-button"
          onClick={handleAnalyzeClick}
          disabled={!canSubmit}
        >
          Analyze Store
        </button>
      </div>
    </main>
  )
}
