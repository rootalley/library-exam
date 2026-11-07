// the finished syllabus page: what students see, and what the instructor previews
import { View, Heading, Text } from '@instructure/ui'
import { course } from '../data.js'
import { JumpLinks, Summary } from '../shared.jsx'
import { slug } from './state.jsx'
import { ContactCard, contactEmpty } from './Contact.jsx'
import { CourseSummaryTable } from './CourseSummary.jsx'
import { ListView } from './List.jsx'

// students never see a block the instructor left empty
export const hasContent = (b) => {
  if (b.kind === 'coursesummary') return b.enabled && b.rows.length > 0
  if (b.kind === 'text') return b.text.trim() !== ''
  if (b.kind === 'contact') return !contactEmpty(b)
  if (b.kind === 'objectives') return b.items.some((x) => x.trim())
  if (b.kind === 'list') return b.items.some((x) => x.input.trim())
  if (b.kind === 'grading') return b.rows.some((r) => r.category || r.weight) || !!b.policy
  return true
}

export function SyllabusPage({ blocks: allBlocks, heading }) {
  const blocks = allBlocks.filter(hasContent)
  const grading = blocks.filter((b) => b.kind === 'grading').flatMap((b) => b.rows).filter((r) => r.category || r.weight)
  // the exam dates in the box come from the course summary, they are the quizzes
  const exams = blocks.filter((b) => b.kind === 'coursesummary').flatMap((b) => b.rows).filter((r) => r.type === 'quiz')

  return (
    <div>
      {heading ? (
        // the title and jump links stay put while the syllabus scrolls under them
        // zIndex 2 keeps the frozen header above the blocks, how z-index stacks things is on MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/z-index
        <div style={{ position: 'sticky', top: 0, zIndex: 2, background: '#fff', padding: '12px 0 8px', marginTop: -12, borderBottom: '1px solid #e8eaec' }}>
          <div>{heading}</div>
          <JumpLinks items={blocks.map((b) => b.title)} margin="0" />
        </div>
      ) : (
        <JumpLinks items={blocks.map((b) => b.title)} />
      )}
      {heading && <div style={{ height: 16 }} />}
      <Summary grading={grading} exams={exams} />
      {blocks.map((b) => (
        <View as="section" display="block" margin="0 0 large" key={b.id}>
          <Heading level="h2" id={slug(b.title)} margin="0 0 x-small">{b.title}</Heading>
          {b.kind === 'text' && <Text as="p">{b.text}</Text>}
          {b.kind === 'list' && <ListView items={b.items} />}
          {b.kind === 'coursesummary' && <CourseSummaryTable rows={b.rows} />}
          {b.kind === 'contact' && <View as="div" margin="small 0 0"><ContactCard block={b} /></View>}
          {b.kind === 'objectives' && (
            <div>
              <Text as="p">{b.lead}</Text>
              <ul style={{ margin: '0 0 0 1.25rem', padding: 0 }}>{b.items.filter((x) => x.trim()).map((x, i) => <li key={i}>{x}</li>)}</ul>
            </div>
          )}
          {b.kind === 'grading' && (
            <div>
              {b.rows.map((r, i) => <View as="div" key={i}><Text>{r.category}: {r.weight}%</Text></View>)}
              {b.policy && <Text as="p">{b.policy}</Text>}
            </div>
          )}
          {b.kind === 'policies' && course.statements.filter((s) => b.statementIds.includes(s.id)).map((s) => (
            <View as="div" key={s.id} margin="0 0 small">
              <Heading level="h3" margin="0 0 xxx-small">{s.title}</Heading>
              <Text as="p">{s.text}</Text>
            </View>
          ))}
        </View>
      ))}
    </div>
  )
}
