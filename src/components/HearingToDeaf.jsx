import { useState } from 'react'
import { useSTT } from '../hooks/useSTT'
import { matchPhrase } from '../lib/phraseMatcher'
import { detectEmotionFromText } from '../lib/emotionDetector'
import SignVideoPlayer from './SignVideoPlayer'

export default function HearingToDeaf() {
  const [text, setText] = useState('')
  const [phrase, setPhrase] = useState(null)
  const [emotion, setEmotion] = useState('neutral')

  function process(input) {
    setText(input)
    setPhrase(matchPhrase(input))
    setEmotion(detectEmotionFromText(input))
  }

  const { listening, start } = useSTT(process)

  return (
    <div>
      <input className="rounded-lg border border-outline-variant bg-surface-container px-3 py-2 text-on-surface" value={text} onChange={e => process(e.target.value)} placeholder="Type a phrase..." />
      <button className="rounded-lg bg-primary px-3 py-2 text-on-primary" onClick={start}>{listening ? 'Listening…' : '🎤 Speak'}</button>
      <SignVideoPlayer phrase={phrase} emotion={emotion} />
    </div>
  )
}
