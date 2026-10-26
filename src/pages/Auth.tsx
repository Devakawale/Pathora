
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  CheckCircle2,
} from 'lucide-react'
import Brand from '../components/Brand'
import { brand } from '../config/brand'
import { supabase } from '../lib/supabase'

export default function Auth({ mode }: { mode: 'login' | 'register' }) {
  const isRegister = mode === 'register'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [resetMode, setResetMode] = useState(false)

  const navigate = useNavigate()

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setMessage('')

    const cleanEmail = email.trim()

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setError('Enter a valid email address.')
      return
    }

    if (resetMode) {
      setLoading(true)
      try {
        const { error: resetError } =
          await supabase.auth.resetPasswordForEmail(cleanEmail, {
            redirectTo: `${window.location.origin}/reset-password`,
          })

        if (resetError) throw resetError

        setMessage('If an account exists for this email, a password reset link will be sent.')
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Could not request password reset.'
        )
      } finally {
        setLoading(false)
      }
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (isRegister && name.trim().length < 2) {
      setError('Please enter your name.')
      return
    }

    setLoading(true)

    try {
      if (isRegister) {
        const { data, error: signUpError } =
          await supabase.auth.signUp({
            email: cleanEmail,
            password,
            options: {
              data: { full_name: name.trim() },
              emailRedirectTo: window.location.origin,
            },
          })

        if (signUpError) throw signUpError

        if (data.session) {
          navigate('/app', { replace: true })
        } else {
          setMessage(
            'Account request received. Check your email for a confirmation link before signing in.'
          )
        }
      } else {
        const { error: signInError } =
          await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password,
          })

        if (signInError) throw signInError

        navigate('/app', { replace: true })
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Authentication failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  async function googleSignIn() {
    setError('')
    setMessage('')
    setLoading(true)

    try {
      const { error: googleError } =
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/app`,
          },
        })

      if (googleError) throw googleError
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Google sign-in could not be started.'
      )
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <Brand light />
        <div className="auth-quote">
          <span className="quote-mark">“</span>
          <h1>Progress isn't a straight line. It's a path you make your own.</h1>
          <p>Clarity for your next step. Confidence for the ones after.</p>
          <div className="auth-decoration">
            <div /><div /><div /><div /><div /><div /><div /><div /><div />
          </div>
        </div>
        <span className="auth-left-foot">
          PATHORA · TURNING SKILLS INTO OPPORTUNITIES
        </span>
      </div>

      <div className="auth-right">
        <Link to="/" className="back-home">
          <ArrowLeft size={15} /> Back to home
        </Link>

        <div className="auth-form-wrap">
          <div className="auth-mobile-brand"><Brand /></div>

          <div className="auth-kicker">
            {resetMode
              ? 'ACCOUNT RECOVERY'
              : isRegister
                ? 'YOUR NEXT CHAPTER'
                : 'WELCOME BACK'}
          </div>

          <h2>
            {resetMode
              ? 'Reset your password.'
              : isRegister
                ? 'Make room for possibility.'
                : 'Good to have you back.'}
          </h2>

          <p className="auth-subtitle">
            {resetMode
              ? 'Enter your email and we will send you a password reset link if an account exists.'
              : isRegister
                ? 'Create your account and start connecting your skills to opportunity.'
                : 'Sign in to pick up where your progress left off.'}
          </p>

          <form onSubmit={submit} className="auth-form" noValidate>
            {isRegister && !resetMode && (
              <label>
                Full name
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
                {name.length === 1 && (
                  <small className="field-hint">
                    Please enter at least 2 characters.
                  </small>
                )}
              </label>
            )}

            <label>
              Email address
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </label>

            {!resetMode && (
              <label>
                Password
                <div className="password-wrap">
                  <input
                    type={show ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder={
                      isRegister
                        ? 'At least 6 characters'
                        : 'Enter your password'
                    }
                    autoComplete={
                      isRegister ? 'new-password' : 'current-password'
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label={show ? 'Hide password' : 'Show password'}
                  >
                    {show ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </label>
            )}

            {!isRegister && !resetMode && (
              <button
                type="button"
                className="auth-text-button"
                onClick={() => {
                  setResetMode(true)
                  setError('')
                  setMessage('')
                }}
              >
                Forgot password?
              </button>
            )}

            {error && <div className="form-error" role="alert">{error}</div>}

            {message && (
              <div className="form-success" role="status">{message}</div>
            )}

            {isRegister && !resetMode && (
              <p className="terms-note">
                <CheckCircle2 size={14} />
                Your account will be securely managed by Supabase.
              </p>
            )}

            <button
              className="button button-dark auth-submit"
              type="submit"
              disabled={loading}
            >
              {loading
                ? 'Please wait...'
                : resetMode
                  ? 'Send reset link'
                  : isRegister
                    ? 'Create account'
                    : 'Sign in'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {!resetMode && (
            <>
              <div className="auth-separator"><span />or<span /></div>

              <button
                className="button button-outline demo-button"
                type="button"
                onClick={googleSignIn}
                disabled={loading}
              >
                Continue with Google
              </button>
            </>
          )}

          {resetMode ? (
            <p className="auth-switch">
              Remembered your password?{' '}
              <button
                type="button"
                className="auth-text-button"
                onClick={() => {
                  setResetMode(false)
                  setError('')
                  setMessage('')
                }}
              >
                Back to sign in
              </button>
            </p>
          ) : (
            <p className="auth-switch">
              {isRegister
                ? 'Already have an account?'
                : 'New to Pathora?'}{' '}
              <Link to={isRegister ? '/login' : '/register'}>
                {isRegister ? 'Sign in' : 'Create an account'}
              </Link>
            </p>
          )}

          <p className="auth-disclaimer">
            Your sign-in details are handled by Supabase authentication.
          </p>
        </div>

        <div className="auth-bottom">
          <span>© 2026 Pathora</span>
          <span>Made for meaningful progress</span>
        </div>
      </div>
    </div>
  )
}
