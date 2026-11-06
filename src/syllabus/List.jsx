// Course Materials and Readings: a list the instructor can add to and remove from
import { View, Flex, Text, Button, IconButton, TextInput, ScreenReaderContent } from '@instructure/ui'
import { IconAddLine, IconTrashLine } from '@instructure/ui-icons'

// read-only list, for the editor when nobody is editing and later for students
export function ListView({ items, empty }) {
  const shown = items.filter((x) => x.input.trim())
  if (!shown.length) return empty ? <Text color="secondary" fontStyle="italic">{empty}</Text> : null
  return (
    <ul style={{ margin: '0 0 0 1.25rem', padding: 0 }}>
      {shown.map((x, i) => <li key={i} style={{ marginBottom: 4 }}>{x.input}</li>)}
    </ul>
  )
}

function Row({ block, item, index, dispatch }) {
  const label = `${block.title} item ${index + 1}`

  return (
    <div style={{ marginBottom: 12 }}>
      <Flex gap="small" alignItems="start">
        <Flex.Item shouldGrow>
          <TextInput renderLabel={<ScreenReaderContent>{label}</ScreenReaderContent>} placeholder="A title or description, or an ISBN, ISSN, or DOI" value={item.input}
            onChange={(e, v) => dispatch({ type: 'editListItem', id: block.id, index, value: v })} />
        </Flex.Item>
        <Flex.Item><IconButton screenReaderLabel={`Remove ${label}`} renderIcon={IconTrashLine} size="small" withBackground={false} withBorder={false} onClick={() => dispatch({ type: 'removeListItem', id: block.id, index })} /></Flex.Item>
      </Flex>
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
