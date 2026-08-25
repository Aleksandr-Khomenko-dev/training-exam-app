import { useMemo, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const STATUS_BADGE = {
  completed: { en: 'Completed', ru: 'Завершён', cls: 'is-completed' },
  timeout: { en: 'Time ran out', ru: 'Время вышло', cls: 'is-timeout' },
  abandoned: { en: 'Exited early', ru: 'Прерван', cls: 'is-abandoned' },
}

export default function HistoryScreen({ data, sections, onOpenAttempt, onDeleteAttempt, onBackHome }) {
  const { lang, t } = useLanguage()
  const [sectionFilter, setSectionFilter] = useState('ALL')

  const attempts = useMemo(
    () => (sectionFilter === 'ALL' ? data.attempts : data.attempts.filter((a) => a.section === sectionFilter)),
    [data.attempts, sectionFilter]
  )

  const sectionLabel = (key) => sections.find((s) => s.key === key)?.[lang === 'ru' ? 'labelRu' : 'label'] ?? key

  const handleDelete = (e, id) => {
    e.stopPropagation()
    if (window.confirm(t.confirmDeleteAttempt)) onDeleteAttempt(id)
  }

  return (
    <div className="history-screen">
      <header className="history-screen__header">
        <h1>{t.historyTitle}</h1>
        <button className="btn-secondary" onClick={onBackHome}>🏠 {t.dashboard}</button>
      </header>

      <div className="history-screen__filters">
        <label>
          {t.filterBySection}
          <select value={sectionFilter} onChange={(e) => setSectionFilter(e.target.value)}>
            <option value="ALL">{t.allSections}</option>
            {sections.map((s) => (
              <option key={s.key} value={s.key}>
                {lang === 'ru' ? s.labelRu : s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {attempts.length === 0 && <p className="history-screen__empty">{t.noAttemptsYet}</p>}

      <ul className="history-attempt-list">
        {attempts.map((a) => {
          const pct = Math.round((a.correctCount / a.total) * 100)
          const badge = STATUS_BADGE[a.status] ?? STATUS_BADGE.completed
          const hasDetail = !!a.results
          const minutes = String(Math.floor(a.durationSec / 60)).padStart(2, '0')
          const seconds = String(a.durationSec % 60).padStart(2, '0')
          return (
            <li
              key={a.id}
              className={`history-attempt${hasDetail ? ' is-clickable' : ''}`}
              onClick={() => hasDetail && onOpenAttempt(a)}
            >
              <div className="history-attempt__main">
                <span className="history-attempt__section">{sectionLabel(a.section)}</span>
                <span className="history-attempt__date">{new Date(a.date).toLocaleString(lang === 'ru' ? 'ru-RU' : 'en-US')}</span>
                <span className={`history-attempt__badge ${badge.cls}`}>{badge[lang]}</span>
              </div>
              <div className="history-attempt__stats">
                <span className="history-attempt__score">{a.correctCount}/{a.total} ({pct}%)</span>
                <span className="history-attempt__duration">⏱ {minutes}:{seconds}</span>
                {!hasDetail && <span className="history-attempt__nodetail">{t.detailExpired}</span>}
                <button className="link-btn link-btn--danger" onClick={(e) => handleDelete(e, a.id)}>
                  {t.deleteAttempt}
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
