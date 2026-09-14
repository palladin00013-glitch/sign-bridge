import { speak } from '../hooks/useTTS'
import { phrases } from '../lib/phraseMatcher'
import { useState } from 'react'

export default function DeafToHearing() {
  const [customText, setCustomText] = useState('')

  return (
    <div>
      <div className="quick-replies">
        {phrases.map(p => (
          <button className="rounded-full bg-surface-container-high px-3 py-1 text-sm" key={p.id} onClick={() => speak(p.text[0])}>{p.text[0]}</button>
        ))}
      </div>
      <input className="rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-on-surface" value={customText} onChange={e => setCustomText(e.target.value)} placeholder="Type to speak..." />
      <button className="rounded-lg bg-primary px-3 py-2 text-on-primary" onClick={() => speak(customText)}>🔊 Speak</button>
    </div>
  )
}
