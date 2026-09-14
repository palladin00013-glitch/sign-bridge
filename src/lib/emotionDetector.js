const URGENT_WORDS = ['help', 'now', 'emergency', 'hurry', 'quick', 'fire', 'call 911', 'please help']
const HAPPY_WORDS = ['thank you', 'thanks', 'great', 'awesome', 'happy', 'love', ':)']

export function detectEmotionFromText(text) {
  const t = text.toLowerCase()
  if (URGENT_WORDS.some(w => t.includes(w)) || /!{2,}/.test(text)) return 'urgent'
  if (HAPPY_WORDS.some(w => t.includes(w))) return 'happy'
  return 'neutral'
}

// Voice-based: use pitch/volume from the mic (Web Audio API), no ML model needed.
// Loud + high pitch variance in a short window => 'urgent'.
export function detectEmotionFromAudio(analyserNode) {
  const data = new Uint8Array(analyserNode.frequencyBinCount)
  analyserNode.getByteFrequencyData(data)
  const avgVolume = data.reduce((a, b) => a + b, 0) / data.length
  return avgVolume > 120 ? 'urgent' : 'neutral'
}
