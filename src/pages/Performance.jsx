import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getStoredStudents } from '../studentStorage'

export default function Performance() {
  const navigate = useNavigate()
  const [students] = useState(() => getStoredStudents())
  const studentsWithPerformance = students.filter(
    (student) => student.semesterPercentage || student.gpa || student.grade,
  )
  const averages = useMemo(() => {
    const percentages = studentsWithPerformance
      .map((student) => Number(student.semesterPercentage))
      .filter((value) => !Number.isNaN(value))
    const gpas = studentsWithPerformance
      .map((student) => Number(student.gpa))
      .filter((value) => !Number.isNaN(value))

    return {
      percentage: percentages.length
        ? (percentages.reduce((total, value) => total + value, 0) / percentages.length).toFixed(2)
        : '0.00',
      gpa: gpas.length
        ? (gpas.reduce((total, value) => total + value, 0) / gpas.length).toFixed(2)
        : '0.00',
    }
  }, [studentsWithPerformance])

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Academic Performance</h1>
        <p>Review semester percentage, GPA, and grade details for each student.</p>
      </div>

      <section className="stats-grid" aria-label="Academic performance summary">
        <article className="stat-card accent">
          <span>Average semester percentage</span>
          <strong>{averages.percentage}%</strong>
          <small>From entered student records</small>
        </article>
        <article className="stat-card">
          <span>Average GPA</span>
          <strong>{averages.gpa}</strong>
          <small>On a 10.00 scale</small>
        </article>
        <article className="stat-card warning">
          <span>Records with performance</span>
          <strong>{studentsWithPerformance.length}</strong>
          <small>Students with academic details</small>
        </article>
      </section>

      <div className="panel">
        <div className="panel-header split">
          <h3>Student Performance</h3>
          <button type="button" className="secondary-btn" onClick={() => navigate('/reports')}>
            View Full Report
          </button>
        </div>
        <div className="student-table performance-table">
          <div className="table-header">
            <span>Name</span>
            <span>Course</span>
            <span>Semester %</span>
            <span>GPA / Grade</span>
          </div>

          {studentsWithPerformance.length === 0 && (
            <p className="empty-state">No academic details yet. Add percentage, GPA, and grade from the Dashboard.</p>
          )}

          {studentsWithPerformance.map((student) => (
            <div key={student.id} className="table-row">
              <div className="student-meta">
                <div className="avatar">{student.name.charAt(0)}</div>
                <div>
                  <strong>{student.name}</strong>
                  <small>{student.email}</small>
                </div>
              </div>
              <span>{student.course}</span>
              <strong>{student.semesterPercentage ? `${student.semesterPercentage}%` : 'Not added'}</strong>
              <span>{student.gpa || 'Not added'} / {student.grade || 'Not added'}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
