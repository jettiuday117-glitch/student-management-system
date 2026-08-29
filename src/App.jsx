import { useMemo, useState } from 'react'
import './App.css'

const navItems = ['Dashboard', 'Students', 'Attendance', 'Performance', 'Reports', 'Support']

const initialStudents = [
  { id: 1, name: 'Ava Thompson', email: 'ava.thompson@campus.edu', course: 'Computer Science', year: '3rd Year', status: 'Present' },
  { id: 2, name: 'Daniel Kim', email: 'daniel.kim@campus.edu', course: 'Business Admin', year: '2nd Year', status: 'Late' },
  { id: 3, name: 'Sophia Patel', email: 'sophia.patel@campus.edu', course: 'Biology', year: '1st Year', status: 'Absent' },
  { id: 4, name: 'Lucas Martin', email: 'lucas.martin@campus.edu', course: 'Engineering', year: '4th Year', status: 'Present' },
]

const defaultForm = {
  name: '',
  email: '',
  course: 'Computer Science',
  year: '1st Year',
  status: 'Present',
}

function App() {
  const [students, setStudents] = useState(initialStudents)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [form, setForm] = useState(defaultForm)

  const totals = useMemo(() => {
    const total = students.length
    const present = students.filter((student) => student.status === 'Present').length
    const late = students.filter((student) => student.status === 'Late').length
    const absent = students.filter((student) => student.status === 'Absent').length
    const attendance = total ? Math.round((present / total) * 100) : 0

    return { total, present, late, absent, attendance }
  }, [students])

  const filteredStudents = useMemo(() => {
    if (selectedFilter === 'All') return students
    return students.filter((student) => student.status === selectedFilter)
  }, [selectedFilter, students])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleAddStudent = (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim()) {
      return
    }

    const newStudent = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      course: form.course,
      year: form.year,
      status: form.status,
    }

    setStudents((current) => [newStudent, ...current])
    setForm(defaultForm)
  }

  const handleStatusChange = (id, nextStatus) => {
    setStudents((current) =>
      current.map((student) =>
        student.id === id ? { ...student, status: nextStatus } : student,
      ),
    )
  }

  const handleDelete = (id) => {
    setStudents((current) => current.filter((student) => student.id !== id))
  }

  return (
    <div className="page-shell">
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
            <div className="tool-box">
              <span>Welcome</span>
              <strong>Admin</strong>
            </div>
            <div className="tool-box">
              <span>Students</span>
              <strong>1,284</strong>
            </div>
            <div className="tool-box">
              <span>Reports</span>
              <strong>Live</strong>
            </div>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item} type="button" className="nav-link">
              {item}
            </button>
          ))}
        </nav>
      </header>

      <div className="promo-strip">Academic updates • Admissions open • Attendance snapshots refreshed today</div>

      <main className="dashboard-shell">
        <section className="hero-panel">
          <div className="hero-copy">
            <span className="hero-badge">Academic Essentials</span>
            <h1>Student Management Dashboard</h1>
            <p>
              Monitor attendance, student records, and academic performance from one streamlined campus dashboard.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-btn">Add Student</button>
              <button type="button" className="secondary-btn">View Reports</button>
            </div>
          </div>

          <div className="hero-stats">
            <div className="mini-stat">
              <span>Enrollment</span>
              <strong>1,284</strong>
              <small>+8.2% this term</small>
            </div>
            <div className="mini-stat">
              <span>Retention</span>
              <strong>94%</strong>
              <small>Steady growth</small>
            </div>
          </div>
        </section>

        <section className="stats-grid" aria-label="Student statistics">
          <article className="stat-card accent">
            <span>Total Students</span>
            <strong>{totals.total}</strong>
            <small>Across all departments</small>
          </article>
          <article className="stat-card">
            <span>Present Today</span>
            <strong>{totals.present}</strong>
            <small>{totals.attendance}% attendance</small>
          </article>
          <article className="stat-card">
            <span>Late Arrivals</span>
            <strong>{totals.late}</strong>
            <small>Needs follow-up</small>
          </article>
          <article className="stat-card warning">
            <span>Absentees</span>
            <strong>{totals.absent}</strong>
            <small>Review attendance logs</small>
          </article>
        </section>

        <section className="content-grid">
          <div className="panel form-panel">
            <div className="panel-header">
              <h3>Add New Student</h3>
            </div>

            <form onSubmit={handleAddStudent} className="student-form">
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Enter student name"
                />
              </label>

              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="student@email.com"
                />
              </label>

              <div className="two-column">
                <label>
                  Course
                  <select name="course" value={form.course} onChange={handleInputChange}>
                    <option>Computer Science</option>
                    <option>Business Admin</option>
                    <option>Biology</option>
                    <option>Engineering</option>
                  </select>
                </label>

                <label>
                  Year
                  <select name="year" value={form.year} onChange={handleInputChange}>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </label>
              </div>

              <label>
                Status
                <select name="status" value={form.status} onChange={handleInputChange}>
                  <option>Present</option>
                  <option>Late</option>
                  <option>Absent</option>
                </select>
              </label>

              <button className="primary-btn full-width" type="submit">Save Student</button>
            </form>
          </div>

          <div className="panel list-panel">
            <div className="panel-header split">
              <h3>Student Directory</h3>
              <select value={selectedFilter} onChange={(event) => setSelectedFilter(event.target.value)}>
                <option value="All">All</option>
                <option value="Present">Present</option>
                <option value="Late">Late</option>
                <option value="Absent">Absent</option>
              </select>
            </div>

            <div className="student-table">
              <div className="table-header">
                <span>Name</span>
                <span>Course</span>
                <span>Status</span>
                <span>Action</span>
              </div>

              {filteredStudents.map((student) => (
                <div key={student.id} className="table-row">
                  <div className="student-meta">
                    <div className="avatar">{student.name.charAt(0)}</div>
                    <div>
                      <strong>{student.name}</strong>
                      <small>{student.email}</small>
                    </div>
                  </div>

                  <span>{student.course}</span>

                  <select
                    value={student.status}
                    onChange={(event) => handleStatusChange(student.id, event.target.value)}
                    className={`status-select ${student.status.toLowerCase()}`}
                  >
                    <option value="Present">Present</option>
                    <option value="Late">Late</option>
                    <option value="Absent">Absent</option>
                  </select>

                  <button type="button" className="delete-btn" onClick={() => handleDelete(student.id)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <div>
            <h4>Academics</h4>
            <ul>
              <li>Programs</li>
              <li>Curriculum</li>
              <li>Admissions</li>
            </ul>
          </div>
          <div>
            <h4>Student Services</h4>
            <ul>
              <li>Scholarships</li>
              <li>Mentorship</li>
              <li>Career Support</li>
            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>Library Access</li>
              <li>Attendance Logs</li>
              <li>Reports</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>Help Desk</li>
              <li>Contact Faculty</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Student Portal</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>Accessibility</span>
        </div>
      </footer>
    </div>
  )
}

export default App
