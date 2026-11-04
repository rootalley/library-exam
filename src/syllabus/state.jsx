import { createContext, useContext, useReducer } from 'react'
import { importedBlocks, starterBlocks, blockTypes } from './sample.js'

const Ctx = createContext(null)
export const useSyllabus = () => useContext(Ctx)

// phase is which of the three steps we are on: start, edit or preview
const initial = { phase: 'start', blocks: [], source: null, nextId: 1 }

// changes one block, leaves the others alone
const updateBlock = (s, id, fn) => ({ ...s, blocks: s.blocks.map((b) => (b.id === id ? fn(b) : b)) })

// all the changes to the syllabus go through this reducer, docs: https://react.dev/reference/react/useReducer
export function reducer(s, a) {
  switch (a.type) {
    case 'import':
      return { ...initial, phase: 'edit', source: a.source, blocks: importedBlocks() }
    case 'editText':
      return updateBlock(s, a.id, (b) => ({ ...b, text: a.text }))
    case 'move': {
      // swap the block with its neighbor, a.dir is -1 for up and 1 for down
      const i = s.blocks.findIndex((b) => b.id === a.id)
      const j = i + a.dir
      if (j < 0 || j >= s.blocks.length) return s
      const blocks = [...s.blocks]
      ;[blocks[i], blocks[j]] = [blocks[j], blocks[i]]
      return { ...s, blocks }
    }
    case 'removeBlock':
      return { ...s, blocks: s.blocks.filter((b) => b.id !== a.id) }
    case 'addBlock': {
      const t = blockTypes[a.index]
      const b = { id: `n${s.nextId}`, kind: t.kind, title: t.title, placeholder: t.placeholder, hint: t.hint }
      if (t.kind === 'text') b.text = ''
      return { ...s, blocks: [...s.blocks, b], nextId: s.nextId + 1 }
    }
    case 'restoreBlock':
      return updateBlock(s, a.block.id, () => a.block)
    case 'blank':
      return { ...initial, phase: 'edit', source: 'blank', blocks: starterBlocks() }
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
