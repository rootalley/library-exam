import { useState } from 'react'
import { View, Flex, Heading, Text, Button, TextArea, ScreenReaderContent } from '@instructure/ui'
import { IconEditLine, IconCheckMarkSolid } from '@instructure/ui-icons'
import { useSyllabus } from './state.jsx'

// hidden label so the text box still has a name for screen readers
const label = (t) => <ScreenReaderContent>{t}</ScreenReaderContent>

// one block: the title, an Edit button, and the text
function Block({ block }) {
  const [editing, setEditing] = useState(false)

  return (
    <View as="section" display="block" borderWidth="small" borderRadius="medium" padding="small medium" margin="0 0 small" background="primary">
      <Flex alignItems="center" margin="0 0 x-small">
        <Flex.Item shouldGrow>
          <Heading level="h3" as="h3">{block.title}</Heading>
        </Flex.Item>
        <Flex.Item>
          <Button size="small" renderIcon={editing ? IconCheckMarkSolid : IconEditLine} margin="0 x-small" onClick={() => setEditing(!editing)}>{editing ? 'Done' : 'Edit'}</Button>
        </Flex.Item>
      </Flex>
      {editing
        ? <TextArea label={label(block.title)} height="6rem" defaultValue={block.text} />
        : <Text as="p">{block.text}</Text>}
    </View>
  )
}

// the blocks of the syllabus
export function Editor() {
  const { state } = useSyllabus()

  return (
    <div>
      {state.blocks.map((b) => <Block key={b.id} block={b} />)}
    </div>
  )
}
