// the finished syllabus page: what students see, and what the instructor previews
import { View, Heading, Text } from '@instructure/ui'
import { course } from '../data.js'
import { ContactCard } from './Contact.jsx'
import { CourseSummaryTable } from './CourseSummary.jsx'
import { ListView } from './List.jsx'

export function SyllabusPage({ blocks }) {
  return (
    <div>
      {blocks.map((b) => (
        <View as="section" display="block" margin="0 0 large" key={b.id}>
          <Heading level="h2" margin="0 0 x-small">{b.title}</Heading>
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
