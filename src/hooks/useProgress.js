import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'javaCertStudio.progress.v2'
const LEGACY_STORAGE_KEY = 'javaCertStudio.progress.v1'

// Full per-question results are only kept for the most recent attempts (they're the
// bulky part — question text, options, explanation, per-question chosen answers).
// Older attempts are trimmed down to their summary fields so localStorage doesn't grow
// without bound, but the summary (score, date, status, topics) is kept forever so the
// history list and stats stay accurate.
const MAX_DETAILED_ATTEMPTS = 40
const MAX_ATTEMPTS = 300

const emptyData = () => ({ attempts: [], questionStats: {} })

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { attempts: parsed.attempts ?? [], questionStats: parsed.questionStats ?? {} }
    }
    // One-time migration from the older summary-only store, if present.
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
    if (legacy) {
      const parsed = JSON.parse(legacy)
      return {
        attempts: (parsed.attempts ?? []).map((a) => ({ ...a, status: a.status ?? 'completed' })),
        questionStats: parsed.questionStats ?? {},
      }
    }
    return emptyData()
  } catch {
    return emptyData()
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage full (private mode, quota, etc.) — drop detailed results and retry once,
    // then give up silently rather than crashing the app over a persistence failure.
    try {
      const trimmed = {
        ...data,
        attempts: data.attempts.map((a) => ({ ...a, results: undefined })),
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
    } catch {
      // give up — progress just won't persist this time
    }
  }
}

export function useProgress() {
  const [data, setData] = useState(load)

  useEffect(() => {
    save(data)
  }, [data])

  const recordAttempt = useCallback((attempt) => {
    setData((prev) => {
      const questionStats = { ...prev.questionStats }
      const seenAt = Date.parse(attempt.date) || Date.now()
      for (const q of attempt.results) {
        // Skip questions the user never actually answered (e.g. left blank on an
        // abandoned/timed-out attempt) — they shouldn't count as "seen" or wrong.
        if (!q.chosen || q.chosen.length === 0) continue
        const existing = questionStats[q.id] ?? { seen: 0, correct: 0 }
        questionStats[q.id] = {
          seen: existing.seen + 1,
          correct: existing.correct + (q.isCorrect ? 1 : 0),
          lastResult: q.isCorrect,
          lastSeenAt: seenAt,
          topic: q.topic,
          section: q.section,
        }
      }

      const newAttempt = {
        id: attempt.id,
        section: attempt.section,
        topics: attempt.topics,
        date: attempt.date,
        total: attempt.total,
        answeredCount: attempt.answeredCount ?? attempt.results.filter((r) => r.chosen?.length > 0).length,
        correctCount: attempt.correctCount,
        durationSec: attempt.durationSec,
        status: attempt.status ?? 'completed', // 'completed' | 'timeout' | 'abandoned'
        results: attempt.results,
      }

      let attempts = [newAttempt, ...prev.attempts].slice(0, MAX_ATTEMPTS)
      attempts = attempts.map((a, i) => (i < MAX_DETAILED_ATTEMPTS ? a : { ...a, results: undefined }))

      return { attempts, questionStats }
    })
  }, [])

  const deleteAttempt = useCallback((attemptId) => {
    setData((prev) => ({
      ...prev,
      attempts: prev.attempts.filter((a) => a.id !== attemptId),
    }))
  }, [])

  const resetAll = useCallback(() => {
    setData(emptyData())
  }, [])

  const resetSection = useCallback((sectionKey) => {
    setData((prev) => ({
      attempts: prev.attempts.filter((a) => a.section !== sectionKey),
      questionStats: Object.fromEntries(
        Object.entries(prev.questionStats).filter(([, v]) => v.section !== sectionKey)
      ),
    }))
  }, [])

  return { data, recordAttempt, deleteAttempt, resetAll, resetSection }
}
