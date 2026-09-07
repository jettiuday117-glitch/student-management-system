import { useMemo, useState } from 'react'

const faqs = [
  {
    question: 'How do I add a student?',
    answer: 'Open Dashboard, complete the Add New Student form, choose a course and year, then select Save Student. The record will appear in the Students page.',
  },
  {
    question: 'Where can I update attendance?',
    answer: 'Open Attendance from the menu. Use the attendance dropdown beside a student to mark them Present, Late, or Absent. Changes are saved to the student record.',
  },
  {
    question: 'Where do I add academic performance details?',
    answer: 'Add semester percentage, GPA, and grade while creating a student from the Dashboard. The details are then shown in Performance and Reports & Analytics.',
  },
  {
    question: 'Why is a student missing from a report?',
    answer: 'Reports use the records saved in your current browser. Return to Dashboard and confirm the student was saved successfully before opening Reports & Analytics again.',
  },
]

export default function Support() {
  const [search, setSearch] = useState('')
  const normalizedSearch = search.trim().toLowerCase()
  const filteredFaqs = useMemo(() => faqs.filter((faq) =>
    !normalizedSearch || `${faq.question} ${faq.answer}`.toLowerCase().includes(normalizedSearch),
  ), [normalizedSearch])

  return (
    <section className="page-section">
      <div className="section-header">
        <h1>Support & Help Center</h1>
        <p>Find guidance for student records, attendance, performance, and reports.</p>
      </div>

      <div className="support-grid">
        <section className="panel support-card">
          <div className="panel-header">
            <h3>Quick start guides</h3>
          </div>
          <div className="support-list">
            <div className="support-list-item">
              <strong>Manage students</strong>
              <span>Add student details from Dashboard and review records in Students.</span>
            </div>
            <div className="support-list-item">
              <strong>Track attendance</strong>
              <span>Use Attendance to update daily status and filter records by attendance state.</span>
            </div>
            <div className="support-list-item">
              <strong>Review academics</strong>
              <span>Use Performance for GPA, grades, and semester percentage summaries.</span>
            </div>
            <div className="support-list-item">
              <strong>Export-ready reports</strong>
              <span>Reports & Analytics combines student, attendance, and academic details in one table.</span>
            </div>
          </div>
        </section>

        <section className="panel support-card">
          <div className="panel-header">
            <h3>Contact support</h3>
          </div>
          <div className="contact-details">
            <p>For access issues, account questions, or data problems, contact the support team.</p>
            <a href="mailto:support@studentportal.edu">support@studentportal.edu</a>
            <a href="tel:18007883683">1-800-STUDENT</a>
            <span>Monday - Friday, 9:00 AM - 5:00 PM</span>
            <a className="primary-btn support-action" href="mailto:support@studentportal.edu?subject=Student%20Portal%20Support">Email support</a>
          </div>
        </section>
      </div>

      <section className="panel faq-panel">
        <div className="panel-header split">
          <h3>Frequently asked questions</h3>
          <input
            className="faq-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search help topics"
            aria-label="Search help topics"
          />
        </div>
        <div className="faq-list">
          {filteredFaqs.length === 0 && <p className="empty-state">No help topics match your search.</p>}
          {filteredFaqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </section>
  )
}
