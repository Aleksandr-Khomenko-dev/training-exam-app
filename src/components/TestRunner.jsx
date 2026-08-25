import { useEffect, useMemo, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import QuestionNavigator from './QuestionNavigator.jsx'

function isMatch(chosen, correct) {
  const a = chosen.slice().sort()
  const b = correct.slice().sort()
  return a.length === b.length && a.every((v, i) => v === b[i])
}

const emptyState = () => ({ chosen: [], checked: false, marked: false })

export default function TestRunner({ questions, topics, timeLimitSec, onFinish, onExit }) {
  const { t } = useLanguage()
  const [index, setIndex] = useState(0)
  // questionId -> { chosen: number[], checked: boolean, marked: boolean }
  const [answers, setAnswers] = useState({})
  const [navigatorOpen, setNavigatorOpen] = useState(false)
  const [tick, setTick] = useState(0)
  const startTimeRef = useRef(Date.now())
  const finishedRef = useRef(false)

  const q = questions[index]
  const isMulti = q.correct.length > 1
  const state = answers[q.id] ?? emptyState()
  const { chosen, checked, marked } = state
  const isCorrectCurrent = checked ? isMatch(chosen, q.correct) : null

  const buildResults = () =>
    questions.map((question) => {
      const st = answers[question.id] ?? emptyState()
      const sel = st.chosen.slice().sort()
      return { ...question, chosen: sel, isCorrect: isMatch(sel, question.correct) }
    })

  const finish = (status) => {
    if (finishedRef.current) return
    finishedRef.current = true
    const results = buildResults()
    const correctCount = results.filter((r) => r.isCorrect).length
    const answeredCount = results.filter((r) => r.chosen.length > 0).length
    onFinish({
      id: `attempt-${Date.now()}`,
      section: q.section,
      topics,
      date: new Date().toISOString(),
      total: results.length,
      answeredCount,
      correctCount,
      durationSec: Math.floor((Date.now() - startTimeRef.current) / 1000),
      status,
      results,
    })
  }

  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // `tick` is bumped every second purely to force this render to recompute elapsed time.
  void tick
  const elapsedSec = Math.floor((Date.now() - startTimeRef.current) / 1000)
  const remainingSec = timeLimitSec != null ? timeLimitSec - elapsedSec : null

  useEffect(() => {
    if (remainingSec != null && remainingSec <= 0) finish('timeout')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSec])

  const displaySec = remainingSec != null ? Math.max(0, remainingSec) : elapsedSec
  const minutes = String(Math.floor(displaySec / 60)).padStart(2, '0')
  const seconds = String(displaySec % 60).padStart(2, '0')
  const isLowTime = remainingSec != null && remainingSec <= 60

  const selectOption = (optIdx) => {
    if (checked) return
    setAnswers((prev) => {
      const current = prev[q.id] ?? emptyState()
      let nextChosen
      if (isMulti) {
        nextChosen = current.chosen.includes(optIdx)
          ? current.chosen.filter((i) => i !== optIdx)
          : [...current.chosen, optIdx].sort()
      } else {
        nextChosen = [optIdx]
      }
      return { ...prev, [q.id]: { ...current, chosen: nextChosen } }
    })
  }

  const checkAnswer = () => {
    if (chosen.length === 0) return
    setAnswers((prev) => ({ ...prev, [q.id]: { ...(prev[q.id] ?? emptyState()), checked: true } }))
  }

  const toggleMark = () => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { ...(prev[q.id] ?? emptyState()), marked: !(prev[q.id]?.marked) },
    }))
  }

  const jumpTo = (i) => {
    setIndex(i)
    setNavigatorOpen(false)
  }

  const goNext = () => {
    if (index < questions.length - 1) setIndex((i) => i + 1)
    else setNavigatorOpen(true)
  }

  const handleSubmit = () => {
    const answeredCount = questions.filter((qq) => (answers[qq.id]?.chosen.length ?? 0) > 0).length
    const ok = window.confirm(t.confirmSubmit(answeredCount, questions.length))
    if (ok) finish('completed')
  }

  const handleExit = () => {
    const answeredCount = questions.filter((qq) => (answers[qq.id]?.chosen.length ?? 0) > 0).length
    if (answeredCount === 0) {
      onExit()
      return
    }
    const ok = window.confirm(t.confirmExit(answeredCount, questions.length))
    if (ok) finish('abandoned')
  }

  const answeredCount = useMemo(
    () => Object.values(answers).filter((a) => a.chosen.length > 0).length,
    [answers]
  )

  return (
    <div className="test-runner">
      <div className="exam-header">
        <div className="exam-header__row">
          <button className="link-btn link-btn--light" onClick={handleExit}>{t.exitTest}</button>
          <div className="exam-header__title">{t.examTitle}</div>
          <div className={`exam-header__timer${isLowTime ? ' is-low' : ''}`}>
            <span className="exam-header__timer-label">{t.timeLeft}</span>
            <span className="exam-header__timer-value">⏱ {minutes}:{seconds}</span>
          </div>
        </div>
        <div className="exam-header__row exam-header__toolbar">
          <div className="exam-header__progress">
            {t.questionCounter(index + 1, questions.length)} · {t.answered(answeredCount, questions.length)}
          </div>
          <button className="exam-header__navbtn" onClick={() => setNavigatorOpen(true)}>
            ☰ {t.questionList}
          </button>
        </div>
      </div>

      <div className="progress-track">
        <div className="progress-track__fill" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
      </div>

      <div className="question-card">
        <div className="question-card__top">
          <div className="question-card__meta">{q.topicTitle ?? q.topic.replace(/-/g, ' ')}</div>
          <button className={`mark-btn${marked ? ' is-marked' : ''}`} onClick={toggleMark}>
            🚩 {marked ? t.marked : t.markForReview}
          </button>
        </div>
        <pre className="question-card__text">{q.question}</pre>
        {isMulti && <p className="question-card__hint">{t.selectAllThatApply}</p>}

        <ul className="option-list">
          {q.options.map((opt, i) => {
            const isChosen = chosen.includes(i)
            const isCorrectOpt = q.correct.includes(i)
            let cls = isChosen ? ' is-selected' : ''
            if (checked) {
              if (isCorrectOpt) cls = ' is-correct-choice'
              else if (isChosen) cls = ' is-wrong-choice'
            }
            return (
              <li key={i}>
                <label className={`option${cls}`}>
                  <input
                    type={isMulti ? 'checkbox' : 'radio'}
                    name={`q-${q.id}`}
                    checked={isChosen}
                    disabled={checked}
                    onChange={() => selectOption(i)}
                  />
                  <span>{opt}</span>
                </label>
              </li>
            )
          })}
        </ul>

        {!checked && (
          <div className="check-row">
            <button className="btn-secondary" disabled={chosen.length === 0} onClick={checkAnswer}>
              {t.checkAnswer}
            </button>
            <span className="check-row__hint">{t.practiceHint}</span>
          </div>
        )}

        {checked && (
          <div className={`feedback-panel${isCorrectCurrent ? ' is-correct' : ' is-incorrect'}`}>
            <div className="feedback-panel__badge">{isCorrectCurrent ? t.correctBadge : t.incorrectBadge}</div>
            <p className="feedback-panel__explanation">{q.explanation}</p>
          </div>
        )}
      </div>

      <div className="test-runner__nav">
        <button className="btn-secondary" disabled={index === 0} onClick={() => setIndex((i) => i - 1)}>
          {t.previous}
        </button>
        <button className="btn-primary" onClick={goNext}>
          {index < questions.length - 1 ? t.next : t.reviewAndFinish}
        </button>
      </div>

      {navigatorOpen && (
        <QuestionNavigator
          questions={questions}
          answers={answers}
          currentIndex={index}
          onJump={jumpTo}
          onClose={() => setNavigatorOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}
