import { View, Flex, Text, Button, Alert } from '@instructure/ui'
import { IconPublishSolid } from '@instructure/ui-icons'
import { useSyllabus, activeFlags, missingStatements } from './state.jsx'
import { SyllabusPage } from './Page.jsx'

// step 3: the syllabus the way students will see it
export function Preview() {
  const { state, dispatch } = useSyllabus()
  // everything the review panel was still asking about: open flags, missing statements, and dates not moved yet
  const open = activeFlags(state).length + missingStatements(state).length + (state.source !== 'blank' && !state.datesShifted ? 1 : 0)

  return (
    <div>
      {state.published ? (
        <Alert variant="success" margin="0 0 medium">Published. Students see this page now. Select "View as Student" at the top right to check.</Alert>
      ) : open > 0 ? (
        <Alert variant="warning" margin="0 0 medium">{open} {open === 1 ? 'item' : 'items'} still to check before you publish. You can still publish.</Alert>
      ) : null}
      <Flex gap="small" wrap="wrap" margin="0 0 medium" alignItems="center">
        <Flex.Item><Button onClick={() => dispatch({ type: 'phase', phase: 'edit' })}>Back to editing</Button></Flex.Item>
        {!state.published && <Flex.Item><Button color="primary" renderIcon={IconPublishSolid} onClick={() => dispatch({ type: 'publish' })}>Publish to Canvas</Button></Flex.Item>}
      </Flex>
      <View as="div" borderWidth="small" borderRadius="medium" padding="medium">
        <Text size="small" color="secondary">Preview: this is how students see the page.</Text>
        <View as="div" margin="small 0 0"><SyllabusPage blocks={state.blocks} /></View>
      </View>
    </div>
  )
}
