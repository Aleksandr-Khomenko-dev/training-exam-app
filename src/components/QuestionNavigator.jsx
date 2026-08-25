import { useLanguage } from '../i18n/LanguageContext.jsx'

export default function QuestionNavigator({ questions, answers, currentIndex, onJump, onClose, onSubmit }) {
  const { t } = useLanguage()

  const answeredCount = questions.filter((q) => (answers[q.id]?.chosen.length ?? 0) > 0).length
  const markedCount = questions.filter((q) => answers[q.id]?.marked).length

  return (
    <div className="navigator-overlay" role="dialog" aria-modal="true">
      <div className="navigator-panel">
        <h2>{t.reviewTitle}</h2>

        <div className="navigator-summary">
          <span><strong>{answeredCount}</strong> / {questions.length} {t.summaryAnswered}</span>
          <span><strong>{questions.length - answeredCount}</strong> {t.summaryUnanswered}</span>
          <span><strong>{markedCount}</strong> {t.summaryMarked}</span>
        </div>

        <div className="navigator-grid">
          {questions.map((q, i) => {
            const st = answers[q.id]
            const answered = (st?.chosen.length ?? 0) > 0
            const marked = !!st?.marked
            const isCurrent = i === currentIndex
            const cls = [
              'navigator-cell',
              answered ? 'is-answered' : 'is-unanswered',
              marked ? 'is-marked' : '',
              isCurrent ? 'is-current' : '',
            ].filter(Boolean).join(' ')
            return (
              <button key={q.id} className={cls} onClick={() => onJump(i)}>
                {i + 1}
                {marked && <span className="navigator-cell__flag">🚩</span>}
              </button>
            )
          })}
        </div>

        <div className="navigator-legend">
          <span><i className="legend-swatch is-answered" /> {t.answeredStatus}</span>
          <span><i className="legend-swatch is-unanswered" /> {t.notAnsweredStatus}</span>
          <span><i className="legend-swatch is-marked" /> {t.markedStatus}</span>
          <span><i className="legend-swatch is-current" /> {t.currentStatus}</span>
        </div>

        <div className="navigator-actions">
          <button className="btn-secondary" onClick={onClose}>{t.backToExam}</button>
          <button className="btn-primary" onClick={onSubmit}>{t.submitExam}</button>
        </div>
      </div>
    </div>
  )
}
