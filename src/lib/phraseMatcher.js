import phrases from '../data/phrases.json'
import { levenshtein } from './levenshtein'

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

function fuzzyScore(input, variant) {
  const a = normalize(input)
  const b = normalize(variant)
  const dist = levenshtein(a, b)
  return 1 - dist / Math.max(a.length, b.length, 1)
}

export function matchPhrase(input) {
  let best = null
  let bestScore = 0
  for (const phrase of phrases) {
    for (const variant of phrase.text) {
      const score = Math.max(similarity(input, variant), fuzzyScore(input, variant))
      if (score > bestScore) {
        bestScore = score
        best = phrase
      }
    }
  }
  return bestScore >= 0.5 ? best : null
}

export { phrases }