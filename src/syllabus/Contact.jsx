// Instructor Info as a card: photo on the left, details on the right
import { Fragment } from 'react'
import photo from '../assets/profile_placeholder.svg'

export const profilePhoto = photo

export const CONTACT_ROWS = [['email', 'Email'], ['phone', 'Phone'], ['office', 'Office'], ['officeHours', 'Office hours'], ['assistants', 'Teaching assistants']]

export function ContactCard({ block }) {
  const f = block.fields

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {block.photo && <img src={photo} alt={`Photo of ${f.name}`} width={128} height={128} style={{ borderRadius: '50%', objectFit: 'cover', flex: 'none' }} />}
      <div>
        <div style={{ fontSize: 24, fontWeight: 700, lineHeight: '30px' }}>{f.name}</div>
        <div style={{ fontSize: 16 }}>{f.title}</div>
        <div style={{ fontSize: 16, color: '#556572' }}>{f.department}</div>
        {/* the label column is as wide as the longest label (max-content), MDN grid-template-columns: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-template-columns */}
        <dl style={{ margin: '10px 0 0', display: 'grid', gridTemplateColumns: 'max-content 1fr', columnGap: 12, rowGap: 2 }}>
          {CONTACT_ROWS.map(([k, label]) => (
            <Fragment key={k}>
              <dt style={{ fontWeight: 700 }}>{label}</dt>
              <dd style={{ margin: 0 }}>{f[k]}</dd>
            </Fragment>
          ))}
        </dl>
      </div>
    </div>
  )
}
