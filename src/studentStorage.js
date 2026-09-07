const STUDENTS_STORAGE_KEY = 'student-portal-students'

export function getStoredStudents() {
  const storedStudents = window.localStorage.getItem(STUDENTS_STORAGE_KEY)

  if (!storedStudents) return []

  try {
    const parsedStudents = JSON.parse(storedStudents)
    return Array.isArray(parsedStudents) ? parsedStudents : []
  } catch {
    return []
  }
}

export function saveStoredStudents(students) {
  window.localStorage.setItem(STUDENTS_STORAGE_KEY, JSON.stringify(students))
}
