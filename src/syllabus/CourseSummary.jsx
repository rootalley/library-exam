// the course summary: assignments, discussions and quizzes with their due dates
// it comes from the course, nobody types it in. The names look like canvas links but don't do anything here
import { Link } from '@instructure/ui'
import { IconAssignmentLine, IconDiscussionLine, IconQuizLine } from '@instructure/ui-icons'

const ICONS = { assignment: IconAssignmentLine, discussion: IconDiscussionLine, quiz: IconQuizLine }
const th = { textAlign: 'left', padding: '8px 12px 8px 0', borderBottom: '1px solid #8d959f', fontWeight: 700 }
const td = { padding: '12px 12px 12px 0', borderBottom: '1px solid #e8eaec', verticalAlign: 'top' }

export function CourseSummaryTable({ rows }) {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <caption style={{ position: 'absolute', left: -9999 }}>Assignments, discussions, and quizzes with their due dates</caption>
      <thead>
        <tr>
          <th scope="col" style={{ ...th, width: '9rem' }}>Date</th>
          <th scope="col" style={{ ...th, width: '6rem' }}>Due</th>
          <th scope="col" style={th}>Details</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const Icon = ICONS[r.type]
          return (
            <tr key={r.name}>
              <td style={td}>{r.date}</td>
              <td style={td}>{r.time}</td>
              <td style={td}>
                <Link href="#" isWithinText={false} renderIcon={<Icon />} onClick={(e) => e.preventDefault()}>{r.name}</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
