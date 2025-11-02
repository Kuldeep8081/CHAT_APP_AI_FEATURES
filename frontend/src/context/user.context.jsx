import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from '../config/axios'

const STORAGE_KEY ='chatapp_user'

const UserContext = createContext(null)

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Helpers to decode JWT and check expiry
  const parseJwt = (t) => {
    try {
      const payload = t.split('.')[1]
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
      return JSON.parse(decodeURIComponent(escape(decoded)))
    } catch {
      return null
    }
  }

  const isTokenExpired = (t) => {
    if (!t) return true
    const payload = parseJwt(t)
    if (!payload || !payload.exp) return false
    return Date.now() > payload.exp * 1000
  }

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        if (parsed?.token && !isTokenExpired(parsed.token)) {
          setToken(parsed.token)
          setUser(parsed.user ?? null)
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`
        } else {
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const login = ({ token: newToken, user: newUser = null }) => {
    if (!newToken) return
    setToken(newToken)
    setUser(newUser)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: newToken, user: newUser }))
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
    localStorage.removeItem(STORAGE_KEY)
  }

  const updateUser = (partial) => {
    const updated = { ...(user || {}), ...partial }
    setUser(updated)
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        parsed.user = updated
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed))
      } catch {
        // ignore
      }
    }
  }

  const isAuthenticated = !!token && !isTokenExpired(token)

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, updateUser, isAuthenticated, loading }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}