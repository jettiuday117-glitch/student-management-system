import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const courses = [
  'Civil Engineering',
  'Mechanical Engineering',
  'Electrical Engineering',
  'Electronics Engineering',
  'Computer Engineering',
  'Automotive Engineering',
  'Construction Technology',
  'Mechatronics Engineering',
  'Manufacturing Technology',
  'Renewable Energy Technology',
  'Environmental Engineering',
  'Robotics Engineering',
]

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  course: '',
  year: '1st Year',
  password: '',
  confirmPassword: '',
}

function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!form.fullName.trim() || !form.email.trim() || !form.course || !form.password) {
      setError('Complete all required fields to create your account.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    const registeredStudents = JSON.parse(window.localStorage.getItem('student-portal-registered-students') || '[]')
    registeredStudents.push({
      id: Date.now(),
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      course: form.course,
      year: form.year,
    })
    window.localStorage.setItem('student-portal-registered-students', JSON.stringify(registeredStudents))
    navigate('/login/student', { replace: true, state: { registered: true, email: form.email.trim() } })
  }

  return (
    <main className="login-page register-page">
      <section className="login-panel" aria-label="Create Student Portal account">
        <div className="login-panel-inner register-panel-inner">
          <div className="login-brand" aria-label="Student Portal">
            <span className="login-brand-mark">S</span>
            <span className="login-brand-name">student<span>portal</span></span>
          </div>

          <div className="login-card">
            <button type="button" className="back-to-login" onClick={() => navigate('/login/student')}>
              &lt;- Back to student sign in
            </button>
            <h1>Create your account</h1>
            <p className="login-welcome">Register your student details to access the Student Portal.</p>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="fullName">Full name <span className="required-mark">*</span></label>
              <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} autoComplete="name" autoFocus />

              <label htmlFor="register-email">Email address <span className="required-mark">*</span></label>
              <input id="register-email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" />

              <label htmlFor="phone">Phone number</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} autoComplete="tel" />

              <div className="two-column register-fields">
                <label>
                  Course <span className="required-mark">*</span>
                  <select name="course" value={form.course} onChange={handleChange}>
                    <option value="">Select course</option>
                    {courses.map((course) => <option key={course}>{course}</option>)}
                  </select>
                </label>
                <label>
                  Year
                  <select name="year" value={form.year} onChange={handleChange}>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </label>
              </div>

              <label htmlFor="register-password">Password <span className="required-mark">*</span></label>
              <div className="password-input-wrap">
                <input id="register-password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} autoComplete="new-password" />
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

              <label htmlFor="confirmPassword">Confirm password <span className="required-mark">*</span></label>
              <div className="password-input-wrap">
                <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={handleChange} autoComplete="new-password" />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={showConfirmPassword ? 'Hide confirmed password' : 'Show confirmed password'}
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {error && <p className="login-error" role="alert">{error}</p>}
              <button type="submit" className="login-submit">Create student account</button>
            </form>

            <p className="login-terms">By creating an account, you agree to the Student Portal <a href="#terms">Conditions of Use</a> and <a href="#privacy">Privacy Notice</a>.</p>
          </div>

          <footer className="login-footer">
            <div><a href="#conditions">Conditions of Use</a><a href="#privacy">Privacy Notice</a><a href="mailto:support@studentportal.edu">Help</a></div>
            <span>© 2026 Student Portal</span>
          </footer>
        </div>
      </section>
    </main>
  )
}

export default Register
