// Convert 21 (x,y,z) landmarks into a translation/scale-invariant vector.
export function landmarksToVector(landmarks) {
  const wrist = landmarks[0]
  const centered = landmarks.map(p => ({ x: p.x - wrist.x, y: p.y - wrist.y, z: p.z - wrist.z }))
  const scale = Math.max(...centered.map(p => Math.hypot(p.x, p.y, p.z))) || 1
  return centered.flatMap(p => [p.x / scale, p.y / scale, p.z / scale])
}

function distance(a, b) {
  return Math.sqrt(a.reduce((sum, v, i) => sum + (v - b[i]) ** 2, 0))
}

// examples: [{ label: 'hello', vector: [...] }, ...]  (2-3 per sign from calibration)
export function classifySign(vector, examples, threshold = 0.35) {
  return classifySignWithConfidence(vector, examples, threshold).label
}

export function classifySignWithConfidence(vector, examples, threshold = 0.35) {
  let best = null
  let bestDist = Infinity
  for (const ex of examples) {
    const d = distance(vector, ex.vector)
    if (d < bestDist) { bestDist = d; best = ex.label }
  }
  const confidence = Math.max(0, 1 - bestDist / threshold)
  return {
    label: bestDist <= threshold ? best : null,
    confidence: Math.min(confidence, 1),
  }
}
