import { createContext, useContext, useReducer } from 'react'
import { course } from '../data.js'
import { importedBlocks, importedFlags, item, starterBlocks, blockTypes, emptyContact, shiftRows, summaryRows2026, TERM_NEW, LEAD_IN, GRADING_POLICY_HINT } from './sample.js'

const Ctx = createContext(null)
export const useSyllabus = () => useContext(Ctx)

// phase is which of the three steps we are on: start, edit or preview
const initial = { phase: 'start', blocks: [], source: null, flags: [], datesShifted: false, dateLog: [], log: [], nextId: 1 }

// changes one block, leaves the others alone
const updateBlock = (s, id, fn) => ({ ...s, blocks: s.blocks.map((b) => (b.id === id ? fn(b) : b)) })

// all the changes to the syllabus go through this reducer, docs: https://react.dev/reference/react/useReducer
export function reducer(s, a) {
  switch (a.type) {
    case 'import':
      return { ...initial, phase: 'edit', source: a.source, blocks: importedBlocks(), flags: importedFlags(),
        log: [a.source === 'word' ? `Imported my_syllabus.docx into ${importedBlocks().length} blocks` : `Copied a previous syllabus into ${importedBlocks().length} blocks`] }
    case 'shiftDates': {
      // every course summary row moves to the new term, the old and new dates go in dateLog
      const dateLog = []
      const blocks = s.blocks.map((b) => {
        if (b.kind !== 'coursesummary') return b
        const rows = shiftRows(b.rows)
        b.rows.forEach((r, i) => dateLog.push(`${r.date} \u2192 ${rows[i].date}`))
        return { ...b, rows }
      })
      return { ...s, blocks, datesShifted: true, dateLog, log: [...s.log, `Moved all dates to ${TERM_NEW}`] }
    }
    case 'resolveFlag': {
      const f = s.flags.find((x) => x.id === a.id)
      let st = { ...s, flags: s.flags.map((x) => (x.id === a.id ? { ...x, resolved: true } : x)) }
      if (a.replace && f.replacement) {
        // swap the flagged text for the replacement inside its block
        st = updateBlock(st, f.blockId, (b) => ({ ...b, text: b.text.split(f.text).join(f.replacement) }))
        return { ...st, log: [...s.log, `Changed "${f.text}" to "${f.replacement}"`] }
      }
      return { ...st, log: [...s.log, `Kept "${f.text}"`] }
    }
    case 'insertStatement': {
      // put the statement back, keeping the university's order
      const order = course.statements.map((x) => x.id)
      const st = updateBlock(s, 'policies', (b) => ({ ...b, statementIds: order.filter((id) => id === a.id || b.statementIds.includes(id)) }))
      const title = course.statements.find((x) => x.id === a.id).title
      return { ...st, log: [...s.log, `Inserted the ${title} statement (locked)`] }
    }
    case 'setListEntry':
      // only if the line still holds the text that was looked up
      return updateBlock(s, a.id, (b) => ({ ...b, items: b.items.map((x, i) => (i === a.index && x.input === a.input ? { ...x, entry: a.entry, status: a.status } : x)) }))
    case 'editListItem':
      return updateBlock(s, a.id, (b) => ({ ...b, items: b.items.map((x, i) => (i === a.index ? item(a.value) : x)) }))
    case 'addListItem':
      return updateBlock(s, a.id, (b) => ({ ...b, items: [...b.items, item()] }))
    case 'removeListItem':
      return updateBlock(s, a.id, (b) => ({ ...b, items: b.items.filter((_, i) => i !== a.index) }))
    case 'editText':
      return updateBlock(s, a.id, (b) => ({ ...b, text: a.text }))
    case 'move': {
      // swap the block with its neighbor, a.dir is -1 for up and 1 for down
      const i = s.blocks.findIndex((b) => b.id === a.id)
      const j = i + a.dir
      if (j < 0 || j >= s.blocks.length) return s
      const blocks = [...s.blocks]
      ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
      return { ...s, blocks, log: [...s.log, `Moved ${blocks[j].title} ${a.dir < 0 ? 'up' : 'down'}`] }
    }
    case 'removeBlock': {
      const b = s.blocks.find((x) => x.id === a.id)
      return { ...s, blocks: s.blocks.filter((x) => x.id !== a.id), log: [...s.log, `Removed ${b.title}`] }
    }
    case 'addBlock': {
      const t = blockTypes[a.index]
      const b = { id: `n${s.nextId}`, kind: t.kind, title: t.title, placeholder: t.placeholder, hint: t.hint, tip: t.tip }
      if (t.kind === 'contact') { b.fields = emptyContact(); b.photo = false }
      if (t.kind === 'objectives') { b.lead = LEAD_IN; b.items = [''] }
      if (t.kind === 'coursesummary') { b.enabled = true; b.rows = shiftRows(summaryRows2026()) }
      if (t.kind === 'list') b.items = [item()]
      if (t.kind === 'policies') b.statementIds = course.statements.map((x) => x.id)
      if (t.kind === 'text') b.text = ''
      if (t.kind === 'grading') { b.rows = [{ category: '', weight: '' }]; b.policy = ''; b.policyHint = GRADING_POLICY_HINT }
      return { ...s, blocks: [...s.blocks, b], nextId: s.nextId + 1, log: [...s.log, `Added ${t.title}`] }
    }
    case 'restoreBlock':
      return updateBlock(s, a.block.id, () => a.block)
    case 'blank':
      return { ...initial, phase: 'edit', source: 'blank', blocks: starterBlocks(), log: [`Started with ${starterBlocks().length} blank blocks`] }
    case 'editField':
      return updateBlock(s, a.id, (b) => ({ ...b, fields: { ...b.fields, [a.field]: a.value } }))
    case 'setPhoto':
      return updateBlock(s, a.id, (b) => ({ ...b, photo: a.value }))
    case 'editLead':
      return updateBlock(s, a.id, (b) => ({ ...b, lead: a.value }))
    case 'editItem':
      return updateBlock(s, a.id, (b) => ({ ...b, items: b.items.map((x, i) => (i === a.index ? a.value : x)) }))
    case 'addItem':
      return updateBlock(s, a.id, (b) => ({ ...b, items: [...b.items, ''] }))
    case 'removeItem':
      return updateBlock(s, a.id, (b) => ({ ...b, items: b.items.filter((_, i) => i !== a.index) }))
    case 'editRow':
      return updateBlock(s, a.id, (b) => ({ ...b, rows: b.rows.map((r, i) => (i === a.index ? { ...r, [a.field]: a.value } : r)) }))
    case 'addRow':
      return updateBlock(s, a.id, (b) => ({ ...b, rows: [...b.rows, { category: '', weight: '' }] }))
    case 'removeRow':
      return updateBlock(s, a.id, (b) => ({ ...b, rows: b.rows.filter((_, i) => i !== a.index) }))
    case 'editPolicy':
      return updateBlock(s, a.id, (b) => ({ ...b, policy: a.value }))
    case 'toggleBlock': {
      const b = s.blocks.find((x) => x.id === a.id)
      return { ...updateBlock(s, a.id, (x) => ({ ...x, enabled: !x.enabled })), log: [...s.log, `${b.enabled ? 'Turned off' : 'Turned on'} ${b.title}`] }
    }
    case 'phase':
      return { ...s, phase: a.phase }
    default:
      return s
  }
}

export function SyllabusProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initial)
  return <Ctx.Provider value={{ state, dispatch }}>{children}</Ctx.Provider>
}

// all the text a block holds, so a flag can find its detail whatever kind of block it is
export const blockText = (b) => (b.kind === 'text' ? b.text : b.kind === 'contact' ? Object.values(b.fields).join('\n') : b.kind === 'objectives' ? [b.lead, ...b.items].join('\n') : '')

// flags that are still open and whose text is still in the syllabus
export const activeFlags = (s) => s.flags.filter((f) => !f.resolved && s.blocks.some((b) => b.id === f.blockId && blockText(b).includes(f.text)))

// the required statements the Policies block doesn't have yet
export const missingStatements = (s) => {
  const p = s.blocks.find((b) => b.kind === 'policies')
  return p ? course.statements.filter((x) => !p.statementIds.includes(x.id)) : []
}
