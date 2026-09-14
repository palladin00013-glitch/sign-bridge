import { useRef, useState, useCallback } from 'react'

export function useSTT(onResult) {
  const [listening, setListening] = useState(false)
  const recRef = useRef(null)

  const start = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Speech recognition not supported in this browser. Use text input instead.')
      return
    }
    const rec = new SpeechRecognition()
    rec.continuous = false
    rec.interimResults = false
    rec.lang = 'en-US'
    rec.onresult = (e) => onResult(e.results[0][0].transcript)
    rec.onend = () => setListening(false)
    rec.start()
    recRef.current = rec
    setListening(true)
  }, [onResult])

  const stop = useCallback(() => {
    recRef.current?.stop()
    setListening(false)
  }, [])

  return { listening, start, stop }
}
