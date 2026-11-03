import { Text } from '@instructure/ui'
import { course } from './data.js'
import { GlobalNav, CourseHeader, CourseNav } from './canvas.jsx'
import { brands } from './themes.js'

// only the gt theme for now
const brand = brands.gt

export default function App() {
  const linkColor = brand.vars['ic-link-color']

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* the plain div had a serif font, the InstUI Text component brings the canvas font */}
      <div style={{ background: '#d04a02', color: '#fff', textAlign: 'center', padding: '3px 12px', flex: 'none' }}>
        <Text size="small" weight="bold" color="primary-inverse">
          Prototype for CS 6750 evaluation. Not real Canvas. Sample data only.
        </Text>
      </div>

      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* global navigation goes here */}
        <GlobalNav brand={brand} />

        {/* everything to the right of the global nav */}
        <div style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
          <CourseHeader course={course} page="Syllabus" linkColor={linkColor} />
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {/* course nav goes here */}
            <CourseNav active="Syllabus" linkColor={linkColor} term={course.term} />
            {/* main panel goes here */}
          </div>
        </div>
      </div>
    </div>
  )
}
