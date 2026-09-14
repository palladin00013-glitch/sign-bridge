import { useState, useRef, useEffect } from 'react'
import { ActionIcon, Group, Title, TextInput, ScrollArea, Card } from '@mantine/core'
import { ArrowLeft, Settings, Send, Mic } from 'lucide-react'
import ChatBubble from './ChatBubble'
import QuickActionBar from './QuickActionBar'
import SignVideoPlayer from './SignVideoPlayer'
import { matchPhrase, phrases } from '../lib/phraseMatcher'
import { detectEmotionFromText } from '../lib/emotionDetector'
import { speak } from '../hooks/useTTS'
import { useSTT } from '../hooks/useSTT'
import { getSettings } from '../lib/settingsStore'

const SPEEDS = { slow: 0.6, normal: 1, fast: 1.6 }
const SIZES = { small: 160, medium: 220, large: 280 }

export default function ChatScreen({ mode, context, onBack, onSettings }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [avatarPhrase, setAvatarPhrase] = useState(null)
  const [emotion, setEmotion] = useState('neutral')
  const [speed, setSpeed] = useState(1)
  const [avatarSize, setAvatarSize] = useState(220)
  const viewportRef = useRef(null)

  const contextPhrases = phrases.filter(p => p.category === context || p.category === 'general')

  useEffect(() => {
    getSettings().then(settings => {
      setSpeed(SPEEDS[settings.avatarSpeed] || SPEEDS.normal)
      setAvatarSize(SIZES[settings.avatarSize] || SIZES.medium)
    })
  }, [])

  function sendText(text) {
    if (!text.trim()) return
    setMessages(messages => [...messages, { from: 'user', text }])
    const matched = matchPhrase(text)
    const nextEmotion = detectEmotionFromText(text)
    setEmotion(nextEmotion)
    if (matched) {
      setAvatarPhrase(matched)
      setMessages(messages => [...messages, { from: 'avatar', text: matched.id.replace('_', ' ') }])
    }
    setInput('')
  }

  function quickReply(text) {
    setMessages(messages => [...messages, { from: 'user', text }])
    speak(text)
  }

  const { start } = useSTT(sendText)

  useEffect(() => {
    viewportRef.current?.scrollTo({ top: viewportRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: 16 }}>
      <Group justify="space-between" mb={8}>
        <Group>
          <ActionIcon variant="subtle" onClick={onBack} aria-label="Back">
            <ArrowLeft size={18} />
          </ActionIcon>
          <Title order={4} style={{ textTransform: 'capitalize' }}>{context} Mode</Title>
        </Group>
        <ActionIcon variant="subtle" onClick={onSettings} aria-label="Settings">
          <Settings size={18} />
        </ActionIcon>
      </Group>

      {avatarPhrase && (
        <Card withBorder mb={8} p="xs">
          <SignVideoPlayer phrase={avatarPhrase} emotion={emotion} speed={speed} size={avatarSize} />
        </Card>
      )}

      <ScrollArea style={{ flex: 1 }} viewportRef={viewportRef}>
        {messages.map((message, index) => (
          <ChatBubble key={index} from={message.from} text={message.text} />
        ))}
      </ScrollArea>

      <QuickActionBar
        onYes={() => quickReply('Yes')}
        onNo={() => quickReply('No')}
        onRepeat={() => avatarPhrase && speak(avatarPhrase.id.replace('_', ' '), { rate: speed })}
        onSlower={() => setSpeed(currentSpeed => Math.max(0.5, currentSpeed - 0.25))}
      />

      {mode === 'quick' && (
        <Group gap={6} wrap="wrap" mb={8}>
          {contextPhrases.map(phrase => (
            <ActionIcon
              key={phrase.id}
              variant="light"
              radius="xl"
              onClick={() => quickReply(phrase.text[0])}
              aria-label={phrase.text[0]}
            >
              {phrase.text[0]}
            </ActionIcon>
          ))}
        </Group>
      )}

      <Group gap={6}>
        <TextInput
          style={{ flex: 1 }}
          radius="xl"
          placeholder="Type a message..."
          value={input}
          onChange={event => setInput(event.currentTarget.value)}
          onKeyDown={event => event.key === 'Enter' && sendText(input)}
        />
        <ActionIcon size="lg" radius="xl" color="sbBlue" variant="filled" onClick={start} aria-label="Use microphone">
          <Mic size={18} />
        </ActionIcon>
        <ActionIcon size="lg" radius="xl" color="sbGold" variant="filled" onClick={() => sendText(input)} aria-label="Send message">
          <Send size={18} />
        </ActionIcon>
      </Group>
    </div>
  )
}
