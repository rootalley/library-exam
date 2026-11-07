import { useEffect, useRef, useState } from 'react'
import { View, Heading, Text } from '@instructure/ui'
import { course } from './data.js'
import { GlobalNav, CourseHeader, CourseNav } from './canvas.jsx'
import { BrandCtx } from './brandContext.js'
import { SyllabusProvider } from './syllabus/state.jsx'
import { SyllabusScreen } from './syllabus/index.jsx'

export default function App({ brand }) {
  const params = new URLSearchParams(window.location.search)
  // teacher is the editor, student is what published pages look like, ?view=student starts in student view
  const [view, setView] = useState(params.get('view') === 'student' ? 'student' : 'teacher')
  const scroller = useRef(null)
  const linkColor = brand.vars['ic-link-color']

  // ?scrolltest=400 scrolls the page on load, for checking the frozen student header in a screenshot
  useEffect(() => {
    const y = Number(params.get('scrolltest'))
    if (y && scroller.current) scroller.current.scrollTop = y
  }, [])

  return (
    <BrandCtx.Provider value={brand}>
    <SyllabusProvider>
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
        <div ref={scroller} style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
          <CourseHeader course={course} page="Syllabus" view={view} linkColor={linkColor}
            onToggleView={() => setView(view === 'teacher' ? 'student' : 'teacher')} />
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            {/* course nav goes here */}
            <CourseNav active="Syllabus" view={view} linkColor={linkColor} term={course.term} />
            {/* main panel goes here */}
            <View as="main" display="block" padding="large medium" style={{ flex: 1, minWidth: 0, maxWidth: '72rem' }}>
              <SyllabusScreen view={view} heading={<Heading level="h1" margin="0 0 medium">Syllabus</Heading>} />
            </View>
          </div>
        </div>
      </div>
    </div>
    </SyllabusProvider>
    </BrandCtx.Provider>
  )
}
