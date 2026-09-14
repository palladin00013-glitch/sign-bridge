import { Paper, Text, ActionIcon, Group, Avatar } from '@mantine/core'
import { Volume2 } from 'lucide-react'
import { speak } from '../hooks/useTTS'

export default function ChatBubble({ from, text, onReplay }) {
  const isUser = from === 'user'

  return (
    <Group justify={isUser ? 'flex-end' : 'flex-start'} align="flex-end" gap={6} mb={10}>
      {!isUser && <Avatar radius="xl" size={28} color="sbGold">🧑</Avatar>}
      <Paper
        p="sm"
        radius="lg"
        style={{
          background: isUser ? '#1E6FD9' : '#FFFFFF',
          color: isUser ? '#fff' : '#16233F',
          maxWidth: '75%',
          borderTopRightRadius: isUser ? 4 : undefined,
          borderTopLeftRadius: !isUser ? 4 : undefined,
        }}
      >
        <Group gap={6} wrap="nowrap">
          <Text size="sm">{text}</Text>
          <ActionIcon
            size="xs"
            variant="transparent"
            c={isUser ? 'white' : 'sbBlue'}
            onClick={() => (onReplay ? onReplay() : speak(text))}
            aria-label="Replay message"
          >
            <Volume2 size={14} />
          </ActionIcon>
        </Group>
      </Paper>
    </Group>
  )
}
