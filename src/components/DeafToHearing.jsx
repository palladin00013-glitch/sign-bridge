import { speak } from '../hooks/useTTS'
import { phrases } from '../lib/phraseMatcher'
import { useState } from 'react'

export default function DeafToHearing() {
  const [customText, setCustomText] = useState('')

  return (
    <div>
      <div className="quick-replies">
        {phrases.map(p => (
          <button key={p.id} onClick={() => speak(p.text[0])}>{p.text[0]}</button>
        ))}
      </div>
      <input value={customText} onChange={e => setCustomText(e.target.value)} placeholder="Type to speak..." />
      <button onClick={() => speak(customText)}>🔊 Speak</button>
    </div>
  )
}
