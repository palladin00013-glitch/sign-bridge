import phrases from '../data/phrases.json'

function normalize(s) {
  return s.toLowerCase().trim().replace(/[^\w\s]/g, '')
}

function similarity(a, b) {
  // cheap token-overlap score, good enough for short phrases
  const aTokens = new Set(normalize(a).split(/\s+/))
  const bTokens = new Set(normalize(b).split(/\s+/))
  const overlap = [...aTokens].filter(t => bTokens.has(t)).length
  return overlap / Math.max(aTokens.size, bTokens.size)
}

export function matchPhrase(input) {
  let best = null
  let bestScore = 0
  for (const phrase of phrases) {
    for (const variant of phrase.text) {
      const score = normalize(input) === normalize(variant) ? 1 : similarity(input, variant)
      if (score > bestScore) {
        bestScore = score
        best = phrase
      }
    }
  }
  return bestScore >= 0.5 ? best : null
}

export { phrases }