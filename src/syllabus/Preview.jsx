import { View, Text, Button } from '@instructure/ui'
import { useSyllabus } from './state.jsx'
import { SyllabusPage } from './Page.jsx'

// step 3: the syllabus the way students will see it
export function Preview() {
  const { state, dispatch } = useSyllabus()

  return (
    <div>
      <View as="div" margin="0 0 medium">
        <Button onClick={() => dispatch({ type: 'phase', phase: 'edit' })}>Back to editing</Button>
      </View>
      <View as="div" borderWidth="small" borderRadius="medium" padding="medium">
        <Text size="small" color="secondary">Preview: this is how students see the page.</Text>
        <View as="div" margin="small 0 0"><SyllabusPage blocks={state.blocks} /></View>
      </View>
    </div>
  )
}
