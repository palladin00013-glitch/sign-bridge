import { useRef, useState, useEffect } from 'react'
import Icon from './Icon'
import { useHandLandmarks } from '../hooks/useHandLandmarks'
import { landmarksToVector, classifySignWithConfidence } from '../lib/signClassifier'
import { getAllExamples } from '../lib/calibrationStore'
import { speak } from '../hooks/useTTS'

export default function SignVision() {
  const videoRef = useRef(null)
  const [examples, setExamples] = useState([])
  const [detected, setDetected] = useState(null)
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    getAllExamples().then(setExamples)
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => { videoRef.current.srcObject = stream })
  }, [])

  const ready = useHandLandmarks(videoRef, landmarks => {
    const { label, confidence: nextConfidence } = classifySignWithConfidence(landmarksToVector(landmarks), examples)
    setDetected(label)
    setConfidence(nextConfidence)
  })

  return <div className="flex flex-col gap-space-md px-margin pb-space-lg pt-space-sm"><div className="flex flex-wrap gap-1.5 rounded-xl bg-surface-container p-space-sm">{examples.length === 0 && <span className="text-xs text-on-surface-variant">No calibrated signs yet — run Calibrate first.</span>}{[...new Set(examples.map(example => example.label))].map(label => <span key={label} className="rounded-md bg-surface-container-high px-2 py-0.5 text-xs font-semibold uppercase text-primary">{label}</span>)}</div><div className="relative aspect-[4/3] max-h-[360px] w-full overflow-hidden rounded-2xl bg-surface-container-lowest"><video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover" />{!ready && <div className="absolute inset-0 flex items-center justify-center bg-surface-dim/70 text-on-surface">Loading sign recognizer…</div>}<div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-surface-container-lowest/80 px-2.5 py-1"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary" /><span className="text-xs font-bold text-secondary">TRACKING</span></div></div><div className="flex flex-col gap-space-sm rounded-2xl bg-surface-container p-space-md"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-on-surface-variant">Detected Sign</p><h3 className="text-2xl font-black text-secondary">{detected ? `"${detected.toUpperCase()}"` : '—'}</h3></div><div className="text-right"><span className="text-xl font-bold text-primary">{Math.round(confidence * 100)}%</span><p className="text-xs text-on-surface-variant">Confidence</p></div></div><div className="h-3 w-full overflow-hidden rounded-full bg-surface-container-highest"><div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all" style={{ width: `${Math.round(confidence * 100)}%` }} /></div></div><button disabled={!detected} onClick={() => speak(detected)} className="flex min-h-[56px] w-full items-center justify-center gap-3 rounded-2xl bg-primary font-bold text-on-primary disabled:opacity-40"><Icon name="volume_up" /> Confirm &amp; Speak {detected ? `"${detected}"` : ''}</button></div>
}
