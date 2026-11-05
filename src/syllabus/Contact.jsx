// Instructor Info as a card, plain lines for now
export const CONTACT_ROWS = [['email', 'Email'], ['phone', 'Phone'], ['office', 'Office'], ['officeHours', 'Office hours'], ['assistants', 'Teaching assistants']]

export function ContactCard({ block }) {
  const f = block.fields

  return (
    <div>
      <div>{f.name}</div>
      <div>{f.title}</div>
      <div>{f.department}</div>
      {CONTACT_ROWS.map(([k, label]) => <div key={k}>{label}: {f[k]}</div>)}
    </div>
  )
}
