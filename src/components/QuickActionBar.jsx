import { Group, Button } from '@mantine/core'
import { Check, X, RotateCcw, Clock } from 'lucide-react'

export default function QuickActionBar({ onYes, onNo, onRepeat, onSlower }) {
  return (
    <Group justify="center" gap="xs" my={8}>
      <Button size="xs" radius="xl" color="green" leftSection={<Check size={14} />} onClick={onYes}>Yes</Button>
      <Button size="xs" radius="xl" color="red" leftSection={<X size={14} />} onClick={onNo}>No</Button>
      <Button size="xs" radius="xl" variant="light" leftSection={<RotateCcw size={14} />} onClick={onRepeat}>Repeat</Button>
      <Button size="xs" radius="xl" variant="light" leftSection={<Clock size={14} />} onClick={onSlower}>Slower</Button>
    </Group>
  )
}
