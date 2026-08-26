import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext.jsx'
import LogoMark from './LogoMark.jsx'

export default function LoginScreen({ hasAccount, onSignUp, onLogIn, onResetAccount }) {
  const { lang, setLang, t } = useLanguage()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password) {
      setError(t.authFillAllFields)
      return
    }
    setBusy(true)
    try {
      if (hasAccount) {
        const ok = await onLogIn(username.trim(), password)
        if (!ok) setError(t.authWrongCredentials)
      } else {
        if (password.length < 4) {
          setError(t.authPasswordTooShort)
          return
        }
        if (password !== confirm) {
          setError(t.authPasswordsDontMatch)
          return
        }
        await onSignUp(username.trim(), password)
      }
    } finally {
      setBusy(false)
    }
  }

  const handleReset = () => {
    if (window.confirm(t.authConfirmReset)) onResetAccount()
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-card__brand">
          <LogoMark size={40} />
          <span className="tab-nav__title" style={{ color: 'var(--text)', WebkitTextFillColor: 'initial', background: 'none' }}>
            {t.appName}
          </span>
        </div>
        <h1>{hasAccount ? t.authLoginTitle : t.authSignUpTitle}</h1>
        <p className="auth-card__subtitle">{hasAccount ? t.authLoginSubtitle : t.authSignUpSubtitle}</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            {t.authUsername}
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </label>
          <label>
            {t.authPassword}
            <input
              type="password"
              autoComplete={hasAccount ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          {!hasAccount && (
            <label>
              {t.authConfirmPassword}
              <input
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </label>
          )}

          {error && <p className="auth-form__error">{error}</p>}

          <button className="btn-primary" type="submit" disabled={busy}>
            {hasAccount ? t.authLoginButton : t.authSignUpButton}
          </button>
        </form>

        {hasAccount && (
          <button className="link-btn link-btn--danger auth-card__reset" onClick={handleReset}>
            {t.authForgotPassword}
          </button>
        )}

        <div className="auth-card__lang lang-switch">
          <button className={lang === 'en' ? 'is-active' : ''} onClick={() => setLang('en')}>
            EN
          </button>
          <button className={lang === 'ru' ? 'is-active' : ''} onClick={() => setLang('ru')}>
            RU
          </button>
        </div>
      </div>
    </div>
  )
}
