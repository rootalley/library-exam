// fake sample course for the prototype, no real names or data
export const course = {
  code: 'HCI 101',
  title: 'Introduction to Interface Design',
  term: 'Spring 2027',
  // statements the university requires in every syllabus, instructors can read them but not edit them
  statements: [
    { id: 'integrity', title: 'Academic integrity', text: 'Placeholder: the university’s academic integrity statement appears here.' },
    { id: 'accommodations', title: 'Accommodations', text: 'Placeholder: the university’s accessibility and accommodations statement appears here.' },
    { id: 'support', title: 'Student support services', text: 'Placeholder: the university’s student support services statement appears here.' },
  ],
  grading: [
    { category: 'Homework', weight: 30 },
    { category: 'Midterm exam', weight: 30 },
    { category: 'Final exam', weight: 40 },
  ],
}
