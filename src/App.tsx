
import { useEffect, useState } from 'react'
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'

import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Layout from './components/Layout'
import {
  Overview,
  Market,
  Skills,
  Careers,
  Hiring,
  Reports,
} from './pages/Dashboard'
import { supabase } from './lib/supabase'

function Protected({ session }: { session: Session | null }) {
  const location = useLocation()

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Layout />
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    let active = true

    supabase.auth.getSession().then(({ data, error }) => {
      if (!active) return

      if (error) {
        console.error('Could not retrieve session:', error.message)
      }

      setSession(data.session)
      setCheckingSession(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
      setCheckingSession(false)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  if (checkingSession) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          color: '#243B35',
        }}
      >
        Checking your session...
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/"
        element={session ? <Navigate to="/app" replace /> : <Landing />}
      />

      <Route
        path="/login"
        element={session ? <Navigate to="/app" replace /> : <Auth mode="login" />}
      />

      <Route
        path="/register"
        element={session ? <Navigate to="/app" replace /> : <Auth mode="register" />}
      />

      <Route
        path="/app"
        element={<Protected session={session} />}
      >
        <Route index element={<Overview />} />
        <Route path="market" element={<Market />} />
        <Route path="skills" element={<Skills />} />
        <Route path="careers" element={<Careers />} />
        <Route path="hiring" element={<Hiring />} />
        <Route path="reports" element={<Reports />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
