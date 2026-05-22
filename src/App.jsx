/**
 * Root application shell: global analysis state and client-side routes.
 *
 * @see AnalysisInputProvider for shared URL / file / questionnaire state
 */
import { Routes, Route } from 'react-router-dom'
import { AnalysisInputProvider } from './context/AnalysisInputContext.jsx'
import OnboardingPage from './pages/OnboardingPage.jsx'
import EnterUrlPage from './pages/EnterUrlPage.jsx'
import LoadingFeedbackPage from './pages/LoadingFeedbackPage.jsx'
import FeedbackPage from './pages/FeedbackPage.jsx'
import MissingDataPage from './pages/MissingDataPage.jsx'
import UploadDirectlyPage from './pages/UploadDirectlyPage.jsx'

function App() {
  return (
    <AnalysisInputProvider>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/enter-url" element={<EnterUrlPage />} />
        <Route path="/loading-feedback" element={<LoadingFeedbackPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/missing-data" element={<MissingDataPage />} />
        <Route path="/upload-directly" element={<UploadDirectlyPage />} />
      </Routes>
    </AnalysisInputProvider>
  )
}

export default App
