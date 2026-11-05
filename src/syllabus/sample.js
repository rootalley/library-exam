// fake sample content for the prototype, no real names or data
import { course } from '../data.js'

const CATALOG_HINT = "Paste the description exactly as it appears in the university's course catalog."
const CATALOG_PROMPT = "Paste the exact course description from the university's catalog."
const MEETINGS_PROMPT = 'When and where the class meets: days, times, and room or online meeting instructions.'

const LEAD_IN = 'Upon successful completion of the course, you will be able to:'

// the kinds of block the instructor can add
export const blockTypes = [
  { kind: 'text', title: 'Course Description', placeholder: CATALOG_PROMPT, hint: CATALOG_HINT },
  { kind: 'text', title: 'Class Meetings', placeholder: MEETINGS_PROMPT },
  { kind: 'text', title: 'Free Text', placeholder: 'Anything unique to your course.' },
]

// a new instructor never sees an empty page, these are the blocks they start with
export const starterBlocks = () => [
  { id: 'catalog', kind: 'text', title: 'Course Description', text: '', placeholder: CATALOG_PROMPT, hint: CATALOG_HINT },
  { id: 'meetings', kind: 'text', title: 'Class Meetings', text: '', placeholder: MEETINGS_PROMPT },
]

// what a word file or last term's canvas page would turn into: one block per heading
export const importedBlocks = () => [
  { id: 'catalog', kind: 'text', title: 'Course Description', text: 'Introduces the principles of designing and evaluating user interfaces. Students learn how people perceive, think, and act, and apply that knowledge by building and testing interface prototypes. Three credit hours.' },
  { id: 'instructor', kind: 'contact', title: 'Instructor Info', photo: true,
    fields: { name: 'Prof. Casey Rivera', title: 'Associate Professor', department: 'Department of Computer Science', email: 'casey.rivera@example.edu', phone: '(555) 010-0142', office: 'Science Hall 310', officeHours: 'Wednesdays, 2 to 4 pm', assistants: 'Jordan Lee' } },
  { id: 'objectives', kind: 'objectives', title: 'Learning Objectives', lead: LEAD_IN,
    items: ['Explain the core principles of human-computer interaction.', 'Evaluate an interface with real users.', 'Design and test a prototype of a new interface.'] },
  { id: 'grading', kind: 'grading', title: 'Grading Scheme', rows: course.grading.map((g) => ({ ...g })),
    policy: 'Late homework loses 10% per day for up to three days. Letter grades follow the university scale.' },
  { id: 'meetings', kind: 'text', title: 'Class Meetings', text: 'This is the Spring 2026 section. It meets Tuesdays and Thursdays in Science Hall Room 214.' },
]
