// the Immersive Reader for the syllabus page. Canvas has a real one, this copies the parts the prototype shows
import { course } from '../data.js'
import { CONTACT_ROWS, filled } from './Contact.jsx'
import { describe } from './lookup.js'

// the page as a flat list of headings and paragraphs in page order, that's what the reader shows
export function paragraphs(blocks) {
  const out = []
  const add = (type, text) => text && out.push({ type, text })
  blocks.forEach((b) => {
    add('h', b.title)
    if (b.kind === 'text') add('p', b.text)
    if (b.kind === 'contact') {
      ;['name', 'title', 'department'].forEach((k) => filled(b.fields[k]) && add('p', b.fields[k]))
      CONTACT_ROWS.forEach(([k, label]) => filled(b.fields[k]) && add('p', `${label}: ${b.fields[k]}`))
    }
    if (b.kind === 'list') b.items.filter((x) => x.input.trim()).forEach((x) => add('p', `\u2022 ${describe(x)}`))
    if (b.kind === 'objectives') { add('p', b.lead); b.items.filter((x) => x.trim()).forEach((x) => add('p', `\u2022 ${x}`)) }
    if (b.kind === 'grading') { b.rows.filter((r) => r.category || r.weight).forEach((r) => add('p', `${r.category}: ${r.weight}%.`)); add('p', b.policy) }
    if (b.kind === 'policies') course.statements.filter((s) => b.statementIds.includes(s.id)).forEach((s) => { add('h3', s.title); add('p', s.text) })
    if (b.kind === 'coursesummary') b.rows.forEach((a) => add('p', `${a.name}, due ${a.date} at ${a.time}.`))
  })
  return out
}
