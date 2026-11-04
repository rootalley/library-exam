import { useState } from 'react'
import { View, Flex, Heading, Text, Button, IconButton, TextArea, ScreenReaderContent } from '@instructure/ui'
import { IconArrowUpLine, IconArrowDownLine, IconEditLine, IconTrashLine, IconCheckMarkSolid } from '@instructure/ui-icons'
import { useSyllabus } from './state.jsx'

// hidden label so the text box still has a name for screen readers
const label = (t) => <ScreenReaderContent>{t}</ScreenReaderContent>

// one block: the title, an Edit button, and the text
function Block({ block, index, count }) {
  const { dispatch } = useSyllabus()
  const [editing, setEditing] = useState(false)

  return (
    <View as="section" display="block" borderWidth="small" borderRadius="medium" padding="small medium" margin="0 0 small" background="primary">
      <Flex alignItems="center" margin="0 0 x-small">
        <Flex.Item shouldGrow>
          <Heading level="h3" as="h3">{block.title}</Heading>
        </Flex.Item>
        <Flex.Item><IconButton screenReaderLabel={`Move ${block.title} up`} renderIcon={IconArrowUpLine} size="small" withBackground={false} withBorder={false} interaction={index === 0 ? 'disabled' : 'enabled'} onClick={() => dispatch({ type: 'move', id: block.id, dir: -1 })} /></Flex.Item>
        <Flex.Item><IconButton screenReaderLabel={`Move ${block.title} down`} renderIcon={IconArrowDownLine} size="small" withBackground={false} withBorder={false} interaction={index === count - 1 ? 'disabled' : 'enabled'} onClick={() => dispatch({ type: 'move', id: block.id, dir: 1 })} /></Flex.Item>
        <Flex.Item>
          <Button size="small" renderIcon={editing ? IconCheckMarkSolid : IconEditLine} margin="0 x-small" onClick={() => setEditing(!editing)}>{editing ? 'Done' : 'Edit'}</Button>
        </Flex.Item>
        <Flex.Item><IconButton screenReaderLabel={`Remove ${block.title}`} renderIcon={IconTrashLine} size="small" withBackground={false} withBorder={false} onClick={() => dispatch({ type: 'removeBlock', id: block.id })} /></Flex.Item>
      </Flex>
      {editing
        ? <TextArea label={label(block.title)} height="6rem" value={block.text} onChange={(e) => dispatch({ type: 'editText', id: block.id, text: e.target.value })} />
        : <Text as="p">{block.text}</Text>}
    </View>
  )
}

// the blocks of the syllabus
export function Editor() {
  const { state } = useSyllabus()

  return (
    <div>
      {state.blocks.map((b, i) => <Block key={b.id} block={b} index={i} count={state.blocks.length} />)}
    </div>
  )
}
