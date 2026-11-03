import { View, Heading, Text } from '@instructure/ui'
import { useSyllabus } from './state.jsx'

// the blocks of the syllabus, just displayed for now
export function Editor() {
  const { state } = useSyllabus()

  return (
    <div>
      {state.blocks.map((b) => (
        <View as="section" key={b.id} display="block" borderWidth="small" borderRadius="medium" padding="small medium" margin="0 0 small" background="primary">
          <Heading level="h3" as="h3" margin="0 0 x-small">{b.title}</Heading>
          <Text as="p">{b.text}</Text>
        </View>
      ))}
    </div>
  )
}
