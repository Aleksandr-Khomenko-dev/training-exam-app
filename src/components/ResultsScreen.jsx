import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import { getSection } from '../data/sections.js'
import { getStudyTip } from '../data/studyTips.js'

const WEAK_TOPIC_THRESHOLD = 70 // topics scoring below this % are flagged for review

const STATUS_LABEL = {
  timeout: { en: 'Time ran out before you finished.', ru: 'Время вышло до завершения теста.' },
  abandoned: { en: 'You exited before finishing.', ru: 'Тест был прерван досрочно.' },
}

export default function ResultsScreen({ attempt, onBackHome, fromHistory }) {
  const { lang, t } = useLanguage()
  const [filter, setFilter] = useState('all') // all | incorrect

  const pct = Math.round((attempt.correctCount / attempt.total) * 100)
  const minutes = String(Math.floor(attempt.durationSec / 60)).padStart(2, '0')
  const seconds = String(attempt.durationSec % 60).padStart(2, '0')
  const passThreshold = getSection(attempt.section)?.examMeta?.passPercent ?? 65
  const passed = pct >= passThreshold
  const statusNote = attempt.status && STATUS_LABEL[attempt.status]

  const visible = attempt.results.filter((r) => (filter === 'all' ? true : !r.isCorrect))

  // Group results by topic to reveal which areas need more study, weakest first.
  const topicBreakdown = useMemo(() => {
    const map = new Map()
    for (const r of attempt.results) {
      const key = r.topic
      const entry = map.get(key) ?? { topic: key, title: r.topicTitle ?? key.replace(/-/g, ' '), total: 0, correct: 0, unanswered: 0 }
      entry.total += 1
      if (r.chosen.length === 0) entry.unanswered += 1
      else if (r.isCorrect) entry.correct += 1
      map.set(key, entry)
    }
    return [...map.values()]
      .map((e) => ({ ...e, pct: e.total ? Math.round((e.correct / e.total) * 100) : 0 }))
      .sort((a, b) => a.pct - b.pct)
  }, [attempt.results])

  const weakTopics = topicBreakdown.filter((tp) => tp.pct < WEAK_TOPIC_THRESHOLD)
  const missedQuestions = attempt.results.filter((r) => !r.isCorrect)

  return (
    <div className="results-screen">
      <div className={`results-summary${passed ? ' is-pass' : ' is-fail'}`}>
        <div className="results-summary__score">{pct}%</div>
        <div className="results-summary__details">
          <h1>{passed ? t.niceWork : t.keepPracticing}</h1>
          <p>
            {t.correctOf(attempt.correctCount, attempt.total)} · {minutes}:{seconds} {t.elapsed}
          </p>
          {statusNote && <p className="results-summary__status-note">{statusNote[lang]}</p>}
        </div>
      </div>

      {topicBreakdown.length > 1 && (
        <div className="topic-breakdown">
          <h2>{t.topicBreakdownTitle}</h2>
          <ul className="topic-breakdown__list">
            {topicBreakdown.map((tp) => (
              <li key={tp.topic} className="topic-breakdown__item">
                <div className="topic-breakdown__row">
                  <span className="topic-breakdown__title">{tp.title}</span>
                  <span className="topic-breakdown__pct">{tp.pct}% ({tp.correct}/{tp.total})</span>
                </div>
                <div className="topic-bar">
                  <div
                    className={`topic-bar__fill${tp.pct < WEAK_TOPIC_THRESHOLD ? ' is-weak' : ''}`}
                    style={{ width: `${tp.pct}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {(weakTopics.length > 0 || missedQuestions.length > 0) && (
        <div className="analysis-panel">
          <h2>{t.analysisTitle}</h2>
          {weakTopics.length > 0 ? (
            <>
              <p>{t.analysisWeakIntro}</p>
              <ol className="analysis-panel__topics">
                {weakTopics.map((tp) => {
                  const tip = getStudyTip(tp.topic, lang)
                  return (
                    <li key={tp.topic}>
                      <div className="analysis-panel__topic-head">
                        <strong>{tp.title}</strong>
                        <span className="analysis-panel__topic-score">{tp.pct}% ({t.correctOf(tp.correct, tp.total)})</span>
                      </div>
                      {tip && <p className="analysis-panel__tip">{tip}</p>}
                    </li>
                  )
                })}
              </ol>
            </>
          ) : (
            <p>{t.analysisNoWeakTopics}</p>
          )}
        </div>
      )}

      <div className="results-controls">
        <div className="segmented">
          <button className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>
            {t.all} ({attempt.results.length})
          </button>
          <button className={filter === 'incorrect' ? 'is-active' : ''} onClick={() => setFilter('incorrect')}>
            {t.incorrect} ({missedQuestions.length})
          </button>
        </div>
        <button className="btn-primary" onClick={onBackHome}>
          {fromHistory ? t.backToHistory : t.backToTopics}
        </button>
      </div>

      <ul className="review-list">
        {visible.map((r) => (
          <li key={r.id} className={`review-item${r.isCorrect ? ' is-correct' : ' is-incorrect'}`}>
            <div className="review-item__badge">
              {r.chosen.length === 0 ? t.notAnswered : r.isCorrect ? t.correctBadge : t.incorrectBadge}
            </div>
            <div className="review-item__meta">{r.topicTitle ?? r.topic.replace(/-/g, ' ')}</div>
            <pre className="review-item__question">{r.question}</pre>
            <ul className="option-list option-list--review">
              {r.options.map((opt, i) => {
                const isCorrectOpt = r.correct.includes(i)
                const isChosen = r.chosen.includes(i)
                let cls = ''
                if (isCorrectOpt) cls = 'is-correct-answer'
                else if (isChosen) cls = 'is-wrong-answer'
                return (
                  <li key={i} className={cls}>
                    {isCorrectOpt ? '✔' : isChosen ? '✘' : '·'} {opt}
                  </li>
                )
              })}
            </ul>
            <p className="review-item__explanation">{r.explanation}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
