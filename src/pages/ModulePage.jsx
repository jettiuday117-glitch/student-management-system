const moduleDescriptions = {
  'Edit Student': 'Select a student record from the Students page to review and update details.',
  'Delete Student': 'Student records can be removed from the Students page after review.',
  Departments: 'Organize academic departments and connect them to available courses.',
  Courses: 'Manage course offerings, study levels, and course assignments.',
  Subjects: 'Maintain subjects that belong to each course and academic term.',
  Teachers: 'Review teacher profiles and connect teachers with subjects and courses.',
  Enrollments: 'Track student enrollment across courses and academic terms.',
  Exams: 'Plan examinations, schedules, and assessment activities.',
  Marks: 'Record and review marks for student examinations and assessments.',
  Grades: 'Review grading outcomes and academic standing for students.',
  Fees: 'Track fee records, payment status, and outstanding balances.',
  Notices: 'Publish important academic and administration notices.',
  Analytics: 'Review dashboard metrics and trends across the student portal.',
}

export default function ModulePage({ title }) {
  return (
    <section className="page-section module-page">
      <div className="section-header">
        <span className="hero-badge">Portal module</span>
        <h1>{title}</h1>
        <p>{moduleDescriptions[title] || 'Manage this area of the student portal.'}</p>
      </div>

      <div className="panel module-empty-state">
        <h3>{title} workspace</h3>
        <p>This workspace is ready for your {title.toLowerCase()} data.</p>
        <span>Use the navigation menu to move between portal modules.</span>
      </div>
    </section>
  )
}
