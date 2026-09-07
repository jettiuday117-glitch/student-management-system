import { useMemo, useState } from 'react'
import { getStoredStudents, saveStoredStudents } from '../studentStorage'

export default function Attendance() {
  const [students, setStudents] = useState(() => getStoredStudents())
  const [selectedFilter, setSelectedFilter] = useState('All')

  const totals = useMemo(() => ({
    present: students.filter((student) => student.status === 'Present').length,
    late: students.filter((student) => student.status === 'Late').length,
    absent: students.filter((student) => student.status === 'Absent').length,
  }), [students])

  const filteredStudents = useMemo(() => {
    if (selectedFilter === 'All') return students
    return students.filter((student) => student.status === selectedFilter)
  }, [selectedFilter, students])

  const handleStatusChange = (id, nextStatus) => {
    setStudents((current) => {
      const nextStudents = current.map((student) =>
        student.id === id ? { ...student, status: nextStatus } : student,
      )
      saveStoredStudents(nextStudents)
      return nextStudents
    })
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Attendance Tracking</h1>
        <p>Update attendance here. Changes are shared with the Students page.</p>
      </div>

      <section className="stats-grid" aria-label="Attendance summary">
        <article className="stat-card accent">
          <span>Present</span>
          <strong>{totals.present}</strong>
          <small>Students present today</small>
        </article>
        <article className="stat-card warning">
          <span>Late</span>
          <strong>{totals.late}</strong>
          <small>Students needing follow-up</small>
        </article>
        <article className="stat-card">
          <span>Absent</span>
          <strong>{totals.absent}</strong>
          <small>Students absent today</small>
        </article>
      </section>

      <div className="panel">
        <div className="panel-header split">
          <h3>Attendance Records</h3>
          <select value={selectedFilter} onChange={(event) => setSelectedFilter(event.target.value)}>
            <option value="All">All ({students.length})</option>
            <option value="Present">Present</option>
            <option value="Late">Late</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <div className="student-table">
          <div className="table-header">
            <span>Name</span>
            <span>Course</span>
            <span>Attendance</span>
            <span>Updated here</span>
          </div>

          {filteredStudents.length === 0 && (
            <p className="empty-state">No student records yet. Add a student from the Dashboard.</p>
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
              <span className="attendance-source">Saved to student record</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
