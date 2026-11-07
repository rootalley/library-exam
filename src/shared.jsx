// pieces the editor and the student page both use
import { View, Flex, Text, Link, Pill } from '@instructure/ui'
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
