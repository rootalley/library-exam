import { createContext, useContext, useReducer } from 'react'

const Ctx = createContext(null)
export const useSyllabus = () => useContext(Ctx)

// phase is which of the three steps we are on: start, edit or preview
const initial = { phase: 'start', blocks: [] }

// all the changes to the syllabus go through this reducer, docs: https://react.dev/reference/react/useReducer
export function reducer(s, a) {
  switch (a.type) {
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
