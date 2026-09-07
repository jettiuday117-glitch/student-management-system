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
import Register from './pages/Register'
import ModulePage from './pages/ModulePage'
import Assignments from './pages/Assignments'

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
        <button type="button" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate('/')}>
          Home
        </button>
        <button type="button" className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => navigate('/dashboard')}>
          Dashboard
        </button>
        <button type="button" className={`nav-link ${location.pathname === '/students' ? 'active' : ''}`} onClick={() => navigate('/students')}>
          Students
        </button>
        <button type="button" className={`nav-link ${location.pathname === '/attendance' ? 'active' : ''}`} onClick={() => navigate('/attendance')}>
          Attendance Tracker
        </button>
        <button type="button" className={`nav-link ${location.pathname === '/performance' ? 'active' : ''}`} onClick={() => navigate('/performance')}>
          Performance
        </button>
        <button type="button" className={`nav-link ${location.pathname === '/reports' ? 'active' : ''}`} onClick={() => navigate('/reports')}>
          Reports
        </button>
        <button type="button" className={`nav-link ${location.pathname === '/assignments' ? 'active' : ''}`} onClick={() => navigate('/assignments')}>
          Assignments
        </button>
        <button type="button" className={`nav-link ${location.pathname === '/support' ? 'active' : ''}`} onClick={() => navigate('/support')}>
          Support
        </button>
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
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/support" element={<Support />} />
          <Route path="/student/edit" element={<ModulePage title="Edit Student" />} />
          <Route path="/student/delete" element={<ModulePage title="Delete Student" />} />
          <Route path="/academic/departments" element={<ModulePage title="Departments" />} />
          <Route path="/academic/courses" element={<ModulePage title="Courses" />} />
          <Route path="/academic/subjects" element={<ModulePage title="Subjects" />} />
          <Route path="/academic/teachers" element={<ModulePage title="Teachers" />} />
          <Route path="/academic/enrollments" element={<ModulePage title="Enrollments" />} />
          <Route path="/attendance/exams" element={<ModulePage title="Exams" />} />
          <Route path="/attendance/marks" element={<ModulePage title="Marks" />} />
          <Route path="/attendance/grades" element={<ModulePage title="Grades" />} />
          <Route path="/administration/fees" element={<ModulePage title="Fees" />} />
          <Route path="/administration/notices" element={<ModulePage title="Notices" />} />
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
        <Route path="/login" element={<Navigate to="/login/student" replace />} />
        <Route path="/login/student" element={<Login authStorageKey={AUTH_STORAGE_KEY} role="student" />} />
        <Route path="/login/staff" element={<Login authStorageKey={AUTH_STORAGE_KEY} role="staff" />} />
        <Route path="/register/student" element={<Register />} />
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
