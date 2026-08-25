import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { strings } from './strings.js'

const STORAGE_KEY = 'javaCertStudio.lang'
const LanguageContext = createContext(null)

function loadLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'ru') return stored
  } catch {
    // ignore
  }
  return 'en'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(loadLang)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((l) => (l === 'en' ? 'ru' : 'en')),
      t: strings[lang],
    }),
    [lang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}

// Picks the localized text for a topic/section object that carries `title`/`titleRu`
// or `label`/`labelRu` + `subtitle`/`subtitleRu` fields.
export function localizeTopic(topic, lang) {
  return lang === 'ru' && topic.titleRu ? topic.titleRu : topic.title
}

export function localizeSection(section, lang) {
  return {
    label: lang === 'ru' && section.labelRu ? section.labelRu : section.label,
    subtitle: lang === 'ru' && section.subtitleRu ? section.subtitleRu : section.subtitle,
  }
}

// Merges a question's English fields with its `ru` overlay (question/options/explanation).
export function localizeQuestion(q, lang) {
  if (lang !== 'ru' || !q.ru) return q
  return {
    ...q,
    question: q.ru.question ?? q.question,
    options: q.ru.options ?? q.options,
    explanation: q.ru.explanation ?? q.explanation,
  }
}
