export default function Assignments() {
  return (
    <section className="page-section">
      <div className="section-header">
        <span className="hero-badge">Academic work</span>
        <h1>Assignments</h1>
        <p>Create, organize, and track student assignments by course and subject.</p>
      </div>

      <div className="panel assignment-panel">
        <div className="panel-header split">
          <h3>Assignment workspace</h3>
          <button type="button" className="primary-btn">Add Assignment</button>
        </div>
        <div className="empty-state">
          No assignments have been added yet. Create an assignment to start tracking academic work.
        </div>
      </div>
    </section>
  )
}
