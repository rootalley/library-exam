// Instructor Info as a card: photo on the left, details on the right
import { Fragment } from 'react'
import photo from '../assets/profile_placeholder.svg'
import { Marked } from './Marked.jsx'

export const profilePhoto = photo

// a field counts as filled when it has more than spaces in it
export const filled = (v) => typeof v === 'string' && v.trim() !== ''
export const contactEmpty = (b) => !b.photo && Object.values(b.fields).every((v) => !filled(v))

export const CONTACT_ROWS = [['email', 'Email'], ['phone', 'Phone'], ['office', 'Office'], ['officeHours', 'Office hours'], ['assistants', 'Teaching assistants']]

export function ContactCard({ block, flags = [] }) {
  const f = block.fields
  // highlights the flagged part of a field, if it has one
  const mark = (key) => <Marked text={f[key]} flags={flags} />
  const rows = CONTACT_ROWS.filter(([k]) => filled(f[k]))

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {block.photo && <img src={photo} alt={`Photo of ${f.name}`} width={128} height={128} style={{ borderRadius: '50%', objectFit: 'cover', flex: 'none' }} />}
      <div>
        {filled(f.name) && <div style={{ fontSize: 24, fontWeight: 700, lineHeight: '30px' }}>{mark('name')}</div>}
        {filled(f.title) && <div style={{ fontSize: 16 }}>{mark('title')}</div>}
        {filled(f.department) && <div style={{ fontSize: 16, color: '#556572' }}>{mark('department')}</div>}
        {/* the label column is as wide as the longest label (max-content), MDN grid-template-columns: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns */}
        {rows.length > 0 && (
          <dl style={{ margin: '10px 0 0', display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: 12, rowGap: 2 }}>
            {rows.map(([k, label]) => (
              <Fragment key={k}>
                <dt style={{ fontWeight: 700 }}>{label}</dt>
                <dd style={{ margin: 0 }}>{mark(k)}</dd>
              </Fragment>
            ))}
          </dl>
        )}
      </div>
    </div>
  )
}
