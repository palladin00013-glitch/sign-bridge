export default function SignVideoPlayer({ phrase, emotion = 'neutral' }) {
  if (!phrase) return <div className="video-placeholder">No sign found — try rephrasing.</div>
  const src = phrase.videos[emotion] || phrase.videos.neutral
  return (
    <div>
      <video key={src} src={src} controls autoPlay muted={false} playsInline style={{ maxWidth: 400 }} />
      <p style={{ fontSize: 24 }}>{phrase.id.replace('_', ' ')}</p>
    </div>
  )
}
