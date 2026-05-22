/**
 * Shared state for the analysis funnel: store URL, file uploads,
 * upload-directly questionnaire answers, and the resolved mock audit result.
 */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { isValidStoreAddress } from '../mock/resolveAudit.js'

const AnalysisInputContext = createContext(null)

export const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
  'image/gif',
  'image/bmp',
  'image/svg+xml',
  'application/pdf',
]

export const ACCEPTED_FILE_EXTENSIONS =
  '.png,.jpg,.jpeg,.webp,.gif,.bmp,.svg,.pdf'

/** Initial values for the /upload-directly multi-step form. */
export const EMPTY_UPLOAD_DIRECTLY_ANSWERS = {
  brandName: '',
  field: '',
  story: '',
  audience: '',
  contentGoals: '',
}

function isAcceptedFile(file) {
  if (ACCEPTED_FILE_TYPES.includes(file.type)) return true
  const name = file.name.toLowerCase()
  return (
    name.endsWith('.png') ||
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg') ||
    name.endsWith('.webp') ||
    name.endsWith('.gif') ||
    name.endsWith('.bmp') ||
    name.endsWith('.svg') ||
    name.endsWith('.pdf')
  )
}

export function AnalysisInputProvider({ children }) {
  const [storeUrl, setStoreUrlState] = useState('')
  const [uploadedFiles, setUploadedFilesState] = useState([])
  const [analysisResult, setAnalysisResult] = useState(null)
  const [uploadDirectlyAnswers, setUploadDirectlyAnswersState] = useState(
    EMPTY_UPLOAD_DIRECTLY_ANSWERS,
  )
  const [uploadDirectlyPending, setUploadDirectlyPending] = useState(false)

  const inputMode =
    storeUrl.trim().length > 0
      ? 'url'
      : uploadedFiles.length > 0
        ? 'files'
        : null

  const setStoreUrl = useCallback((value) => {
    setStoreUrlState(value)
    if (value.trim().length > 0) {
      setUploadedFilesState([])
    }
  }, [])

  const setUploadedFiles = useCallback((files) => {
    const accepted = files.filter(isAcceptedFile)
    if (accepted.length > 0) {
      setStoreUrlState('')
      setUploadedFilesState(accepted)
    }
  }, [])

  const clearAnalysisInput = useCallback(() => {
    setStoreUrlState('')
    setUploadedFilesState([])
    setAnalysisResult(null)
    setUploadDirectlyAnswersState(EMPTY_UPLOAD_DIRECTLY_ANSWERS)
    setUploadDirectlyPending(false)
  }, [])

  const resetUploadDirectlyAnswers = useCallback(() => {
    setUploadDirectlyAnswersState(EMPTY_UPLOAD_DIRECTLY_ANSWERS)
    setUploadDirectlyPending(false)
  }, [])

  const setUploadDirectlyField = useCallback((field, value) => {
    setUploadDirectlyAnswersState((prev) => ({ ...prev, [field]: value }))
  }, [])

  const startUploadDirectlyAnalysis = useCallback(() => {
    setUploadDirectlyPending(true)
  }, [])

  const canSubmit =
    inputMode === 'files'
      ? uploadedFiles.length > 0
      : inputMode === 'url'
        ? isValidStoreAddress(storeUrl)
        : false

  const value = useMemo(
    () => ({
      storeUrl,
      uploadedFiles,
      inputMode,
      canSubmit,
      setStoreUrl,
      setUploadedFiles,
      clearAnalysisInput,
      isAcceptedFile,
      analysisResult,
      setAnalysisResult,
      uploadDirectlyAnswers,
      uploadDirectlyPending,
      setUploadDirectlyField,
      resetUploadDirectlyAnswers,
      startUploadDirectlyAnalysis,
    }),
    [
      storeUrl,
      uploadedFiles,
      inputMode,
      canSubmit,
      setStoreUrl,
      setUploadedFiles,
      clearAnalysisInput,
      analysisResult,
      uploadDirectlyAnswers,
      uploadDirectlyPending,
      setUploadDirectlyField,
      resetUploadDirectlyAnswers,
      startUploadDirectlyAnalysis,
    ],
  )

  return (
    <AnalysisInputContext.Provider value={value}>
      {children}
    </AnalysisInputContext.Provider>
  )
}

export function useAnalysisInput() {
  const context = useContext(AnalysisInputContext)
  if (!context) {
    throw new Error('useAnalysisInput must be used within AnalysisInputProvider')
  }
  return context
}
