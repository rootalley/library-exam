// the Immersive Reader for the syllabus page. Canvas has a real one, this copies the parts the prototype shows
import { useState } from 'react'
import { View, Flex, Text, Button, IconButton, Modal } from '@instructure/ui'
import { IconImmersiveReaderLine, IconArrowOpenStartLine } from '@instructure/ui-icons'
import { course } from '../data.js'
import { CONTACT_ROWS, filled } from './Contact.jsx'
import { describe } from './lookup.js'

// the page as a flat list of headings and paragraphs in page order, that's what the reader shows
function paragraphs(blocks) {
  const out = []
  const add = (type, text) => text && out.push({ type, text })
  blocks.forEach((b) => {
    add('h', b.title)
    if (b.kind === 'text') add('p', b.text)
    if (b.kind === 'contact') {
      ;['name', 'title', 'department'].forEach((k) => filled(b.fields[k]) && add('p', b.fields[k]))
      CONTACT_ROWS.forEach(([k, label]) => filled(b.fields[k]) && add('p', `${label}: ${b.fields[k]}`))
    }
    if (b.kind === 'list') b.items.filter((x) => x.input.trim()).forEach((x) => add('p', `\u2022 ${describe(x)}`))
    if (b.kind === 'objectives') { add('p', b.lead); b.items.filter((x) => x.trim()).forEach((x) => add('p', `\u2022 ${x}`)) }
    if (b.kind === 'grading') { b.rows.filter((r) => r.category || r.weight).forEach((r) => add('p', `${r.category}: ${r.weight}%.`)); add('p', b.policy) }
    if (b.kind === 'policies') course.statements.filter((s) => b.statementIds.includes(s.id)).forEach((s) => { add('h3', s.title); add('p', s.text) })
    if (b.kind === 'coursesummary') b.rows.forEach((a) => add('p', `${a.name}, due ${a.date} at ${a.time}.`))
  })
  return out
}

function Reader({ blocks, onClose }) {
  const paras = paragraphs(blocks)

  return (
    <Modal open size="fullscreen" label="Immersive Reader" onDismiss={onClose} shouldCloseOnDocumentClick={false}>
      <Modal.Header>
        <Flex gap="small" wrap="wrap" alignItems="center">
          <Flex.Item><IconButton screenReaderLabel="Exit Immersive Reader" renderIcon={IconArrowOpenStartLine} onClick={onClose} /></Flex.Item>
          <Flex.Item margin="0 medium 0 0"><Text weight="bold" size="large">Immersive Reader</Text></Flex.Item>
        </Flex>
      </Modal.Header>
      <Modal.Body padding="none">
        <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto', background: '#ffffff', color: '#1b1b1b' }}>
          <div style={{ position: 'relative', maxWidth: '46rem', margin: '0 auto', padding: '32px 24px 64px', fontSize: 24, lineHeight: 1.5 }}>
            {paras.map((p, pi) => {
              const style = p.type === 'h' ? { fontSize: '1.35em', fontWeight: 700, margin: '1.4em 0 0.3em' } : p.type === 'h3' ? { fontWeight: 700, margin: '0.8em 0 0.2em' } : { margin: '0 0 0.7em' }
              return <div key={pi} style={style}>{p.text}</div>
            })}
            <View as="div" margin="large 0 0"><Text size="small" color="secondary">Prototype: this emulation reads aloud with a moving highlight and offers text size, spacing, themes, and line focus. The real Immersive Reader also has grammar tools, a picture dictionary, and translation.</Text></View>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

// the button that opens the reader, it goes next to the export buttons
export function ImmersiveReaderButton({ blocks, margin }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button renderIcon={IconImmersiveReaderLine} margin={margin} onClick={() => setOpen(true)}>Immersive Reader</Button>
      {open && <Reader blocks={blocks} onClose={() => setOpen(false)} />}
    </>
  )
}
