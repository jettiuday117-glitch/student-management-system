import { useNavigate } from 'react-router-dom'
import { getStoredStudents } from '../studentStorage'

export default function Reports() {
  const navigate = useNavigate()
  const students = getStoredStudents()

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Reports & Analytics</h1>
        <p>View complete student details, attendance, and academic performance in one report.</p>
      </div>

      <div className="panel">
        <div className="panel-header split">
          <h3>Complete Student Report</h3>
          <button type="button" className="secondary-btn" onClick={() => navigate('/performance')}>
            View Performance
          </button>
        </div>

        <div className="report-table-wrap">
          <div className="report-table" role="table" aria-label="Complete student report">
            <div className="report-row report-header" role="row">
              <span>Name</span>
              <span>Email</span>
              <span>Course</span>
              <span>Year</span>
              <span>Attendance</span>
              <span>Semester %</span>
              <span>GPA / 10.00</span>
              <span>Grade</span>
            </div>

            {students.length === 0 && (
              <p className="empty-state">No student records yet. Add a student from the Dashboard.</p>
            )}

            {students.map((student) => (
              <div className="report-row" role="row" key={student.id}>
                <strong>{student.name}</strong>
                <span>{student.email}</span>
                <span>{student.course}</span>
                <span>{student.year}</span>
                <span className={`status-badge ${student.status.toLowerCase()}`}>{student.status}</span>
                <span>{student.semesterPercentage ? `${student.semesterPercentage}%` : 'Not added'}</span>
                <span>{student.gpa || 'Not added'}</span>
                <span>{student.grade || 'Not added'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
