import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <section className="welcome-hero">
        <div className="welcome-content">
          <h1>Welcome to Student Portal</h1>
          <p>Your complete solution for student management, attendance tracking, and academic performance monitoring</p>
          <div className="welcome-actions">
            <button type="button" className="primary-btn" onClick={() => navigate('/dashboard')}>Get Started</button>
            <button type="button" className="secondary-btn" onClick={() => navigate('/support')}>Learn More</button>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <button type="button" className="feature-card" onClick={() => navigate('/dashboard')}>
            <div className="feature-icon">📊</div>
            <h3>Dashboard</h3>
            <p>Get an overview of all student statistics, attendance rates, and key metrics at a glance.</p>
          </button>

          <button type="button" className="feature-card" onClick={() => navigate('/students')}>
            <div className="feature-icon">👥</div>
            <h3>Student Management</h3>
            <p>Manage student records, enroll new students, and maintain comprehensive student profiles.</p>
          </button>

          <button type="button" className="feature-card" onClick={() => navigate('/attendance')}>
            <div className="feature-icon">📋</div>
            <h3>Attendance Tracking</h3>
            <p>Track daily attendance, monitor patterns, and generate attendance reports.</p>
          </button>

          <button type="button" className="feature-card" onClick={() => navigate('/performance')}>
            <div className="feature-icon">📈</div>
            <h3>Performance Analytics</h3>
            <p>Monitor student grades, GPA, course progress, and academic standing.</p>
          </button>

          <button type="button" className="feature-card" onClick={() => navigate('/reports')}>
            <div className="feature-icon">📑</div>
            <h3>Reports & Analytics</h3>
            <p>Generate comprehensive reports on enrollment, attendance, and performance.</p>
          </button>

          <button type="button" className="feature-card" onClick={() => navigate('/support')}>
            <div className="feature-icon">💬</div>
            <h3>Support & Help</h3>
            <p>Access FAQs, documentation, and contact support for any assistance needed.</p>
          </button>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Manage Your Students?</h2>
        <p>Navigate to any section using the menu above or choose from the options below to get started</p>
        <div className="cta-buttons">
          <button type="button" className="nav-btn" onClick={() => navigate('/students')}>View All Students</button>
          <button type="button" className="nav-btn" onClick={() => navigate('/attendance')}>Check Attendance</button>
          <button type="button" className="nav-btn" onClick={() => navigate('/reports')}>View Reports</button>
        </div>
      </section>
    </div>
  )
}
