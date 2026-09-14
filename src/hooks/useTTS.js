export function speak(text, { rate = 1, pitch = 1 } = {}) {
  if (!('speechSynthesis' in window)) return
  window.speechSynthesis.cancel() // stop overlap
  const utter = new SpeechSynthesisUtterance(text)
  utter.rate = rate
  utter.pitch = pitch
  window.speechSynthesis.speak(utter)
}