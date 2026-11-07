// fake sample content for the prototype, no real names or data
import { course } from '../data.js'
import { resolved } from './lookup.js'

const CATALOG_HINT = "Paste the description exactly as it appears in the university's course catalog."
const CATALOG_PROMPT = "Paste the exact course description from the university's catalog."
const MEETINGS_PROMPT = 'When and where the class meets: days, times, and room or online meeting instructions.'

export const TERM_OLD = 'Spring 2026'
export const TERM_NEW = 'Spring 2027'
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// moves a date forward 52 weeks so a tuesday stays a tuesday in the new term
// Date.UTC keeps the time zone out of it, MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC
export function shiftDate(str) {
  const m = str.match(/^([A-Za-z]{3}) (\d{1,2}), (\d{4})$/)
  if (!m) return str
  const d = new Date(Date.UTC(+m[3], MONTHS.indexOf(m[1]), +m[2]) + 364 * 86400000)
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

// what canvas would list in the course summary for last term: assignments, discussions and quizzes with due dates, all on tuesdays
export const summaryRows2026 = () => [
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
export const shiftRows = (rows) => rows.map((r) => ({ ...r, date: shiftDate(r.date) }))

// details from the old file that the instructor should look at again
export const importedFlags = () => [
  { id: 'f-term', blockId: 'meetings', text: TERM_OLD, note: 'Term from last year', replacement: TERM_NEW, resolved: false },
  { id: 'f-room', blockId: 'meetings', text: 'Science Hall Room 214', note: 'The room may have changed', resolved: false },
  { id: 'f-ta', blockId: 'instructor', text: 'Jordan Lee', note: "Last term's teaching assistant", resolved: false },
]

// tips that keep the two lists apart
const MATERIALS_TIP = 'Materials are items students are expected to purchase. Items the university provides belong under Readings.'
const READINGS_TIP = 'Readings are provided by the university. Items students must buy belong under Course Materials.'
export const item = (input = '', focus = false) => ({ input, entry: null, status: 'idle', focus })

const GRADING_HINT = 'Explain how grades are calculated and assigned, such as late work and the letter-grade scale.'
const LEAD_IN = 'Upon successful completion of the course, you will be able to:'

const emptyContact = () => ({ name: '', title: '', department: '', email: '', phone: '', office: '', officeHours: '', assistants: '' })

// the kinds of block the instructor can add
export const blockTypes = [
  { kind: 'text', title: 'Course Description', placeholder: CATALOG_PROMPT, hint: CATALOG_HINT },
  { kind: 'contact', title: 'Instructor Info' },
  { kind: 'objectives', title: 'Learning Objectives' },
  { kind: 'coursesummary', title: 'Course Summary' },
  { kind: 'grading', title: 'Grading Scheme' },
  { kind: 'text', title: 'Class Meetings', placeholder: MEETINGS_PROMPT },
  { kind: 'list', title: 'Course Materials', tip: MATERIALS_TIP },
  { kind: 'list', title: 'Readings', tip: READINGS_TIP },
  { kind: 'policies', title: 'Policies' },
  { kind: 'text', title: 'Free Text', placeholder: 'Anything unique to your course.' },
]

// a new instructor never sees an empty page, these are the blocks they start with
export const starterBlocks = () => [
  { id: 'catalog', kind: 'text', title: 'Course Description', text: '', placeholder: CATALOG_PROMPT, hint: CATALOG_HINT },
  { id: 'instructor', kind: 'contact', title: 'Instructor Info', photo: false, fields: emptyContact() },
  { id: 'objectives', kind: 'objectives', title: 'Learning Objectives', lead: LEAD_IN, items: ['', '', ''] },
  { id: 'coursesummary', kind: 'coursesummary', title: 'Course Summary', enabled: true, rows: shiftRows(summaryRows2026()) },
  { id: 'grading', kind: 'grading', title: 'Grading Scheme', rows: [{ category: '', weight: '' }, { category: '', weight: '' }, { category: '', weight: '' }], policy: '', policyHint: GRADING_HINT },
  { id: 'meetings', kind: 'text', title: 'Class Meetings', text: '', placeholder: MEETINGS_PROMPT },
  { id: 'materials', kind: 'list', title: 'Course Materials', tip: MATERIALS_TIP, items: [item()] },
  { id: 'readings', kind: 'list', title: 'Readings', tip: READINGS_TIP, items: [item()] },
  { id: 'policies', kind: 'policies', title: 'Policies', statementIds: course.statements.map((s) => s.id) },
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
  { id: 'meetings', kind: 'text', title: 'Class Meetings', text: `This is the ${TERM_OLD} section. It meets Tuesdays and Thursdays in Science Hall Room 214.` },
  { id: 'materials', kind: 'list', title: 'Course Materials', tip: MATERIALS_TIP, items: [resolved('978-1-23456-789-7')] },
  { id: 'readings', kind: 'list', title: 'Readings', tip: READINGS_TIP, items: [resolved('10.1000/xyz123'), resolved('10.1000/abc456')] },
  // the old file lacked the Accommodations statement, so the check finds it missing
  { id: 'policies', kind: 'policies', title: 'Policies', statementIds: ['integrity', 'support'] },
]

export const GRADING_POLICY_HINT = GRADING_HINT
export { LEAD_IN, emptyContact }
