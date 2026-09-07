import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Login({ authStorageKey }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.')
      return
    }

    window.localStorage.setItem(authStorageKey, 'true')
    const destination = location.state?.from?.pathname || '/'
    navigate(destination, { replace: true })
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-label="Student Portal sign in">
        <div className="login-panel-inner">
          <div className="login-brand" aria-label="Student Portal">
            <span className="login-brand-mark">S</span>
            <span className="login-brand-name">student<span>portal</span></span>
          </div>

          <div className="login-card">
            <h1>Sign in</h1>
            <p className="login-welcome">Welcome to your student management workspace.</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email or mobile phone number</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                autoFocus
              />

              <div className="login-label-row">
                <label htmlFor="password">Password</label>
                <button type="button" className="text-btn">Forgot your password?</button>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="current-password"
              />

              <label className="keep-signed-in">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </label>

              {error && <p className="login-error" role="alert">{error}</p>}
              <button type="submit" className="login-submit">Sign in</button>
            </form>

            <p className="login-terms">By continuing, you agree to the Student Portal <a href="#terms">Conditions of Use</a> and <a href="#privacy">Privacy Notice</a>.</p>
          </div>

          <div className="new-account-divider"><span>New to Student Portal?</span></div>
          <button type="button" className="create-account-btn">Create your Student Portal account</button>

          <footer className="login-footer">
            <div><a href="#conditions">Conditions of Use</a><a href="#privacy">Privacy Notice</a><a href="mailto:support@studentportal.edu">Help</a></div>
            <span>© 2026 Student Portal</span>
          </footer>
        </div>
      </section>
    </main>
  )
}

export default Login