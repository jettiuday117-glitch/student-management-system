import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Login({ authStorageKey, role }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isStudentLogin = role === 'student'
  const roleTitle = isStudentLogin ? 'Student sign in' : 'Admin & Teacher sign in'
  const roleDescription = isStudentLogin
    ? 'Access your courses, attendance, grades, and student resources.'
    : 'Manage students, attendance, performance, and reports from one workspace.'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const registeredMessage = location.state?.registered

  function handleSubmit(event) {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      setError('Enter your email and password to continue.')
      return
    }

    window.localStorage.setItem(authStorageKey, 'true')
    window.localStorage.setItem('student-portal-role', role)
    const destination = location.state?.from?.pathname || '/'
    navigate(destination, { replace: true })
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-label={roleTitle}>
        <div className="login-panel-inner">
          <div className="login-brand" aria-label="Student Portal">
            <span className="login-brand-mark">S</span>
            <span className="login-brand-name">student<span>portal</span></span>
          </div>

          <div className="login-card">
            <div className="login-role-switcher" aria-label="Choose account type">
              <button
                type="button"
                className={isStudentLogin ? 'active' : ''}
                onClick={() => navigate('/login/student')}
              >
                Student
              </button>
              <button
                type="button"
                className={!isStudentLogin ? 'active' : ''}
                onClick={() => navigate('/login/staff')}
              >
                Admin / Teacher
              </button>
            </div>
            <h1>{roleTitle}</h1>
            <p className="login-welcome">{roleDescription}</p>
            {registeredMessage && <p className="login-success" role="status">Account created. You can now sign in.</p>}

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">{isStudentLogin ? 'Student email' : 'Admin or teacher email'}</label>
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
              <div className="password-input-wrap">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

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
          <button type="button" className="create-account-btn" onClick={() => navigate('/register/student')}>
            Create your Student Portal account
          </button>

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