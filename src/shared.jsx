// pieces the editor and the student page both use
import { View, Flex, Text, Pill } from '@instructure/ui'
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
