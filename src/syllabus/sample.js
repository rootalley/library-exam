// fake sample content for the prototype, no real names or data
import { course } from '../data.js'

const CATALOG_HINT = "Paste the description exactly as it appears in the university's course catalog."
const CATALOG_PROMPT = "Paste the exact course description from the university's catalog."
const MEETINGS_PROMPT = 'When and where the class meets: days, times, and room or online meeting instructions.'

// what canvas would list in the course summary for last term: assignments, discussions and quizzes with due dates, all on tuesdays
const summaryRows2026 = () => [
  { type: 'discussion', name: 'Discussion: Introduce Yourself', date: 'Jan 20, 2026', time: '11:59pm' },
  { type: 'assignment', name: 'Homework 1', date: 'Jan 27, 2026', time: '11:59pm' },
  { type: 'assignment', name: 'Homework 2', date: 'Feb 10, 2026', time: '11:59pm' },
  { type: 'discussion', name: 'Discussion: Heuristic Evaluation Findings', date: 'Feb 24, 2026', time: '11:59pm' },
  { type: 'quiz', name: 'Midterm exam', date: 'Mar 3, 2026', time: '5:30pm' },
  { type: 'assignment', name: 'Homework 3', date: 'Mar 24, 2026', time: '11:59pm' },
  { type: 'discussion', name: 'Discussion: Prototype Feedback', date: 'Apr 7, 2026', time: '11:59pm' },
  { type: 'assignment', name: 'Homework 4', date: 'Apr 14, 2026', time: '11:59pm' },
  { type: 'quiz', name: 'Final exam', date: 'May 5, 2026', time: '5:30pm' },
]

const GRADING_HINT = 'Explain how grades are calculated and assigned, such as late work and the letter-grade scale.'
const LEAD_IN = 'Upon successful completion of the course, you will be able to:'

const emptyContact = () => ({ name: '', title: '', department: '', email: '', phone: '', office: '', officeHours: '', assistants: '' })

// the kinds of block the instructor can add
export const blockTypes = [
  { kind: 'text', title: 'Course Description', placeholder: CATALOG_PROMPT, hint: CATALOG_HINT },
  { kind: 'contact', title: 'Instructor Info' },
  { kind: 'objectives', title: 'Learning Objectives' },
  { kind: 'grading', title: 'Grading Scheme' },
  { kind: 'text', title: 'Class Meetings', placeholder: MEETINGS_PROMPT },
  { kind: 'text', title: 'Free Text', placeholder: 'Anything unique to your course.' },
]

// a new instructor never sees an empty page, these are the blocks they start with
export const starterBlocks = () => [
  { id: 'catalog', kind: 'text', title: 'Course Description', text: '', placeholder: CATALOG_PROMPT, hint: CATALOG_HINT },
  { id: 'instructor', kind: 'contact', title: 'Instructor Info', photo: false, fields: emptyContact() },
  { id: 'objectives', kind: 'objectives', title: 'Learning Objectives', lead: LEAD_IN, items: ['', '', ''] },
  { id: 'grading', kind: 'grading', title: 'Grading Scheme', rows: [{ category: '', weight: '' }, { category: '', weight: '' }, { category: '', weight: '' }], policy: '', policyHint: GRADING_HINT },
  { id: 'meetings', kind: 'text', title: 'Class Meetings', text: '', placeholder: MEETINGS_PROMPT },
]

// what a word file or last term's canvas page would turn into: one block per heading
export const importedBlocks = () => [
  { id: 'catalog', kind: 'text', title: 'Course Description', text: 'Introduces the principles of designing and evaluating user interfaces. Students learn how people perceive, think, and act, and apply that knowledge by building and testing interface prototypes. Three credit hours.' },
  { id: 'instructor', kind: 'contact', title: 'Instructor Info', photo: true,
    fields: { name: 'Prof. Casey Rivera', title: 'Associate Professor', department: 'Department of Computer Science', email: 'casey.rivera@example.edu', phone: '(555) 010-0142', office: 'Science Hall 310', officeHours: 'Wednesdays, 2 to 4 pm', assistants: 'Jordan Lee' } },
  { id: 'objectives', kind: 'objectives', title: 'Learning Objectives', lead: LEAD_IN,
    items: ['Explain the core principles of human-computer interaction.', 'Evaluate an interface with real users.', 'Design and test a prototype of a new interface.'] },
  // canvas builds this block from the course's assignments, so nobody types it in
  { id: 'coursesummary', kind: 'coursesummary', title: 'Course Summary', enabled: true, rows: summaryRows2026() },
  { id: 'grading', kind: 'grading', title: 'Grading Scheme', rows: course.grading.map((g) => ({ ...g })),
    policy: 'Late homework loses 10% per day for up to three days. Letter grades follow the university scale.' },
  { id: 'meetings', kind: 'text', title: 'Class Meetings', text: 'This is the Spring 2026 section. It meets Tuesdays and Thursdays in Science Hall Room 214.' },
]

export const GRADING_POLICY_HINT = GRADING_HINT
export { LEAD_IN, emptyContact }
