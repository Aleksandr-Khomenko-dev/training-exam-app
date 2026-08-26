import { useCallback, useEffect, useState } from 'react'
import { hashPassword } from '../utils/passwordHash.js'

const ACCOUNT_KEY = 'javaCertStudio.auth.account' // { username, passwordHash }
const SESSION_KEY = 'javaCertStudio.auth.session' // 'in' | absent

function loadAccount() {
  try {
    const raw = localStorage.getItem(ACCOUNT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function loadSession() {
  try {
    return localStorage.getItem(SESSION_KEY) === 'in'
  } catch {
    return false
  }
}

export function useAuth() {
  const [account, setAccount] = useState(loadAccount)
  // "Remember me" by default: once logged in, the session flag persists in localStorage,
  // so reopening the app later (same browser/device) skips straight past the login screen.
  const [loggedIn, setLoggedIn] = useState(loadSession)

  useEffect(() => {
    try {
      if (account) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account))
      else localStorage.removeItem(ACCOUNT_KEY)
    } catch {
      // ignore
    }
  }, [account])

  useEffect(() => {
    try {
      if (loggedIn) localStorage.setItem(SESSION_KEY, 'in')
      else localStorage.removeItem(SESSION_KEY)
    } catch {
      // ignore
    }
  }, [loggedIn])

  const signUp = useCallback(async (username, password) => {
    const passwordHash = await hashPassword(username, password)
    setAccount({ username, passwordHash })
    setLoggedIn(true)
  }, [])

  const logIn = useCallback(
    async (username, password) => {
      if (!account) return false
      const passwordHash = await hashPassword(username, password)
      const ok = account.username.toLowerCase() === username.toLowerCase() && account.passwordHash === passwordHash
      if (ok) setLoggedIn(true)
      return ok
    },
    [account]
  )

  const logOut = useCallback(() => {
    setLoggedIn(false)
  }, [])

  // Forgetting the password has no server-side recovery in a backend-less app — the only
  // way forward is starting over with a fresh account (existing test history/progress in
  // localStorage is untouched by this, since it's a separate store).
  const resetAccount = useCallback(() => {
    setAccount(null)
    setLoggedIn(false)
  }, [])

  return { account, loggedIn, signUp, logIn, logOut, resetAccount }
}
