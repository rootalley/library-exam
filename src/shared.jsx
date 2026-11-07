// pieces the editor and the student page both use
import { View, Flex, Heading, Text, Link, Pill } from '@instructure/ui'
import { IconLockLine } from '@instructure/ui-icons'

// one required statement, grayed with a lock
export function LockedStatement({ title, text }) {
  return (
    <View as="div" background="secondary" borderWidth="small" borderRadius="medium" padding="small" margin="0 0 small">
      <Flex gap="small" alignItems="start">
        <Flex.Item><IconLockLine /></Flex.Item>
        <Flex.Item shouldShrink shouldGrow>
          <Text weight="bold">{title}</Text>{' '}
          <Pill color="info" margin="0 0 0 x-small">Required by the university</Pill>
          <View as="div" margin="x-small 0 0"><Text>{text}</Text></View>
        </Flex.Item>
      </Flex>
    </View>
  )
}

// a "Jump to:" line with a link to each block heading
export function JumpLinks({ items, margin = '0 0 medium' }) {
  return (
    <View as="nav" display="block" margin={margin} aria-label="Jump to a section">
      <Text weight="bold">Jump to: </Text>
      {items.map((it, i) => (
        <span key={it}>
          {i > 0 && ' \u00b7 '}
          <Link href={'#' + it.toLowerCase().replace(/\W+/g, '-')}>{it}</Link>
        </span>
      ))}
    </View>
  )
}

// the box at the top of the page: grading and exam dates at a glance
export function Summary({ grading, exams }) {
  return (
    <View as="div" borderWidth="small" borderRadius="medium" padding="medium" margin="0 0 medium">
      <Heading level="h2" margin="0 0 small">At a glance</Heading>
      <Flex gap="large" wrap="wrap" alignItems="start">
        <Flex.Item>
          <Text weight="bold">Grading</Text>
          {grading.length === 0 && <View as="div"><Text color="secondary">Not filled in yet</Text></View>}
          {grading.map((g, i) => (
            <View as="div" key={i}><Text>{g.category || '(untitled)'}: {g.weight}%</Text></View>
          ))}
        </Flex.Item>
        {exams.length > 0 && (
          <Flex.Item>
            <Text weight="bold">Exam dates</Text>
            {exams.map((d, i) => (
              <View as="div" key={i}><Text>{d.name}: {d.date}</Text></View>
            ))}
          </Flex.Item>
        )}
      </Flex>
    </View>
  )
}
