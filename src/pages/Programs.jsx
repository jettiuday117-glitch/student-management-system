const diplomaEngineeringCourses = []
const engineeringDepartments = []

export default function Programs() {
  return (
    <div className="page-section programs-page">
      <section className="section-header">
        <span className="hero-badge">Program setup</span>
        <h1>Diploma Programs</h1>
        <p>Add your Engineering courses and departments here when your program data is ready.</p>
      </section>

      <section className="program-summary" aria-label="Program summary">
        <div className="program-summary-item">
          <strong>0</strong>
          <span>Active courses</span>
        </div>
        <div className="program-summary-item">
          <strong>0</strong>
          <span>Engineering departments</span>
        </div>
        <div className="program-summary-item">
          <strong>Diploma</strong>
          <span>Study level</span>
        </div>
      </section>

      <div className="program-columns">
        <section className="panel">
          <div className="panel-header split">
            <h3>Active Courses</h3>
            <span className="program-filter">No course data</span>
          </div>
          <div className="program-list">
            {diplomaEngineeringCourses.length === 0 && <p className="empty-state">No courses added yet.</p>}
            {diplomaEngineeringCourses.map((course, index) => (
              <div className="program-list-item" key={course}>
                <span className="program-number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{course}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-header split">
            <h3>Departments</h3>
            <span className="program-filter">No department data</span>
          </div>
          <div className="program-list">
            {engineeringDepartments.length === 0 && <p className="empty-state">No departments added yet.</p>}
            {engineeringDepartments.map((department, index) => (
              <div className="program-list-item" key={department}>
                <span className="program-number">{String(index + 1).padStart(2, '0')}</span>
                <strong>{department}</strong>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
