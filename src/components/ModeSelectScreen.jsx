import { Card, Text, Title, Stack, Group, ThemeIcon, Button } from '@mantine/core'
import { Mic, Camera, MessageCircle } from 'lucide-react'

const OPTIONS = [
  { id: 'speak', icon: Mic, color: 'sbBlue', title: 'Type / Speak', subtitle: '(heard by Deaf user as sign)' },
  { id: 'sign', icon: Camera, color: 'sbGold', title: 'Use Sign-to-Text', subtitle: '(choose from limited vocabulary)' },
  { id: 'quick', icon: MessageCircle, color: 'green', title: 'Quick Phrases', subtitle: '(from your context mode)' },
]

export default function ModeSelectScreen({ onSelect, onCalibrate, onMultiDemo }) {
  return (
    <div style={{ padding: 20 }}>
      <Title order={2} mb={4}>Hello! 👋</Title>
      <Text c="dimmed" mb={20}>How would you like to communicate today?</Text>

      <Stack gap="sm">
        {OPTIONS.map(opt => (
          <Card key={opt.id} withBorder onClick={() => onSelect(opt.id)} style={{ cursor: 'pointer' }}>
            <Group>
              <ThemeIcon size={44} radius="xl" color={opt.color} variant="light">
                <opt.icon size={22} />
              </ThemeIcon>
              <div>
                <Text fw={600}>{opt.title}</Text>
                <Text size="sm" c="dimmed">{opt.subtitle}</Text>
              </div>
            </Group>
          </Card>
        ))}
      </Stack>

      <Group justify="center" mt={24} gap="xs">
        <Button variant="subtle" size="xs" onClick={onCalibrate}>Calibrate Signs</Button>
        <Button variant="subtle" size="xs" onClick={onMultiDemo}>Multi-Person Demo</Button>
      </Group>
    </div>
  )
}
