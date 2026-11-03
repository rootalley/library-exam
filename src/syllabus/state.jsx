import { createContext, useContext, useReducer } from 'react'
import { importedBlocks } from './sample.js'

const Ctx = createContext(null)
export const useSyllabus = () => useContext(Ctx)

// phase is which of the three steps we are on: start, edit or preview
const initial = { phase: 'start', blocks: [], source: null }

// changes one block, leaves the others alone
const updateBlock = (s, id, fn) => ({ ...s, blocks: s.blocks.map((b) => (b.id === id ? fn(b) : b)) })

// all the changes to the syllabus go through this reducer, docs: https://react.dev/reference/react/useReducer
export function reducer(s, a) {
  switch (a.type) {
    case 'import':
      return { ...initial, phase: 'edit', source: a.source, blocks: importedBlocks() }
    case 'editText':
      return updateBlock(s, a.id, (b) => ({ ...b, text: a.text }))
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
