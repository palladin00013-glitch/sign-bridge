import { useEffect, useRef, useState } from 'react'

function lerp(a, b, t) { return a + (b - a) * t }

// linear-interpolate hand position between the two surrounding keyframes
function poseAt(keyframes, elapsedMs) {
  const total = keyframes[keyframes.length - 1].ms
  const t = Math.min(elapsedMs, total)
  let i = 0
  while (i < keyframes.length - 1 && keyframes[i + 1].ms < t) i++
  const a = keyframes[i]
  const b = keyframes[Math.min(i + 1, keyframes.length - 1)]
  const span = b.ms - a.ms || 1
  const localT = Math.max(0, Math.min(1, (t - a.ms) / span))
  return {
    left: [lerp(a.left[0], b.left[0], localT), lerp(a.left[1], b.left[1], localT)],
    right: [lerp(a.right[0], b.right[0], localT), lerp(a.right[1], b.right[1], localT)],
    done: t >= total,
  }
}

const EMOTION_COLOR = { neutral: '#1e88e5', urgent: '#e53935', happy: '#43a047' }

export default function AvatarPlayer({ keyframes, label, emotion = 'neutral', speed = 1, size = 220 }) {
  const [pose, setPose] = useState(() => poseAt(keyframes, 0))
  const startRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    startRef.current = null
    function tick(ts) {
      if (startRef.current === null) startRef.current = ts
      const elapsed = (ts - startRef.current) * speed
      const p = poseAt(keyframes, elapsed)
      setPose(p)
      if (!p.done) rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [keyframes, speed])

  const color = EMOTION_COLOR[emotion] || EMOTION_COLOR.neutral
  const [lx, ly] = pose.left
  const [rx, ry] = pose.right

  return (
    <div style={{ textAlign: 'center' }}>
      <svg viewBox="0 0 200 260" width={size} height={size * (286 / 220)}>
        {/* head */}
        <circle cx="100" cy="45" r="28" fill="#f2c9a0" stroke="#333" strokeWidth="2" />
        {/* eyebrows shift slightly for 'urgent' to read as more alert */}
        <line x1="82" y1={emotion === 'urgent' ? 33 : 36} x2="94" y2="36" stroke="#333" strokeWidth="2" />
        <line x1="106" y1="36" x2="118" y2={emotion === 'urgent' ? 33 : 36} stroke="#333" strokeWidth="2" />
        {/* mouth: curve up for happy */}
        <path
          d={emotion === 'happy' ? 'M 88 58 Q 100 68 112 58' : 'M 88 60 L 112 60'}
          stroke="#333" strokeWidth="2" fill="none"
        />
        {/* torso */}
        <line x1="100" y1="73" x2="100" y2="180" stroke="#333" strokeWidth="4" />
        <line x1="70" y1="90" x2="130" y2="90" stroke="#333" strokeWidth="4" /> {/* shoulders */}
        {/* legs */}
        <line x1="100" y1="180" x2="80" y2="250" stroke="#333" strokeWidth="4" />
        <line x1="100" y1="180" x2="120" y2="250" stroke="#333" strokeWidth="4" />
        {/* arms -> hands, driven by pose */}
        <line x1="70" y1="90" x2={lx} y2={ly} stroke={color} strokeWidth="5" strokeLinecap="round" />
        <circle cx={lx} cy={ly} r="8" fill={color} />
        <line x1="130" y1="90" x2={rx} y2={ry} stroke={color} strokeWidth="5" strokeLinecap="round" />
        <circle cx={rx} cy={ry} r="8" fill={color} />
      </svg>
      <p style={{ fontSize: 22, margin: 0 }}>{label}</p>
    </div>
  )
}