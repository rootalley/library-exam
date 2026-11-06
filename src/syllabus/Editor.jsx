import { useRef, useState } from 'react'
import { View, Flex, Heading, Text, Button, IconButton, TextInput, TextArea, Pill, Checkbox, ScreenReaderContent } from '@instructure/ui'
import { IconArrowUpLine, IconArrowDownLine, IconEditLine, IconTrashLine, IconAddLine, IconCheckMarkSolid, IconWarningLine } from '@instructure/ui-icons'
import { useSyllabus, activeFlags, missingStatements } from './state.jsx'
import { ContactCard, contactEmpty, profilePhoto } from './Contact.jsx'
import { CourseSummaryTable } from './CourseSummary.jsx'
import { Marked } from './Marked.jsx'
import { LockedStatement } from '../shared.jsx'
import { course } from '../data.js'
import { blockTypes, TERM_OLD, TERM_NEW } from './sample.js'

// hidden label so the text box still has a name for screen readers
const label = (t) => <ScreenReaderContent>{t}</ScreenReaderContent>

const FIELDS = [['name', 'Name'], ['title', 'Title'], ['department', 'Department'], ['email', 'Email'], ['phone', 'Phone'], ['office', 'Office'], ['officeHours', 'Office hours'], ['assistants', 'Teaching assistants']]

// the instructor info form, like an address book entry
function ContactForm({ block, dispatch }) {
  return (
    <div>
      <Flex gap="medium" alignItems="start" margin="0 0 small">
        <Flex.Item>
          <div style={{ width: 96, height: 96, borderRadius: '50%', overflow: 'hidden', background: '#eceef0' }}>
            {block.photo && <img src={profilePhoto} alt="" width={96} height={96} style={{ display: 'block' }} />}
          </div>
        </Flex.Item>
        <Flex.Item>
          <View as="div" margin="x-small 0"><Text weight="bold">Photo</Text></View>
          {block.photo
            ? <Button size="small" onClick={() => dispatch({ type: 'setPhoto', id: block.id, value: false })}>Remove photo</Button>
            : <Button size="small" onClick={() => dispatch({ type: 'setPhoto', id: block.id, value: true })}>Add a photo</Button>}
          <View as="div" margin="x-small 0 0"><Text size="small" color="secondary">Prototype: adds a sample photo. It is shown as a circle.</Text></View>
        </Flex.Item>
      </Flex>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px' }}>
        {FIELDS.map(([k, name]) => (
          <TextInput key={k} renderLabel={name} value={block.fields[k]} onChange={(e, v) => dispatch({ type: 'editField', id: block.id, field: k, value: v })} />
        ))}
      </div>
      <View as="div" margin="small 0 0"><Text size="small" color="secondary">Anything you leave blank is not shown to students.</Text></View>
    </div>
  )
}

// grading scheme: weighted categories plus a free text grading policy
function Rows({ block, editing, dispatch }) {
  const total = block.rows.reduce((n, r) => n + (Number(r.weight) || 0), 0)
  return (
    <div>
      {block.rows.map((r, i) => editing ? (
        <Flex key={i} gap="small" margin="0 0 x-small" alignItems="center">
          <Flex.Item shouldGrow><TextInput renderLabel={label('Category')} placeholder="Category" value={r.category} onChange={(e, v) => dispatch({ type: 'editRow', id: block.id, index: i, field: 'category', value: v })} /></Flex.Item>
          <Flex.Item size="6rem"><TextInput renderLabel={label('Weight')} placeholder="Weight %" value={String(r.weight)} onChange={(e, v) => dispatch({ type: 'editRow', id: block.id, index: i, field: 'weight', value: v })} /></Flex.Item>
          <Flex.Item><IconButton screenReaderLabel="Remove row" renderIcon={IconTrashLine} size="small" withBackground={false} withBorder={false} onClick={() => dispatch({ type: 'removeRow', id: block.id, index: i })} /></Flex.Item>
        </Flex>
      ) : (
        <View as="div" key={i}><Text>{`${r.category || '(untitled)'}: ${r.weight || 0}%`}</Text></View>
      ))}
      {editing && <Button size="small" renderIcon={IconAddLine} onClick={() => dispatch({ type: 'addRow', id: block.id })}>Add a row</Button>}
      <View as="div" margin="x-small 0 small">
        <Pill color={total === 100 ? 'success' : 'warning'}>{total === 100 ? 'Total: 100%' : `Total: ${total}% (should be 100%)`}</Pill>
      </View>
      {editing
        ? <TextArea label="Grading policy" height="5rem" placeholder="Explain your grading policy." value={block.policy || ''} messages={block.policyHint ? [{ text: block.policyHint, type: 'hint' }] : []} onChange={(e) => dispatch({ type: 'editPolicy', id: block.id, value: e.target.value })} />
        : block.policy ? <Text as="p">{block.policy}</Text> : <Text color="secondary" fontStyle="italic">No grading policy yet. Select Edit to explain how grades are calculated.</Text>}
    </div>
  )
}

// learning objectives: a lead-in sentence, a list, and a tip for the instructor
function Objectives({ block, editing, dispatch }) {
  return (
    <div>
      {editing ? (
        <div>
          <TextArea label="Lead-in text" height="3.5rem" value={block.lead} onChange={(e) => dispatch({ type: 'editLead', id: block.id, value: e.target.value })} />
          <View as="div" margin="small 0 x-small"><Text weight="bold">Objectives</Text></View>
          {block.items.map((it, i) => (
            <Flex key={i} gap="small" margin="0 0 x-small" alignItems="center">
              <Flex.Item shouldGrow><TextInput renderLabel={label(`Objective ${i + 1}`)} placeholder={`Objective ${i + 1}`} value={it} onChange={(e, v) => dispatch({ type: 'editItem', id: block.id, index: i, value: v })} /></Flex.Item>
              <Flex.Item><IconButton screenReaderLabel={`Remove objective ${i + 1}`} renderIcon={IconTrashLine} size="small" withBackground={false} withBorder={false} onClick={() => dispatch({ type: 'removeItem', id: block.id, index: i })} /></Flex.Item>
            </Flex>
          ))}
          <Button size="small" renderIcon={IconAddLine} onClick={() => dispatch({ type: 'addItem', id: block.id })}>Add a line</Button>
        </div>
      ) : (
        <div>
          <Text as="p">{block.lead}</Text>
          <ul style={{ margin: '0 0 0 1.25rem', padding: 0 }}>
            {block.items.filter((x) => x.trim()).map((x, i) => <li key={i}>{x}</li>)}
          </ul>
        </div>
      )}
      <View as="div" margin="small 0 0" padding="x-small small" background="secondary" borderRadius="small">
        <Text size="small"><Text size="small" weight="bold">Instructor tip: </Text>Learning objectives should specify observable student abilities or behaviors.</Text>
      </View>
    </div>
  )
}

// one block: the title, an Edit button, and the text
function Block({ block, index, count, flags }) {
  const { dispatch } = useSyllabus()
  const [editing, setEditing] = useState(false)
  // the block as it was when editing started, so Cancel can put it back. useRef docs: https://react.dev/reference/react/useRef
  const summary = block.kind === 'coursesummary'
  const policies = block.kind === 'policies'
  const snapshot = useRef(block)
  const startEditing = () => { snapshot.current = block; setEditing(true) }
  const cancelEditing = () => { dispatch({ type: 'restoreBlock', block: snapshot.current }); setEditing(false) }

  return (
    <View as="section" display="block" borderWidth="small" borderRadius="medium" padding="small medium" margin="0 0 small" background="primary">
      <Flex alignItems="center" margin="0 0 x-small">
        <Flex.Item shouldGrow>
          <Heading level="h3" as="h3">{block.title}</Heading>
        </Flex.Item>
        {policies && <Flex.Item><Pill color="info">Locked</Pill></Flex.Item>}
        <Flex.Item><IconButton screenReaderLabel={`Move ${block.title} up`} renderIcon={IconArrowUpLine} size="small" withBackground={false} withBorder={false} interaction={index === 0 ? 'disabled' : 'enabled'} onClick={() => dispatch({ type: 'move', id: block.id, dir: -1 })} /></Flex.Item>
        <Flex.Item><IconButton screenReaderLabel={`Move ${block.title} down`} renderIcon={IconArrowDownLine} size="small" withBackground={false} withBorder={false} interaction={index === count - 1 ? 'disabled' : 'enabled'} onClick={() => dispatch({ type: 'move', id: block.id, dir: 1 })} /></Flex.Item>
        {summary && <Flex.Item><Checkbox label="Show to students" checked={block.enabled} onChange={() => dispatch({ type: 'toggleBlock', id: block.id })} margin="0 small" /></Flex.Item>}
        {!policies && !summary && editing && <Flex.Item><Button size="small" margin="0 0 0 x-small" onClick={cancelEditing}>Cancel</Button></Flex.Item>}
        {!policies && !summary && (
          <Flex.Item>
            <Button size="small" renderIcon={editing ? IconCheckMarkSolid : IconEditLine} margin="0 x-small" onClick={() => (editing ? setEditing(false) : startEditing())}>{editing ? 'Done' : 'Edit'}</Button>
          </Flex.Item>
        )}
        {!summary && <Flex.Item><IconButton screenReaderLabel={policies ? 'Policies is required and cannot be removed' : `Remove ${block.title}`} renderIcon={IconTrashLine} size="small" withBackground={false} withBorder={false} interaction={policies ? 'disabled' : 'enabled'} onClick={() => dispatch({ type: 'removeBlock', id: block.id })} /></Flex.Item>}
      </Flex>
      {block.kind === 'text' && (editing
        ? <TextArea label={label(block.title)} placeholder={block.placeholder} height="6rem" value={block.text} messages={block.hint ? [{ text: block.hint, type: 'hint' }] : []} onChange={(e) => dispatch({ type: 'editText', id: block.id, text: e.target.value })} />
        : <Text as="p">{block.text ? <Marked text={block.text} flags={flags.filter((f) => f.blockId === block.id)} /> : <Text color="secondary" fontStyle="italic">{block.placeholder}</Text>}</Text>)}
      {policies && (
        <div>
          {course.statements.filter((s) => block.statementIds.includes(s.id)).map((s) => <LockedStatement key={s.id} {...s} />)}
          <Text size="small" color="secondary">The university supplies these statements, so they can't be edited here.</Text>
        </div>
      )}
      {summary && (
        <div>
          <div style={{ opacity: block.enabled ? 1 : 0.45 }}><CourseSummaryTable rows={block.rows} /></div>
          {!block.enabled && <View as="div" margin="x-small 0 0"><Text size="small" color="secondary">Turned off: students won't see this block.</Text></View>}
          <View as="div" margin="small 0 0" padding="x-small small" background="secondary" borderRadius="small">
            <Text size="small"><Text size="small" weight="bold">Instructor tip: </Text>The contents of this block are generated from the course's assignments and their due dates, so there is nothing to type.</Text>
          </View>
        </div>
      )}
      {block.kind === 'grading' && <Rows block={block} editing={editing} dispatch={dispatch} />}
      {block.kind === 'objectives' && <Objectives block={block} editing={editing} dispatch={dispatch} />}
      {block.kind === 'contact' && (editing
        ? <ContactForm block={block} dispatch={dispatch} />
        : contactEmpty(block)
          ? <Text color="secondary" fontStyle="italic">Name, title, email, office hours, and a photo, like an address-book entry.</Text>
          : <ContactCard block={block} flags={flags.filter((f) => f.blockId === block.id)} />)}
    </View>
  )
}

// a line with a green check or a yellow warning in front of it
function Check({ ok, children }) {
  return (
    <Flex gap="x-small" alignItems="start" margin="0 0 x-small">
      <Flex.Item>{ok ? <IconCheckMarkSolid color="success" /> : <IconWarningLine color="warning" />}</Flex.Item>
      <Flex.Item shouldShrink>{children}</Flex.Item>
    </Flex>
  )
}

// the panel on the right: the checks before publishing and a Preview button
function Panel({ state, dispatch }) {
  // a blank syllabus has nothing old to bring forward
  const imported = state.source !== 'blank'
  const flags = activeFlags(state)
  const missing = missingStatements(state)

  return (
    <View as="aside" display="block" borderWidth="small" borderRadius="medium" padding="medium" background="secondary" aria-label="Review">
      <Heading level="h3" margin="0 0 small">Review</Heading>
      {imported && (
        <View as="div" margin="0 0 medium">
          <Text weight="bold">Dates</Text>
          {!state.datesShifted ? (
            <div>
              <View as="div" margin="x-small 0"><Text>These dates are from {TERM_OLD}:</Text></View>
              <View as="div" margin="0 0 x-small">
                {state.blocks.filter((b) => b.kind === 'coursesummary').flatMap((b) => b.rows).map((r, i) => (
                  <View as="div" key={i}><Text size="small">{r.date}</Text></View>
                ))}
              </View>
              <Button size="small" color="primary" onClick={() => dispatch({ type: 'shiftDates' })}>Move all dates to {TERM_NEW}</Button>
            </div>
          ) : (
            <div>
              <Check ok>Dates moved to {TERM_NEW}.</Check>
              {state.dateLog.map((d) => <View as="div" key={d}><Text size="small">{d}</Text></View>)}
            </div>
          )}
        </View>
      )}
      {imported && (
        <View as="div" margin="0 0 medium">
          <Text weight="bold">Details to check ({flags.length})</Text>
          {flags.length === 0 && <Check ok>Every flagged detail has been reviewed.</Check>}
          {flags.map((f) => (
            <View as="div" key={f.id} margin="x-small 0" padding="x-small" background="primary" borderWidth="small" borderRadius="small">
              <mark style={{ background: '#fff176', padding: '0 2px', wordBreak: 'break-all' }}>{f.text}</mark>
              <View as="div" margin="xx-small 0"><Text size="small">{f.note}</Text></View>
              <Button size="small" margin="0 x-small 0 0" onClick={() => dispatch({ type: 'resolveFlag', id: f.id })}>Looks right</Button>
              {f.replacement && <Button size="small" onClick={() => dispatch({ type: 'resolveFlag', id: f.id, replace: true })}>Use {f.replacement}</Button>}
            </View>
          ))}
          <View as="div" margin="x-small 0 0"><Text size="small" color="secondary">Flagged details are highlighted in yellow. Every block can be edited, not only the flagged ones.</Text></View>
        </View>
      )}
      <View as="div" margin="0 0 medium">
        <Text weight="bold">Required statements</Text>
        <View as="div" margin="x-small 0 0">
          {course.statements.map((s) => {
            const ok = !missing.some((m) => m.id === s.id)
            return (
              <Check ok={ok} key={s.id}>
                {s.title}{ok ? '' : ' is missing. '}
                {!ok && <Button size="small" margin="xx-small 0 0" onClick={() => dispatch({ type: 'insertStatement', id: s.id })}>Insert it</Button>}
              </Check>
            )
          })}
        </View>
      </View>
      {state.log.length > 1 && (
        <View as="div" margin="0 0 medium">
          <Text weight="bold">Changes so far</Text>
          {state.log.slice(-6).map((l, i) => <View as="div" key={i}><Text size="small">{l}</Text></View>)}
        </View>
      )}
      <Button color="primary" display="block" onClick={() => dispatch({ type: 'phase', phase: 'preview' })}>Preview</Button>
    </View>
  )
}

// the blocks of the syllabus
export function Editor() {
  const { state, dispatch } = useSyllabus()
  const flags = activeFlags(state)
  // there is only one Policies block and one Course Summary
  const hasPolicies = state.blocks.some((b) => b.kind === 'policies')
  const hasSummary = state.blocks.some((b) => b.kind === 'coursesummary')

  return (
    <Flex alignItems="start" gap="medium">
      <Flex.Item shouldGrow shouldShrink>
        {state.blocks.map((b, i) => <Block key={b.id} block={b} index={i} count={state.blocks.length} flags={flags} />)}
        <View as="div" margin="medium 0 0">
          <Text weight="bold">Add a block</Text>
          <View as="div" margin="x-small 0 0">
            {blockTypes.map((t, i) => (
              <Button key={t.title} size="small" margin="0 x-small x-small 0" renderIcon={IconAddLine}
                interaction={((t.kind === 'policies' && hasPolicies) || (t.kind === 'coursesummary' && hasSummary)) ? 'disabled' : 'enabled'}
                onClick={() => dispatch({ type: 'addBlock', index: i })}>{t.title}</Button>
            ))}
          </View>
        </View>
      </Flex.Item>
      <Flex.Item size="19rem">
        {/* sticky keeps the panel on screen while the blocks scroll, MDN position (see sticky positioning): https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/position */}
        <div style={{ position: 'sticky', top: 8 }}><Panel state={state} dispatch={dispatch} /></div>
      </Flex.Item>
    </Flex>
  )
}
