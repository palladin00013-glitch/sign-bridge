import { speak } from '../hooks/useTTS'
import { phrases } from '../lib/phraseMatcher'
import { useState } from 'react'
import { Button, TextInput } from '@mantine/core'

export default function DeafToHearing() {
  const [customText, setCustomText] = useState('')

  return (
    <div>
      <div className="quick-replies">
        {phrases.map(p => (
          <Button key={p.id} onClick={() => speak(p.text[0])}>{p.text[0]}</Button>
        ))}
      </div>
      <TextInput value={customText} onChange={e => setCustomText(e.target.value)} placeholder="Type to speak..." />
      <Button onClick={() => speak(customText)}>🔊 Speak</Button>
    </div>
  )
}
