
import { useEffect, useState } from 'react'
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import {
  Bell,
  Menu,
  Search,
  X,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  ChartNoAxesCombined,
  Target,
  Compass,
  Users,
  FileChartColumn,
  Sparkles,
  ArrowUpRight,
  UserRound,
  Settings,
} from 'lucide-react'
import type { User } from '@supabase/supabase-js'
import { brand } from '../config/brand'
import Brand from './Brand'
import { supabase } from '../lib/supabase'

const icons: Record<string, any> = {
  LayoutDashboard,
  ChartNoAxesCombined,
  Target,
  Compass,
  Users,
  FileChartColumn,
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [accountOpen, setAccountOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [signingOut, setSigningOut] = useState(false)

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    let active = true

    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return

      if (error) {
        console.error('Could not load account:', error.message)
        return
      }

      setUser(data.user)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [])

  const fullName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'Pathora Member'

  const initials =
    fullName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part: string) => part[0]?.toUpperCase())
      .join('') || 'PM'

  const current =
    brand.navigation.find(n => n.path === location.pathname)?.label ||
    (location.pathname.endsWith('/profile') ? 'My Profile' : 'Overview')

  async function signOut() {
    setSigningOut(true)

    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Sign out failed:', error.message)
      setSigningOut(false)
      return
    }

    setAccountOpen(false)
    navigate('/login', { replace: true })
  }

  return (
    <div className="app-shell">
      {open && (
        <button
          className="mobile-scrim"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-top">
          <Brand light />
          <button
            className="icon-button mobile-close"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="side-nav">
          {brand.navigation.map(item => {
            const Icon = icons[item.icon]

            if (!Icon) return null

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/app'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `side-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.label === 'Hiring console' && (
                  <span className="nav-count">4</span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-spacer" />

        <div className="sidebar-help">
          <div className="help-icon"><Sparkles size={17} /></div>
          <strong>Your next step awaits.</strong>
          <p>Small skills. Meaningful progress.</p>
          <button onClick={() => navigate('/app/careers')}>
            Explore pathways <ArrowUpRight size={14} />
          </button>
        </div>

        <div className="profile-mini">
          <div className="avatar">{initials}</div>
          <div className="profile-text">
            <strong>{fullName}</strong>
            <span>Personal workspace</span>
          </div>
          <button
            className="icon-button"
            aria-label="Account menu"
            aria-expanded={accountOpen}
            onClick={() => {
              setAccountOpen(!accountOpen)
              setNotificationsOpen(false)
            }}
          >
            <ChevronDown size={16} />
          </button>
        </div>

        {accountOpen && (
          <div className="account-pop">
            <p>{user?.email}</p>
            <button onClick={() => {
              setAccountOpen(false)
              navigate('/app/profile')
            }}>
              <UserRound size={15} /> My Profile
            </button>
            <button onClick={() => {
              setAccountOpen(false)
              navigate('/app/profile')
            }}>
              <Settings size={15} /> Account settings
            </button>
            <button onClick={signOut} disabled={signingOut}>
              <LogOut size={15} />
              {signingOut ? 'Signing out...' : 'Sign out'}
            </button>
          </div>
        )}
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button
            className="icon-button menu-toggle"
            aria-label="Open navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={21} />
          </button>

          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="crumb-slash">/</span>
            <strong>{current}</strong>
          </div>

          <div className="topbar-actions">
            <label className="global-search">
              <Search size={16} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e =>
                  e.key === 'Enter' &&
                  navigate(`/app/market?q=${encodeURIComponent(query)}`)
                }
                placeholder="Search opportunities..."
                aria-label="Search opportunities"
              />
              <kbd>↵</kbd>
            </label>

            <button
              className={`icon-button notification-button ${
                notificationsOpen ? 'selected' : ''
              }`}
              aria-label="Notifications"
              onClick={() => {
                setNotificationsOpen(!notificationsOpen)
                setAccountOpen(false)
              }}
            >
              <Bell size={18} />
              <i />
            </button>

            <button
              type="button"
              className="top-avatar"
              aria-label="Open my profile"
              onClick={() => navigate('/app/profile')}
            >
              {initials}
            </button>
          </div>
        </header>

        {notificationsOpen && (
          <div className="notification-pop">
            <strong>You're all caught up</strong>
            <p>New career suggestions will appear here.</p>
          </div>
        )}

        <div className="page-content">
          <Outlet />
        </div>

        <footer className="app-footer">
          <span>© 2026 {brand.name}</span>
          <span>Personal workspace</span>
        </footer>
      </main>
    </div>
  )
}
