/**
 * Mock “AI analysis” routing: validates URLs, picks store audits, and handles
 * special demo cases (blanksite.com, upload-directly questionnaire).
 */
import { STORE_AUDITS } from './storeAudits.js'

/**
 * Returns true if the string looks like a usable store URL or domain.
 * Accepts: https://example.com, www.example.com, example.com/path
 */
export function isValidStoreAddress(input) {
  const raw = (input ?? '').trim()
  if (!raw) return false

  try {
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
    const url = new URL(withProtocol)
    const host = url.hostname.replace(/^www\./i, '')
    if (!host || host.length < 4) return false
    if (!host.includes('.')) return false
    if (!/^[a-z0-9.-]+$/i.test(host)) return false
    const tld = host.split('.').pop()
    if (!tld || tld.length < 2) return false
    return true
  } catch {
    return false
  }
}

function normalizeHostname(input) {
  try {
    const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`
    return new URL(withProtocol).hostname.replace(/^www\./i, '').toLowerCase()
  } catch {
    return ''
  }
}

/** Demo stores where the agent cannot access or analyze site content. */
const INSUFFICIENT_DATA_HOSTS = new Set(['blanksite.com'])

/**
 * Valid URL but not enough accessible content for analysis (demo: blanksite.com).
 */
export function isInsufficientDataStore(storeUrl) {
  const host = normalizeHostname((storeUrl ?? '').trim())
  return host.length > 0 && INSUFFICIENT_DATA_HOSTS.has(host)
}

/**
 * Match a URL to one of the five named demo stores.
 * @returns {string | null} audit id or null if no named match
 */
export function matchKnownStoreId(storeUrl) {
  const host = normalizeHostname(storeUrl)
  if (!host) return null

  for (const [id, audit] of Object.entries(STORE_AUDITS)) {
    if (id === 'general' || id === 'generalFromPhotos') continue
    if (audit.urlPatterns?.some((pattern) => host.includes(pattern.toLowerCase()))) {
      return id
    }
  }
  return null
}

/**
 * Resolve mock audit for the current analysis input.
 *
 * @param {{ storeUrl?: string, uploadedFiles?: File[], inputMode?: 'url' | 'files' | null }} params
 * @returns {{ audit: import('./storeAudits.js').StoreAudit | null, source: 'known-store' | 'general-url' | 'photos' | 'insufficient-data' }}
 */
export function resolveAudit({ storeUrl = '', uploadedFiles = [], inputMode = null }) {
  if (inputMode === 'files' || uploadedFiles.length > 0) {
    return { audit: STORE_AUDITS.generalFromPhotos, source: 'photos' }
  }

  const trimmed = storeUrl.trim()
  if (!isValidStoreAddress(trimmed)) {
    return { audit: STORE_AUDITS.general, source: 'general-url' }
  }

  if (isInsufficientDataStore(trimmed)) {
    return { audit: null, source: 'insufficient-data' }
  }

  const knownId = matchKnownStoreId(trimmed)
  if (knownId && STORE_AUDITS[knownId]) {
    return { audit: STORE_AUDITS[knownId], source: 'known-store' }
  }

  const general = { ...STORE_AUDITS.general }
  try {
    const host = normalizeHostname(trimmed)
    general.storeName = host || 'Your store'
  } catch {
    /* keep default */
  }

  return { audit: general, source: 'general-url' }
}

/**
 * Mock audit after the upload-directly questionnaire (always general recommendations).
 *
 * @param {{ brandName?: string, field?: string, story?: string, audience?: string, contentGoals?: string }} answers
 */
export function resolveUploadDirectlyAudit(answers = {}) {
  const brandName = (answers.brandName ?? '').trim() || 'Your store'
  const field = (answers.field ?? '').trim()
  const story = (answers.story ?? '').trim()
  const audience = (answers.audience ?? '').trim()
  const goals = (answers.contentGoals ?? '').trim()

  const audit = {
    ...STORE_AUDITS.general,
    storeName: brandName,
    industry: field || STORE_AUDITS.general.industry,
  }

  const contextParts = [story, audience, goals].filter(Boolean)
  if (contextParts.length > 0) {
    audit.summary = `Based on what you shared about ${brandName}, you're building a brand with clear goals but a site that still reads like a static catalog. Your answers point to opportunities for shoppable video, AI-guided shopping, and richer product storytelling — exactly where Tolstoy fits.`
  }

  return { audit, source: 'upload-directly' }
}

/**
 * Simulated analysis delay (ms) for loading screen.
 */
export const MOCK_ANALYSIS_DURATION_MS = 3200
