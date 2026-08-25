import { useMemo } from 'react'
import { useLanguage, localizeSection, localizeTopic } from '../i18n/LanguageContext.jsx'
import { getStudyTip } from '../data/studyTips.js'
import LogoMark from './LogoMark.jsx'

const WEAK_TOPIC_THRESHOLD = 70
const MIN_SEEN_FOR_SIGNAL = 3 // ignore topics with too few attempts to mean anything yet

const STATUS_DOT = {
  completed: 'is-completed',
  timeout: 'is-timeout',
  abandoned: 'is-abandoned',
}

export default function Dashboard({ sections, progress, onOpenSection, onOpenHistory }) {
  const { lang, t } = useLanguage()

  const globalStats = useMemo(() => {
    let seen = 0
    let correct = 0
    for (const stat of Object.values(progress.questionStats)) {
      seen += stat.seen
      correct += stat.correct
    }
    return {
      seen,
      accuracy: seen ? Math.round((correct / seen) * 100) : null,
      attemptCount: progress.attempts.length,
    }
  }, [progress])

  const sectionCards = useMemo(
    () =>
      sections.map((s) => {
        let seen = 0
        let correct = 0
        for (const stat of Object.values(progress.questionStats)) {
          if (stat.section !== s.key) continue
          seen += stat.seen
          correct += stat.correct
        }
        const sectionAttempts = progress.attempts.filter((a) => a.section === s.key)
        return {
          section: s,
          accuracy: seen ? Math.round((correct / seen) * 100) : null,
          attemptCount: sectionAttempts.length,
          lastAttempt: sectionAttempts[0] ?? null,
        }
      }),
    [sections, progress]
  )

  const weakTopics = useMemo(() => {
    const map = new Map()
    for (const [, stat] of Object.entries(progress.questionStats)) {
      const key = `${stat.section}::${stat.topic}`
      const entry = map.get(key) ?? { section: stat.section, topic: stat.topic, seen: 0, correct: 0 }
      entry.seen += stat.seen
      entry.correct += stat.correct
      map.set(key, entry)
    }
    return [...map.values()]
      .map((e) => ({ ...e, pct: Math.round((e.correct / e.seen) * 100) }))
      .filter((e) => e.seen >= MIN_SEEN_FOR_SIGNAL && e.pct < WEAK_TOPIC_THRESHOLD)
      .sort((a, b) => a.pct - b.pct)
      .slice(0, 5)
      .map((e) => {
        const sectionMeta = sections.find((s) => s.key === e.section)
        const topicMeta = sectionMeta?.topics.find((tp) => tp.slug === e.topic)
        return {
          ...e,
          sectionLabel: sectionMeta ? localizeSection(sectionMeta, lang).label : e.section,
          title: topicMeta ? localizeTopic(topicMeta, lang) : e.topic.replace(/-/g, ' '),
          tip: getStudyTip(e.topic, lang),
        }
      })
  }, [sections, progress, lang])

  const recentActivity = progress.attempts.slice(0, 6)
  const sectionLabelFor = (key) => {
    const s = sections.find((sec) => sec.key === key)
    return s ? localizeSection(s, lang).label : key
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <LogoMark size={52} />
        <div>
          <h1>{t.dashboardTitle}</h1>
          <p>{t.dashboardSubtitle}</p>
        </div>
      </header>

      <div className="stat-cards">
        <div className="stat-card">
          <span className="stat-card__value">{globalStats.attemptCount}</span>
          <span className="stat-card__label">{t.totalAttempts}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{globalStats.accuracy === null ? '—' : `${globalStats.accuracy}%`}</span>
          <span className="stat-card__label">{t.overallAccuracy}</span>
        </div>
        <div className="stat-card">
          <span className="stat-card__value">{globalStats.seen}</span>
          <span className="stat-card__label">{t.questionsAnswered}</span>
        </div>
      </div>

      <div className="dashboard__section-grid">
        {sectionCards.map(({ section, accuracy, attemptCount, lastAttempt }) => {
          const { label, subtitle } = localizeSection(section, lang)
          return (
            <div key={section.key} className="dashboard-card" style={{ '--accent': section.accent }}>
              <div className="dashboard-card__top">
                <h2>{label}</h2>
                <span className="dashboard-card__accuracy">{accuracy === null ? t.notAttempted : `${accuracy}%`}</span>
              </div>
              <p className="dashboard-card__subtitle">{subtitle}</p>
              <div className="topic-bar">
                <div className="topic-bar__fill" style={{ width: `${accuracy ?? 0}%`, opacity: accuracy === null ? 0.15 : 1 }} />
              </div>
              <div className="dashboard-card__meta">
                <span>{t.questionsInBank}: {section.questions.length}</span>
                <span>{t.recentTestsTaken}: {attemptCount}</span>
              </div>
              {lastAttempt && (
                <div className="dashboard-card__last">
                  {t.lastAttempt}: {new Date(lastAttempt.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')} ·{' '}
                  {Math.round((lastAttempt.correctCount / lastAttempt.total) * 100)}%
                </div>
              )}
              <button className="btn-primary" onClick={() => onOpenSection(section.key)}>
                {attemptCount > 0 ? t.continueSection : t.startSection}
              </button>
            </div>
          )
        })}
      </div>

      <div className="dashboard__lower">
        <div className="dashboard-panel">
          <div className="topic-panel__head">
            <h2>{t.globalWeakTopicsTitle}</h2>
          </div>
          {weakTopics.length === 0 ? (
            <p className="dashboard-panel__empty">
              {globalStats.attemptCount === 0 ? t.dashboardNoDataYet : t.dashboardNoWeakSpots}
            </p>
          ) : (
            <ul className="dashboard-weak-list">
              {weakTopics.map((tp) => (
                <li key={`${tp.section}::${tp.topic}`}>
                  <div className="dashboard-weak-list__head">
                    <strong>{tp.title}</strong>
                    <span className="dashboard-weak-list__section">{tp.sectionLabel}</span>
                    <span className="dashboard-weak-list__pct">{tp.pct}%</span>
                  </div>
                  {tp.tip && <p className="dashboard-weak-list__tip">{tp.tip}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dashboard-panel">
          <div className="topic-panel__head">
            <h2>{t.recentAttempts}</h2>
            <button className="link-btn" onClick={onOpenHistory}>{t.viewAllHistory}</button>
          </div>
          {recentActivity.length === 0 ? (
            <p className="dashboard-panel__empty">{t.dashboardNoDataYet}</p>
          ) : (
            <ul className="dashboard-recent-list">
              {recentActivity.map((a) => (
                <li key={a.id}>
                  <span className={`dashboard-recent-list__dot ${STATUS_DOT[a.status] ?? 'is-completed'}`} />
                  <span className="dashboard-recent-list__section">{sectionLabelFor(a.section)}</span>
                  <span className="dashboard-recent-list__date">
                    {new Date(a.date).toLocaleDateString(lang === 'ru' ? 'ru-RU' : 'en-US')}
                  </span>
                  <span className="dashboard-recent-list__score">
                    {a.correctCount}/{a.total} ({Math.round((a.correctCount / a.total) * 100)}%)
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
