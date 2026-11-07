// Course Materials and Readings: a list the instructor can add to and remove from
import { useEffect, useRef } from 'react'
import { View, Flex, Text, Button, IconButton, TextInput, Pill, Spinner, ScreenReaderContent } from '@instructure/ui'
import { IconAddLine, IconTrashLine } from '@instructure/ui-icons'
import { detect, find, findByText } from './lookup.js'
import { Marked } from './Marked.jsx'

// a finished citation: authors, the title in italics, then the publication details
export function Citation({ entry }) {
  return (
    <span>
      {entry.authors && `${entry.authors}. `}<i>{entry.title}</i>. {entry.detail}{' '}
      <span style={{ color: '#556572' }}>{entry.id}</span>
    </span>
  )
}

// read-only list, for the editor when nobody is editing and later for students
export function ListView({ items, flags = [], empty }) {
  const shown = items.filter((x) => x.input.trim())
  if (!shown.length) return empty ? <Text color="secondary" fontStyle="italic">{empty}</Text> : null
  return (
    <ul style={{ margin: '0 0 0 1.25rem', padding: 0 }}>
      {shown.map((x, i) => <li key={i} style={{ marginBottom: 4 }}>{x.entry ? <Citation entry={x.entry} /> : <Marked text={x.input} flags={flags} />}</li>)}
    </ul>
  )
}

function Row({ block, item, index, dispatch }) {
  const timer = useRef(null)
  const field = useRef(null)
  // a pending lookup shouldn't fire after the row is gone, docs on cleanup in effects: https://react.dev/reference/react/useEffect
  useEffect(() => () => clearTimeout(timer.current), [])
  // a row made by Add anyway starts with the cursor in it
  useEffect(() => { if (item.focus && field.current) field.current.focus() }, [])

  // an ISBN, ISSN or DOI is looked up when the field loses focus or Enter is pressed
  // anything else is only looked up on Enter, force is true for that case
  const lookUp = (force) => {
    const text = item.input.trim()
    const det = detect(text)
    if (!text || (!det && !force)) return
    if (item.entry || item.status === 'looking' || item.status === 'accepted' || item.status === 'notfound') return
    dispatch({ type: 'setListEntry', id: block.id, index, input: item.input, entry: null, status: 'looking' })
    // 1.2 seconds of fake waiting so it feels like a real lookup
    timer.current = setTimeout(() => {
      const byTitle = det ? null : findByText(text)
      const entry = det ? find(det) : byTitle && { ...byTitle, source: 'catalog match' }
      dispatch({ type: 'setListEntry', id: block.id, index, input: item.input, entry, status: entry ? 'done' : 'notfound' })
    }, 1200)
  }
  const label = `${block.title} item ${index + 1}`
  const source = (detect(item.input) || {}).source

  return (
    <div style={{ marginBottom: 12 }}>
      <Flex gap="small" alignItems="start">
        <Flex.Item shouldGrow>
          <TextInput inputRef={(el) => { field.current = el }} renderLabel={<ScreenReaderContent>{label}</ScreenReaderContent>} placeholder="A title or description, or an ISBN, ISSN, or DOI" value={item.input}
            onChange={(e, v) => dispatch({ type: 'editListItem', id: block.id, index, value: v })}
            onBlur={() => lookUp(false)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); lookUp(true) } }} />
        </Flex.Item>
        <Flex.Item><IconButton screenReaderLabel={`Remove ${label}`} renderIcon={IconTrashLine} size="small" withBackground={false} withBorder={false} onClick={() => dispatch({ type: 'removeListItem', id: block.id, index })} /></Flex.Item>
      </Flex>
      {item.status === 'looking' && (
        <Flex gap="x-small" alignItems="center" margin="x-small 0 0">
          <Flex.Item><Spinner renderTitle="Looking up" size="x-small" /></Flex.Item>
          <Flex.Item><Text size="small" color="secondary">Looking up {source || 'your entry'}…</Text></Flex.Item>
        </Flex>
      )}
      {item.status === 'notfound' && (
        <Flex gap="small" alignItems="center" margin="x-small 0 0" wrap="wrap">
          <Flex.Item><Text size="small" color="danger" aria-live="polite">&ldquo;{item.input.trim()}&rdquo; not found.</Text></Flex.Item>
          <Flex.Item><Button size="small" onClick={() => dispatch({ type: 'acceptListItem', id: block.id, index, input: item.input })}>Add anyway?</Button></Flex.Item>
        </Flex>
      )}
      {item.status === 'accepted' && (
        <View as="div" margin="x-small 0 0"><Text size="small" color="secondary">Added as typed.</Text></View>
      )}
      {item.entry && (
        <View as="div" margin="x-small 0 0" padding="x-small small" background="secondary" borderRadius="small">
          <Pill color="success" margin="0 x-small 0 0">{item.entry.kind}</Pill>
          <Text size="small"><Citation entry={item.entry} /></Text>
          <View as="div" margin="xx-small 0 0"><Text size="small" color="secondary">Details filled in from {item.entry.source ? `the ${item.entry.source}` : 'the match'}. Change the line to look up something else.</Text></View>
        </View>
      )}
    </div>
  )
}

export function ListEditor({ block, dispatch }) {
  return (
    <div>
      {block.items.map((it, i) => <Row key={i} block={block} item={it} index={i} dispatch={dispatch} />)}
      <Button size="small" renderIcon={IconAddLine} onClick={() => dispatch({ type: 'addListItem', id: block.id })}>Add an item</Button>
      <View as="div" margin="small 0 0">
        <Text size="small" color="secondary">Type a title or description, or an ISBN, ISSN, or DOI, and press Enter to look it up. Prototype: try 978-1-23456-789-7, 978-1-55555-123-0, 1234-5678, or 10.1000/xyz123.</Text>
      </View>
    </div>
  )
}
