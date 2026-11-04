// fake sample content for the prototype, no real names or data

const CATALOG_HINT = "Paste the description exactly as it appears in the university's course catalog."
const CATALOG_PROMPT = "Paste the exact course description from the university's catalog."
const MEETINGS_PROMPT = 'When and where the class meets: days, times, and room or online meeting instructions.'

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
  { id: 'meetings', kind: 'text', title: 'Class Meetings', text: 'This is the Spring 2026 section. It meets Tuesdays and Thursdays in Science Hall Room 214.' },
]
