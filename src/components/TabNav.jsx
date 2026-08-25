import { useLanguage, localizeSection } from '../i18n/LanguageContext.jsx'
import { useTheme } from '../i18n/ThemeContext.jsx'
import LogoMark from './LogoMark.jsx'

// Minimalist "2x2 grid" glyph, in place of the 🏠 emoji, to match the flat monogram
// branding rather than mixing in a cartoon-style icon font.
function DashboardIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="tab-nav__tab-icon">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="8.5" y="1.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="1.5" y="8.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
      <rect x="8.5" y="8.5" width="6" height="6" rx="1.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

export default function TabNav({ sections, active, onSelect, onOpenHistory, onOpenDashboard, historyActive, dashboardActive }) {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const noneActive = historyActive || dashboardActive

  return (
    <nav className="tab-nav">
      <button className="tab-nav__brand tab-nav__brand--btn" onClick={onOpenDashboard}>
        <LogoMark size={30} />
        <span className="tab-nav__title">{t.appName}</span>
      </button>
      <div className="tab-nav__tabs">
        <button
          className={`tab-nav__tab tab-nav__tab--dashboard${dashboardActive ? ' is-active' : ''}`}
          onClick={onOpenDashboard}
        >
          <DashboardIcon /> {t.dashboard}
        </button>
        {sections.map((s) => (
          <button
            key={s.key}
            className={`tab-nav__tab${!noneActive && active === s.key ? ' is-active' : ''}`}
            style={!noneActive && active === s.key ? { '--accent': s.accent } : undefined}
            onClick={() => onSelect(s.key)}
          >
            {localizeSection(s, lang).label}
          </button>
        ))}
        <button
          className={`tab-nav__tab tab-nav__tab--history${historyActive ? ' is-active' : ''}`}
          onClick={onOpenHistory}
        >
          📊 {t.history}
        </button>
      </div>
      <div className="tab-nav__controls">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? t.switchToLight : t.switchToDark}
          title={theme === 'dark' ? t.switchToLight : t.switchToDark}
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        <div className="lang-switch">
          <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>
            EN
          </button>
          <button className={lang === 'ru' ? 'is-active' : ''} onClick={() => setLang('ru')}>
            RU
          </button>
        </div>
      </div>
    </nav>
  )
}
