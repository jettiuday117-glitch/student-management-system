import { useMemo, useState } from 'react'
import { getStoredStudents, saveStoredStudents } from '../studentStorage'

export default function Students() {
  const [students, setStudents] = useState(() => getStoredStudents())
  const [selectedFilter, setSelectedFilter] = useState('All')

  const filteredStudents = useMemo(() => {
    if (selectedFilter === 'All') return students
    return students.filter((student) => student.status === selectedFilter)
  }, [selectedFilter, students])

  const handleDelete = (id) => {
    setStudents((current) => {
      const nextStudents = current.filter((student) => student.id !== id)
      saveStoredStudents(nextStudents)
      return nextStudents
    })
  }

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Students Management</h1>
        <p>View and manage all students in the system</p>
      </div>

      <div className="panel">
        <div className="panel-header split">
          <h3>Student Directory</h3>
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
            <span>Status</span>
            <span>Action</span>
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
              <span className={`status-badge ${student.status.toLowerCase()}`}>{student.status}</span>
              <button type="button" className="delete-btn" onClick={() => handleDelete(student.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
