import { useEffect, useState } from 'react'
import { ActionIcon, Group, Title, Stack, Text, Switch, SegmentedControl, Card, Badge } from '@mantine/core'
import { ArrowLeft, Wifi } from 'lucide-react'
import { getSettings, saveSettings } from '../lib/settingsStore'

export default function SettingsScreen({ onBack }) {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  function update(patch) {
    const next = { ...settings, ...patch }
    setSettings(next)
    saveSettings(next)
  }

  if (!settings) return null

  return (
    <div style={{ padding: 20 }}>
      <Group mb={16}>
        <ActionIcon variant="subtle" onClick={onBack} aria-label="Back">
          <ArrowLeft size={18} />
        </ActionIcon>
        <Title order={3}>Your Controls</Title>
      </Group>

      <Text fw={600} size="sm" c="dimmed" mb={8}>AVATAR SETTINGS</Text>
      <Stack gap="md" mb={20}>
        <Group justify="space-between">
          <Text>Sign Speed</Text>
          <SegmentedControl
            size="xs"
            value={settings.avatarSpeed}
            onChange={value => update({ avatarSpeed: value })}
            data={['slow', 'normal', 'fast']}
          />
        </Group>
        <Group justify="space-between">
          <Text>Avatar Size</Text>
          <SegmentedControl
            size="xs"
            value={settings.avatarSize}
            onChange={value => update({ avatarSize: value })}
            data={['small', 'medium', 'large']}
          />
        </Group>
        <Group justify="space-between">
          <Text>Captions</Text>
          <Switch
            checked={settings.captions}
            onChange={event => update({ captions: event.currentTarget.checked })}
            color="sbGold"
          />
        </Group>
        <Group justify="space-between">
          <Text>High Contrast</Text>
          <Switch
            checked={settings.highContrast}
            onChange={event => update({ highContrast: event.currentTarget.checked })}
          />
        </Group>
      </Stack>

      <Card withBorder radius="lg">
        <Group justify="space-between">
          <Group gap={6}><Wifi size={16} /><Text size="sm">Offline Mode</Text></Group>
          <Badge color="green" variant="light">Phrase packs cached</Badge>
        </Group>
      </Card>
    </div>
  )
}
