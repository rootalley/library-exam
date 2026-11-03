import { Fragment } from 'react'
import { IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { useSyllabus } from './state.jsx'
import { Start } from './Start.jsx'
import { Editor } from './Editor.jsx'

const STEPS = [['start', 'Start'], ['edit', 'Edit and review'], ['preview', 'Preview and publish']]

// numbered breadcrumbs across the top: Start > Edit and review > Preview and publish
// colors are hard coded to the gt theme for now
function Steps({ current }) {
  return (
    <nav aria-label="Steps" style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 24px', fontSize: 18 }}>
      {STEPS.map(([phase, name], i) => {
        const here = i === current
        return (
          <Fragment key={phase}>
            {i > 0 && <IconArrowOpenEndSolid style={{ fontSize: 14, color: '#6b7780' }} />}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: '#857437', color: '#fff', fontWeight: 700, fontSize: 16 }}>{i + 1}</span>
              <span style={{ fontWeight: here ? 700 : 400, color: here ? '#273540' : '#004F9F' }}>{name}</span>
            </span>
          </Fragment>
        )
      })}
    </nav>
  )
}

export function SyllabusScreen({ heading }) {
  const { state } = useSyllabus()
  // which step is highlighted in the breadcrumb
  const current = { start: 0, edit: 1, preview: 2 }[state.phase]

  return (
    <div>
      {heading}
      <Steps current={current} />
      {state.phase === 'start' && <Start />}
      {state.phase === 'edit' && <Editor />}
    </div>
  )
}
