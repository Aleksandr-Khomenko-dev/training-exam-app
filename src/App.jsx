import { useState } from 'react'
import { sections, getSection } from './data/sections.js'
import { useProgress } from './hooks/useProgress.js'
import { LanguageProvider } from './i18n/LanguageContext.jsx'
import { ThemeProvider } from './i18n/ThemeContext.jsx'
import TabNav from './components/TabNav.jsx'
import Dashboard from './components/Dashboard.jsx'
import SectionHome from './components/SectionHome.jsx'
import TestRunner from './components/TestRunner.jsx'
import ResultsScreen from './components/ResultsScreen.jsx'
import HistoryScreen from './components/HistoryScreen.jsx'
import './App.css'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppShell />
      </LanguageProvider>
    </ThemeProvider>
  )
}

function AppShell() {
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
