import { useState } from 'react'
import { View, Flex, Text, Button, Alert, Pill } from '@instructure/ui'
import { IconDownloadLine, IconPublishSolid } from '@instructure/ui-icons'
import { useSyllabus, activeFlags, missingStatements } from './state.jsx'
import { SyllabusPage, hasContent } from './Page.jsx'
import { ImmersiveReaderButton } from './ImmersiveReader.jsx'

// step 3: the syllabus the way students will see it
export function Preview() {
  const { state, dispatch } = useSyllabus()
  // the message shown after an export button, nothing really downloads in the prototype
  const [exported, setExported] = useState(null)
  // everything the review panel was still asking about: open flags, missing statements, and dates not moved yet
  const open = activeFlags(state).length + missingStatements(state).length + (state.source !== 'blank' && !state.datesShifted ? 1 : 0)

  return (
    <div>
      {state.published ? (
        <Alert variant="success" margin="0 0 medium">Published. Students see this page now. Select "View as Student" at the top right to check.</Alert>
      ) : open > 0 ? (
        <Alert variant="warning" margin="0 0 medium">{open} {open === 1 ? 'item' : 'items'} still to check before you publish. You can still publish.</Alert>
      ) : null}
      {exported && <Alert variant="info" margin="0 0 medium" timeout={4000} renderCloseButtonLabel="Close">{exported}</Alert>}
      <Flex gap="small" wrap="wrap" margin="0 0 medium" alignItems="center">
        <Flex.Item><Button onClick={() => dispatch({ type: 'phase', phase: 'edit' })}>Back to editing</Button></Flex.Item>
        <Flex.Item><Button renderIcon={IconDownloadLine} onClick={() => setExported('Prototype: a Word file would download now.')}>Export Word</Button></Flex.Item>
        <Flex.Item><Button renderIcon={IconDownloadLine} onClick={() => setExported('Prototype: a PDF would download now.')}>Export PDF</Button></Flex.Item>
        <Flex.Item><ImmersiveReaderButton blocks={state.blocks.filter(hasContent)} /></Flex.Item>
        {!state.published && <Flex.Item><Button color="primary" renderIcon={IconPublishSolid} onClick={() => dispatch({ type: 'publish' })}>Publish to Canvas</Button></Flex.Item>}
      </Flex>
      <View as="div" margin="0 0 medium">
        <Pill color="success">Accessibility check passed</Pill>{' '}
        <Text size="small">Every block has a heading and the page keeps its reading order. Exports are tagged for screen readers, so there is one syllabus for every reader.</Text>
      </View>
      <View as="div" borderWidth="small" borderRadius="medium" padding="medium">
        <Text size="small" color="secondary">Preview: this is how students see the page.</Text>
        <View as="div" margin="small 0 0"><SyllabusPage blocks={state.blocks} /></View>
      </View>
    </div>
  )
}
