import { Heading, Text, Button } from '@instructure/ui'
import { IconUploadLine, IconCoursesLine, IconAddLine } from '@instructure/ui-icons'

// one of the three boxes: icon, title, a sentence and a button
function Option({ icon: Icon, title, text, action, primary }) {
  return (
    // the card is a column and the text takes the leftover space, so the three buttons line up at the bottom
    <div style={{ display: 'flex', flexDirection: 'column', width: '16rem', boxSizing: 'border-box', border: '1px solid #c7cdd1', borderRadius: 4, padding: 24 }}>
      <Icon style={{ fontSize: 32 }} />
      <Heading level="h3" margin="small 0 x-small">{title}</Heading>
      <div style={{ flex: 1, marginBottom: 24 }}><Text>{text}</Text></div>
      <div><Button color={primary ? 'primary' : 'secondary'}>{action}</Button></div>
    </div>
  )
}

// the three ways to start a syllabus
export function Start() {
  return (
    <div>
      {/* align-items stretch makes the cards the same height, this MDN page on aligning flex items explains it: https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Flexible_box_layout/Aligning_items */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'stretch', gap: 24, margin: '0 0 24px' }}>
        {/* upload a file goes here */}
        <Option primary icon={IconUploadLine} title="Upload a file" text="We'll turn your Word or PDF file into editable blocks and flag anything that needs an update." action="Choose a file" />
        {/* copy previous syllabus goes here */}
        <Option icon={IconCoursesLine} title="Copy previous syllabus" text="We'll copy the syllabus from a past Canvas course, with dates moved to the new term." action="Choose a course" />
        {/* start fresh goes here */}
        <Option icon={IconAddLine} title="Start fresh" text="We'll help you build your syllabus from scratch, one block at a time." action="Start fresh" />
      </div>
      <Text size="small" color="secondary">Prototype: the first two choices load a prepared sample syllabus (HCI 101, Spring 2026) after a short simulated wait.</Text>
    </div>
  )
}
