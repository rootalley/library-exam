import { useEffect, useState } from 'react'
import { View, Flex, Heading, Text, Button, Modal, CloseButton, Spinner } from '@instructure/ui'
import { IconUploadLine, IconCoursesLine, IconAddLine, IconFolderLine, IconDocumentLine } from '@instructure/ui-icons'
import { useSyllabus } from './state.jsx'

// one of the three boxes: icon, title, a sentence and a button
function Option({ icon: Icon, title, text, action, onClick, primary }) {
  return (
    // the card is a column and the text takes the leftover space, so the three buttons line up at the bottom
    <div style={{ display: 'flex', flexDirection: 'column', width: '16rem', boxSizing: 'border-box', border: '1px solid #c7cdd1', borderRadius: 4, padding: 24 }}>
      <Icon style={{ fontSize: 32 }} />
      <Heading level="h3" margin="small 0 x-small">{title}</Heading>
      <div style={{ flex: 1, marginBottom: 24 }}><Text>{text}</Text></div>
      <div><Button color={primary ? 'primary' : 'secondary'} onClick={onClick}>{action}</Button></div>
    </div>
  )
}

const FILE = 'my_syllabus.docx'

// pretend file chooser with one folder and one file
// the Modal props come from the InstUI package: https://github.com/instructure/instructure-ui/tree/master/packages/ui-modal
function FileChooser({ onCancel, onOpen }) {
  const [picked, setPicked] = useState(false)

  return (
    <Modal open size="small" label="Choose a file to upload" onDismiss={onCancel} shouldCloseOnDocumentClick={false}>
      <Modal.Header>
        <CloseButton placement="end" offset="small" onClick={onCancel} screenReaderLabel="Cancel" />
        <Heading>Choose a file to upload</Heading>
      </Modal.Header>
      <Modal.Body>
        <View as="div" margin="0 0 small"><Text color="secondary"><IconFolderLine /> Documents {'›'} syllabus</Text></View>
        <View as="div" borderWidth="small" borderRadius="small">
          <Flex padding="x-small small" background="secondary">
            <Flex.Item shouldGrow><Text weight="bold" size="small">Name</Text></Flex.Item>
            <Flex.Item size="9rem"><Text weight="bold" size="small">Date modified</Text></Flex.Item>
          </Flex>
          <div role="option" aria-selected={picked} tabIndex={0}
            onClick={() => setPicked(true)} onDoubleClick={() => onOpen()}
            onKeyDown={(e) => { if (e.key === 'Enter') (picked ? onOpen() : setPicked(true)) }}
            style={{ padding: '8px 12px', cursor: 'default', background: picked ? '#c6e1f5' : 'transparent', display: 'flex' }}>
            <span style={{ flex: 1 }}><IconDocumentLine /> {FILE}</span>
            <span style={{ width: '9rem' }}>Nov 3, 2026</span>
          </div>
        </View>
        <View as="div" margin="small 0 0"><Text size="small" color="secondary">Prototype: this stands in for your computer's file chooser.</Text></View>
      </Modal.Body>
      <Modal.Footer>
        <Button margin="0 x-small 0 0" onClick={onCancel}>Cancel</Button>
        <Button color="primary" interaction={picked ? 'enabled' : 'disabled'} onClick={onOpen}>Open</Button>
      </Modal.Footer>
    </Modal>
  )
}

// a spinner that walks through its steps one after another (each has a label and how long it lasts), then calls onDone
function Working({ title, steps, onDone }) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (i >= steps.length) { onDone(); return undefined }
    const t = setTimeout(() => setI(i + 1), steps[i].ms)
    return () => clearTimeout(t)
  }, [i])

  const label = steps[Math.min(i, steps.length - 1)].label

  return (
    <Modal open size="small" label={title} onDismiss={() => {}} shouldCloseOnDocumentClick={false}>
      <Modal.Body>
        <Flex direction="column" alignItems="center" padding="large 0">
          <Spinner renderTitle={label} size="large" />
          <View as="div" margin="medium 0 0" aria-live="polite"><Text size="large">{label}</Text></View>
        </Flex>
      </Modal.Body>
    </Modal>
  )
}

// the three ways to start a syllabus
export function Start() {
  const { dispatch } = useSyllabus()
  // which dialog is open: idle means none
  const [stage, setStage] = useState('idle')

  return (
    <div>
      {/* align-items stretch makes the cards the same height, this MDN page on aligning flex items explains it: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Aligning_items */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: 24, margin: '0 0 24px' }}>
        {/* upload a file goes here */}
        <Option primary icon={IconUploadLine} title="Upload a file" text="We'll turn your Word or PDF file into editable blocks and flag anything that needs an update." action="Choose a file" onClick={() => setStage('file')} />
        {/* copy previous syllabus goes here */}
        <Option icon={IconCoursesLine} title="Copy previous syllabus" text="We'll copy the syllabus from a past Canvas course, with dates moved to the new term." action="Choose a course" />
        {/* start fresh goes here */}
        <Option icon={IconAddLine} title="Start fresh" text="We'll help you build your syllabus from scratch, one block at a time." action="Start fresh" onClick={() => dispatch({ type: 'blank' })} />
      </div>
      <Text size="small" color="secondary">Prototype: the first two choices load a prepared sample syllabus (HCI 101, Spring 2026) after a short simulated wait.</Text>
      {stage === 'scanning' && <Working title="Uploading a file" steps={[{ label: `Scanning ${FILE}…`, ms: 2500 }, { label: 'Processing your syllabus…', ms: 2500 }]} onDone={() => dispatch({ type: 'import', source: 'word' })} />}
      {stage === 'file' && <FileChooser onCancel={() => setStage('idle')} onOpen={() => dispatch({ type: 'import', source: 'word' })} />}
    </div>
  )
}
