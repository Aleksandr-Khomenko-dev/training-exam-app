import { useState } from 'react'
import { sections, getSection } from './data/sections.js'
import { useProgress } from './hooks/useProgress.js'
import { useAuth } from './hooks/useAuth.js'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ThemeProvider } from './i18n/ThemeContext.jsx'
import TabNav from './components/TabNav.jsx'
import Dashboard from './components/Dashboard.jsx'
import SectionHome from './components/SectionHome.jsx'
import TestRunner from './components/TestRunner.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import HistoryScreen from './components/HistoryScreen.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import './App.css'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Gate />
      </LanguageProvider>
    </ThemeProvider>
  )
}

// Simple local login gate — remembers the session in localStorage so returning to the app
// on the same device/browser skips straight past this screen. There is no backend, so this
// cannot be real multi-device authentication; it's a personal lock screen for this app.
function Gate() {
  const auth = useAuth()

  if (!auth.loggedIn) {
    return (
      <LoginScreen
        hasAccount={!!auth.account}
        onSignUp={auth.signUp}
        onLogIn={auth.logIn}
        onResetAccount={auth.resetAccount}
      />
    )
  }

  return <AppShell onLogOut={auth.logOut} />
}

function AppShell({ onLogOut }) {
  const [activeKey, setActiveKey] = useState('OCA')
  const [view, setView] = useState('dashboard') // 'dashboard' | 'home' | 'test' | 'results' | 'history'
  const [activeQuestions, setActiveQuestions] = useState([])
  const [activeTopics, setActiveTopics] = useState([])
  const [activeTimeLimit, setActiveTimeLimit] = useState(null)
  const [lastAttempt, setLastAttempt] = useState(null)
  const [viewedAttemptId, setViewedAttemptId] = useState(null)

  const progress = useProgress()
  const section = getSection(activeKey)

  const selectSection = (key) => {
    setActiveKey(key)
    setView('home')
  }

  const handleStart = (questions, topics, timeLimitSec) => {
    setActiveQuestions(questions)
    setActiveTopics(topics)
    setActiveTimeLimit(timeLimitSec ?? null)
    setView('test')
  }

  const handleFinish = (attempt) => {
    progress.recordAttempt(attempt)
    if (attempt.status === 'abandoned') {
      // The user chose to leave mid-test — the attempt is saved to history for later
      // review, but there's nothing to celebrate/dwell on, so just go back home.
      setView('home')
      return
    }
    setLastAttempt(attempt)
    setViewedAttemptId(null)
    setView('results')
  }

  const openHistoryAttempt = (attempt) => {
    setLastAttempt(attempt)
    setViewedAttemptId(attempt.id)
    setView('results')
  }

  const attemptForResults =
    viewedAttemptId != null
      ? progress.data.attempts.find((a) => a.id === viewedAttemptId) ?? lastAttempt
      : lastAttempt

  return (
    <div className="app">
      <TabNav
        sections={sections}
        active={activeKey}
        onSelect={selectSection}
        onOpenHistory={() => setView('history')}
        onOpenDashboard={() => setView('dashboard')}
        onLogOut={onLogOut}
        historyActive={view === 'history'}
        dashboardActive={view === 'dashboard'}
      />
      <main className="app__main">
        {view === 'dashboard' && (
          <Dashboard
            sections={sections}
            progress={progress.data}
            onOpenSection={selectSection}
            onOpenHistory={() => setView('history')}
          />
        )}
        {view === 'home' && (
          <SectionHome
            section={section}
            progress={progress.data}
            onStart={handleStart}
            onResetSection={progress.resetSection}
          />
        )}
        {view === 'test' && (
          <TestRunner
            questions={activeQuestions}
            topics={activeTopics}
            timeLimitSec={activeTimeLimit}
            onFinish={handleFinish}
            onExit={() => setView('home')}
          />
        )}
        {view === 'results' && attemptForResults && (
          <ResultsScreen
            attempt={attemptForResults}
            fromHistory={viewedAttemptId != null}
            onBackHome={() => {
              setViewedAttemptId(null)
              setView(viewedAttemptId != null ? 'history' : 'home')
            }}
          />
        )}
        {view === 'history' && (
          <HistoryScreen
            data={progress.data}
            sections={sections}
            onOpenAttempt={openHistoryAttempt}
            onDeleteAttempt={progress.deleteAttempt}
            onBackHome={() => setView('dashboard')}
          />
        )}
      </main>
    </div>
  )
}
