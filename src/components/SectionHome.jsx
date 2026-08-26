import { useMemo, useState } from 'react'
import { useLanguage, localizeSection, localizeTopic, localizeQuestion } from '../i18n/LanguageContext.jsx'
import { shuffleOptions } from '../utils/shuffleOptions.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Picks n questions from the pool, favoring ones that were never seen (or seen longest ago),
// so repeated visits surface fresh material instead of the same random subset every time.
//
// Questions can opt into a `variantGroup`: several questions that test the same underlying
// concept with different surface details (different variable names, numbers, code shape).
// Freshness is scheduled per *concept* (the group), not per literal question — and once a
// concept comes up again, whichever of its variants was shown least recently is the one
// picked. That way, correctly answering one variant doesn't make you see the exact same
// question again next time; a sibling variant testing the same rule steps in instead,
// which pushes you to actually understand the rule rather than memorize one instance of it.
// Questions without a variantGroup behave exactly as before (a group of one).
function pickFreshQuestions(pool, n, questionStats) {
  const groups = new Map()
  for (const q of pool) {
    const key = q.variantGroup ?? q.id
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(q)
  }

  const rankedGroups = [...groups.values()]
    .map((variants) => ({
      variants,
      groupLastSeenAt: Math.max(0, ...variants.map((v) => questionStats[v.id]?.lastSeenAt ?? 0)),
      rand: Math.random(),
    }))
    .sort((a, b) => a.groupLastSeenAt - b.groupLastSeenAt || a.rand - b.rand)

  const picked = rankedGroups.slice(0, n).map(({ variants }) => {
    if (variants.length === 1) return variants[0]
    return variants
      .map((v) => ({ v, lastSeenAt: questionStats[v.id]?.lastSeenAt ?? 0, rand: Math.random() }))
      .sort((a, b) => a.lastSeenAt - b.lastSeenAt || a.rand - b.rand)[0].v
  })

  return shuffle(picked)
}

const GENERIC_SEC_PER_QUESTION = 90 // used for sections with no official exam timing (Interview, Code)

export default function SectionHome({ section, progress, onStart, onResetSection }) {
  const { lang, t } = useLanguage()
  const [selectedTopics, setSelectedTopics] = useState(() => new Set(section.topics.map((tp) => tp.slug)))
  const [count, setCount] = useState(Math.min(20, section.questions.length))
  const [timed, setTimed] = useState(false)

  const { label, subtitle } = localizeSection(section, lang)
  const examMeta = section.examMeta

  const topicStats = useMemo(() => {
    const map = {}
    for (const tp of section.topics) map[tp.slug] = { seen: 0, correct: 0, total: 0 }
    for (const q of section.questions) {
      map[q.topic].total += 1
      const stat = progress.questionStats[q.id]
      if (stat) {
        map[q.topic].seen += stat.seen
        map[q.topic].correct += stat.correct
      }
    }
    return map
  }, [section, progress])

  const overall = useMemo(() => {
    let seen = 0
    let correct = 0
    for (const stat of Object.values(topicStats)) {
      seen += stat.seen
      correct += stat.correct
    }
    return { seen, correct, accuracy: seen ? Math.round((correct / seen) * 100) : null }
  }, [topicStats])

  const recentAttempts = useMemo(
    () => progress.attempts.filter((a) => a.section === section.key).slice(0, 5),
    [progress, section]
  )

  const availableCount = useMemo(
    () => section.questions.filter((q) => selectedTopics.has(q.topic)).length,
    [section, selectedTopics]
  )

  const toggleTopic = (slug) => {
    setSelectedTopics((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else next.add(slug)
      return next
    })
  }

  const toggleAll = () => {
    setSelectedTopics((prev) =>
      prev.size === section.topics.length ? new Set() : new Set(section.topics.map((tp) => tp.slug))
    )
  }

  const localizeForRun = (q) => {
    const localized = localizeQuestion(q, lang)
    const topicMeta = section.topics.find((tp) => tp.slug === q.topic)
    const withTopic = { ...localized, topicTitle: topicMeta ? localizeTopic(topicMeta, lang) : q.topic }
    return shuffleOptions(withTopic)
  }

  const timeLimitForCount = (n) => {
    if (!timed) return null
    if (examMeta) return Math.round((examMeta.timeLimitMin * 60 * n) / examMeta.fullQuestionCount)
    return n * GENERIC_SEC_PER_QUESTION
  }

  const handleStart = () => {
    const pool = section.questions.filter((q) => selectedTopics.has(q.topic))
    const n = Math.min(count, pool.length)
    const picked = pickFreshQuestions(pool, n, progress.questionStats).map(localizeForRun)
    onStart(picked, [...selectedTopics], timeLimitForCount(n))
  }

  // One-click "just this topic, as its own test" — handy for topics like the LeetCode-style
  // Easy/Medium/Hard tiers, which the user wants to run as standalone practice sets.
  const handleStartTopic = (slug) => {
    const pool = section.questions.filter((q) => q.topic === slug)
    if (pool.length === 0) return
    const n = Math.min(count, pool.length)
    const picked = pickFreshQuestions(pool, n, progress.questionStats).map(localizeForRun)
    onStart(picked, [slug], timeLimitForCount(n))
  }

  const handleFullExam = () => {
    if (!examMeta) return
    const n = Math.min(examMeta.fullQuestionCount, section.questions.length)
    const picked = pickFreshQuestions(section.questions, n, progress.questionStats).map(localizeForRun)
    const timeLimitSec = Math.round((examMeta.timeLimitMin * 60 * n) / examMeta.fullQuestionCount)
    onStart(picked, section.topics.map((tp) => tp.slug), timeLimitSec)
  }

  return (
    <div className="section-home" style={{ '--accent': section.accent }}>
      <header className="section-home__header">
        <h1>{label}</h1>
        <p>{subtitle}</p>
      </header>

      <div className="stat-cards">
        <div className="stat-card">
          <span className="stat-card__value">{section.questions.length}</span>
          <span className="stat-card__label">{t.questionsInBank}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{overall.accuracy === null ? '—' : `${overall.accuracy}%`}</span>
          <span className="stat-card__label">{t.overallAccuracy}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{recentAttempts.length ? recentAttempts.length : 0}</span>
          <span className="stat-card__label">{t.recentTestsTaken}</span>
        </div>
      </div>

      {examMeta && (
        <div className="exam-callout">
          <div className="exam-callout__info">{t.realExamInfo(examMeta.fullQuestionCount, examMeta.timeLimitMin, examMeta.passPercent)}</div>
          <button className="btn-primary" onClick={handleFullExam}>
            {t.fullExamButton(Math.min(examMeta.fullQuestionCount, section.questions.length))}
          </button>
        </div>
      )}

      <div className="topic-panel">
        <div className="topic-panel__head">
          <h2>{t.topics}</h2>
          <button className="link-btn" onClick={toggleAll}>
            {selectedTopics.size === section.topics.length ? t.deselectAll : t.selectAll}
          </button>
        </div>
        <ul className="topic-list">
          {section.topics.map((tp) => {
            const stat = topicStats[tp.slug]
            const acc = stat.seen ? Math.round((stat.correct / stat.seen) * 100) : null
            return (
              <li key={tp.slug} className="topic-list__item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedTopics.has(tp.slug)}
                    onChange={() => toggleTopic(tp.slug)}
                  />
                  <span className="topic-list__title">{localizeTopic(tp, lang)}</span>
                  <span className="topic-list__count">{stat.total} {t.questionsAbbrev}</span>
                  <button
                    type="button"
                    className="topic-list__start"
                    onClick={(e) => {
                      e.preventDefault()
                      handleStartTopic(tp.slug)
                    }}
                  >
                    {t.startThisTopic}
                  </button>
                </label>
                <div className="topic-bar">
                  <div
                    className="topic-bar__fill"
                    style={{ width: `${acc ?? 0}%`, opacity: acc === null ? 0.15 : 1 }}
                  />
                </div>
                <span className="topic-list__accuracy">{acc === null ? t.notAttempted : `${acc}% ${t.correctSuffix}`}</span>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="start-panel">
        <label className="start-panel__count">
          {t.numberOfQuestions}
          <input
            type="range"
            min={5}
            max={Math.max(5, availableCount)}
            step={5}
            value={Math.min(count, Math.max(5, availableCount))}
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <span>{t.ofAvailable(Math.min(count, availableCount), availableCount)}</span>
          {availableCount > 0 && Math.min(count, availableCount) >= availableCount && (
            <span className="start-panel__hint">{t.smallPoolHint(availableCount)}</span>
          )}
        </label>
        <label className="timed-toggle">
          <input type="checkbox" checked={timed} onChange={(e) => setTimed(e.target.checked)} />
          <span>{timed ? t.timedLabel : t.untimedHint}</span>
        </label>
        <button className="btn-primary" disabled={availableCount === 0} onClick={handleStart}>
          {t.startTest}
        </button>
      </div>

      {recentAttempts.length > 0 && (
        <div className="history-panel">
          <div className="topic-panel__head">
            <h2>{t.recentAttempts}</h2>
            <button className="link-btn link-btn--danger" onClick={() => onResetSection(section.key)}>
              {t.resetProgress}
            </button>
          </div>
          <ul className="history-list">
            {recentAttempts.map((a) => (
              <li key={a.id}>
                <span>{new Date(a.date).toLocaleString()}</span>
                <span>{a.correctCount}/{a.total} ({Math.round((a.correctCount / a.total) * 100)}%)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
