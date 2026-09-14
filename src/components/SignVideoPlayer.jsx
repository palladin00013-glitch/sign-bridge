// src/components/SignVideoPlayer.jsx
import { useState } from 'react'
import AvatarPlayer from './AvatarPlayer'
import avatarPoses from '../data/avatarPoses.json'

export default function SignVideoPlayer({ phrase, emotion = 'neutral', speed = 1, size = 220 }) {
  const [videoFailed, setVideoFailed] = useState(false)

  if (!phrase) return <div className="video-placeholder">No sign found — try rephrasing.</div>

  const src = phrase.videos?.[emotion] || phrase.videos?.neutral
  const hasVideo = src && !videoFailed
  const label = phrase.id.replace('_', ' ')

  if (hasVideo) {
    return (
      <div>
        <video
          key={src}
          src={src}
          controls
          autoPlay
          playsInline
          playbackRate={speed}
          style={{ maxWidth: size }}
          onError={() => setVideoFailed(true)} // no file yet -> fall back to avatar
        />
        <p style={{ fontSize: 24 }}>{label}</p>
      </div>
    )
  }

  const keyframes = avatarPoses[phrase.id]
  if (keyframes) return <AvatarPlayer keyframes={keyframes} label={label} emotion={emotion} speed={speed} size={size} />

  // last-resort fallback: no video AND no avatar pose defined for this id
  return <p style={{ fontSize: 24 }}>{label} (no clip or avatar pose yet)</p>
}