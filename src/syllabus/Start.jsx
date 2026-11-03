import { Heading } from '@instructure/ui'
import { IconUploadLine, IconCoursesLine, IconAddLine } from '@instructure/ui-icons'

// one of the three boxes: icon and title for now
function Option({ icon: Icon, title }) {
  return (
    <div style={{ width: '16rem', boxSizing: 'border-box', border: '1px solid #c7cdd1', borderRadius: 4, padding: 24 }}>
      <Icon style={{ fontSize: 32 }} />
      <Heading level="h3" margin="small 0 x-small">{title}</Heading>
    </div>
  )
}

// the three ways to start a syllabus
export function Start() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* upload a file goes here */}
      <Option icon={IconUploadLine} title="Upload a file" />
      {/* copy previous syllabus goes here */}
      <Option icon={IconCoursesLine} title="Copy previous syllabus" />
      {/* start fresh goes here */}
      <Option icon={IconAddLine} title="Start fresh" />
    </div>
  )
}
