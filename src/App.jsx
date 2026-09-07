import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import './App.css'

// Page Components
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Attendance from './pages/Attendance'
import Performance from './pages/Performance'
import Reports from './pages/Reports'
import Support from './pages/Support'
import Login from './pages/Login'
import Programs from './pages/Programs'

const AUTH_STORAGE_KEY = 'student-portal-authenticated'

function ProtectedRoute({ children }) {
  const isAuthenticated = window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

// Header Component
function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Students', path: '/students' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Performance', path: '/performance' },
    { label: 'Reports', path: '/reports' },
    { label: 'Support', path: '/support' },
  ]

  return (
    <header className="site-header">
      <div className="header-top">
        <div className="brand-block">
          <span className="brand-logo">S</span>
          <div>
            <span className="brand-tag">Student</span>
            <strong>Portal</strong>
          </div>
        </div>

        <div className="search-box">
          <span className="search-label">Search</span>
          <input type="text" placeholder="Search students, courses, or reports..." />
          <button type="button" className="search-btn">Find</button>
        </div>

        <div className="header-tools">
          <button
            type="button"
            className="logout-btn"
            onClick={() => {
              window.localStorage.removeItem(AUTH_STORAGE_KEY)
              navigate('/login')
            }}
          >
            Log out
          </button>
        </div>
      </div>

      <nav className="main-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button
            key={item.path}
            type="button"
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <h4>Academics</h4>
          <ul>
            <li><a href="#programs">Programs</a></li>
            <li><a href="#curriculum">Curriculum</a></li>
            <li><a href="#admissions">Admissions</a></li>
          </ul>
        </div>
        <div>
          <h4>Student Services</h4>
          <ul>
            <li><a href="#scholarships">Scholarships</a></li>
            <li><a href="#mentorship">Mentorship</a></li>
            <li><a href="#career">Career Support</a></li>
          </ul>
        </div>
        <div>
          <h4>Resources</h4>
          <ul>
            <li><a href="#library">Library Access</a></li>
            <li><a href="#attendance">Attendance Logs</a></li>
            <li><a href="#reports">Reports</a></li>
          </ul>
        </div>
        <div>
          <h4>Support</h4>
          <ul>
            <li><a href="#helpdesk">Help Desk</a></li>
            <li><a href="#faculty">Contact Faculty</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Student Portal</span>
        <span><a href="#privacy">Privacy</a></span>
        <span><a href="#terms">Terms</a></span>
        <span><a href="#accessibility">Accessibility</a></span>
      </div>
    </footer>
  )
}

// Main App Layout Component
function AppLayout() {
  return (
    <div className="page-shell">
      <Header />
      <div className="promo-strip">Add your first student record to get started</div>
      <main className="dashboard-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login authStorageKey={AUTH_STORAGE_KEY} />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}


export default App
