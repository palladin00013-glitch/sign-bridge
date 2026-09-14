import { Card, Text, Title, Stack, Group, ThemeIcon, ActionIcon } from '@mantine/core'
import { ArrowLeft, Stethoscope, GraduationCap, Users } from 'lucide-react'

const CONTEXTS = [
  { id: 'clinic', icon: Stethoscope, color: 'sbBlue', title: 'Clinic', subtitle: 'Appointments, symptoms, medical needs' },
  { id: 'education', icon: GraduationCap, color: 'green', title: 'Education', subtitle: 'Classes, homework, school related' },
  { id: 'casual', icon: Users, color: 'sbGold', title: 'Casual', subtitle: 'Daily conversations, greetings, social' },
]

export default function ContextSelectScreen({ onBack, onSelect }) {
  return (
    <div style={{ padding: 20 }}>
      <Group mb={8}>
        <ActionIcon variant="subtle" onClick={onBack} aria-label="Back">
          <ArrowLeft size={18} />
        </ActionIcon>
        <Title order={3}>Choose a Mode</Title>
      </Group>
      <Text c="dimmed" mb={20}>Pick the right phrases for the situation</Text>

      <Stack gap="sm">
        {CONTEXTS.map(context => (
          <Card key={context.id} withBorder onClick={() => onSelect(context.id)} style={{ cursor: 'pointer' }}>
            <Group>
              <ThemeIcon size={44} radius="xl" color={context.color} variant="light">
                <context.icon size={22} />
              </ThemeIcon>
              <div>
                <Text fw={600}>{context.title}</Text>
                <Text size="sm" c="dimmed">{context.subtitle}</Text>
              </div>
            </Group>
          </Card>
        ))}
      </Stack>
    </div>
  )
}
