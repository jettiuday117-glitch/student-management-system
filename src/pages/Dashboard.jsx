import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredStudents, saveStoredStudents } from '../studentStorage'

const availableCourses = [
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

const defaultForm = {
  name: '',
  email: '',
  course: '',
  year: '1st Year',
  status: 'Present',
  semesterPercentage: '',
  gpa: '',
  grade: '',
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [students, setStudents] = useState(() => getStoredStudents())
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [form, setForm] = useState(defaultForm)

  const totals = useMemo(() => {
    const total = students.length
    const present = students.filter((student) => student.status === 'Present').length
    const absent = students.filter((student) => student.status === 'Absent').length
    const attendance = total ? Math.round((present / total) * 100) : 0

    return { total, present, absent, attendance }
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

    if (!form.name.trim() || !form.email.trim() || !form.course) {
      return
    }

    const newStudent = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim(),
      course: form.course,
      year: form.year,
      status: form.status,
      semesterPercentage: form.semesterPercentage,
      gpa: form.gpa,
      grade: form.grade,
    }

    setStudents((current) => {
      const nextStudents = [newStudent, ...current]
      saveStoredStudents(nextStudents)
      return nextStudents
    })
    setForm(defaultForm)
  }

  const handleStatusChange = (id, nextStatus) => {
    setStudents((current) => {
      const nextStudents = current.map((student) =>
        student.id === id ? { ...student, status: nextStatus } : student,
      )
      saveStoredStudents(nextStudents)
      return nextStudents
    })
  }

  const handleDelete = (id) => {
    setStudents((current) => {
      const nextStudents = current.filter((student) => student.id !== id)
      saveStoredStudents(nextStudents)
      return nextStudents
    })
  }

  return (
    <>
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
                  <option value="">Select a course</option>
                  {availableCourses.map((course) => (
                    <option key={course} value={course}>{course}</option>
                  ))}
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

            <div className="two-column">
              <label>
                Semester percentage
                <input
                  type="number"
                  name="semesterPercentage"
                  value={form.semesterPercentage}
                  onChange={handleInputChange}
                  min="0"
                  max="100"
                  step="0.01"
                  placeholder="e.g. 78.50"
                />
              </label>

              <label>
                GPA
                <input
                  type="number"
                  name="gpa"
                  value={form.gpa}
                  onChange={handleInputChange}
                  min="0"
                  max="10"
                  step="0.01"
                  placeholder="e.g. 8.25"
                />
              </label>
            </div>

            <label>
              Grade
              <select name="grade" value={form.grade} onChange={handleInputChange}>
                <option value="">Select a grade</option>
                <option>A+</option>
                <option>A</option>
                <option>B+</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </label>

            <label>
              Status
              <select name="status" value={form.status} onChange={handleInputChange}>
                <option>Present</option>
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
              <span>Actions</span>
            </div>

            {filteredStudents.length === 0 && (
              <p className="empty-state">No student records yet. Add a student to populate the directory.</p>
            )}

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

                <div className="row-actions">
                  <button type="button" className="update-btn" onClick={() => navigate('/performance')} aria-label={`Update ${student.name}`}>
                    Update
                  </button>
                  <button type="button" className="delete-btn" onClick={() => handleDelete(student.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
