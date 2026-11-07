import { Fragment } from 'react'
import { IconArrowOpenEndSolid } from '@instructure/ui-icons'
import { useSyllabus } from './state.jsx'
import { Start } from './Start.jsx'
import { Alert } from '@instructure/ui'
import { Editor } from './Editor.jsx'
import { Preview } from './Preview.jsx'
import { SyllabusPage } from './Page.jsx'

const STEPS = [['start', 'Start'], ['edit', 'Edit and review'], ['preview', 'Preview and publish']]

// numbered breadcrumbs across the top: Start > Edit and review > Preview and publish
// click a step to jump to it, steps 2 and 3 need a syllabus to exist first
// colors are hard coded to the gt theme for now
function Steps({ current }) {
  const { state, dispatch } = useSyllabus()
  const hasSyllabus = state.blocks.length > 0

  return (
    <nav aria-label="Steps" style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 24px', fontSize: 18 }}>
      {STEPS.map(([phase, name], i) => {
        const enabled = i === 0 || hasSyllabus
        const here = i === current
        const body = (
          <>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 30, height: 30, borderRadius: '50%', background: enabled ? '#857437' : '#8d959f', color: '#fff', fontWeight: 700, fontSize: 16 }}>{i + 1}</span>
            <span style={{ fontWeight: here ? 700 : 400, color: !enabled ? '#6b7780' : here ? '#273540' : '#004F9F' }}>{name}</span>
          </>
        )
        const common = { display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }
        return (
          <Fragment key={phase}>
            {i > 0 && <IconArrowOpenEndSolid style={{ fontSize: 14, color: '#6b7780' }} />}
            {enabled && !here
              ? <a href="#" style={common} onClick={(e) => { e.preventDefault(); dispatch({ type: 'phase', phase }) }}>{body}</a>
              : <span style={common} aria-current={here ? 'step' : undefined}>{body}</span>}
          </Fragment>
        )
      })}
    </nav>
  )
}

export function SyllabusScreen({ view, heading }) {
  const { state } = useSyllabus()

  // students only see the page once the instructor has published it
  if (view === 'student') {
    return state.published
      ? <SyllabusPage blocks={state.blocks} heading={heading} />
      : <div>{heading}<Alert variant="info" renderCloseButtonLabel={null}>The instructor hasn't published a syllabus for this course yet.</Alert></div>
  }

  // which step is highlighted in the breadcrumb
  const current = { start: 0, edit: 1, preview: 2 }[state.phase]

  return (
    <div>
      {heading}
      <Steps current={current} />
      {state.phase === 'start' && <Start />}
      {state.phase === 'edit' && <Editor />}
      {state.phase === 'preview' && <Preview />}
    </div>
  )
}
