import { useRef, useEffect, useState } from 'react'
import Icon from './Icon'
import { useHolisticMultiPerson } from '../hooks/useHolisticMultiPerson'
import { getAllExamples } from '../lib/calibrationStore'

function PersonPanel({ label, colorClass, sign }) {
  return <div className="relative flex flex-col justify-between rounded-xl bg-surface-container-high/30 p-2"><div className="flex items-center justify-between"><span className={`text-xs font-bold ${colorClass}`}>{label}</span></div><div className="mt-2 rounded-lg bg-surface-container-lowest/95 p-2"><span className="text-[10px] uppercase text-on-surface-variant">Gesture</span><p className={`font-bold tracking-wide ${colorClass}`}>{sign ? `"${sign.toUpperCase()}"` : '—'}</p></div></div>
}

export default function GroupMode({ isDesktop }) {
  const videoRef = useRef(null)
  const [examples, setExamples] = useState([])
  useEffect(() => { getAllExamples().then(setExamples); navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } }).then(stream => { videoRef.current.srcObject = stream }) }, [])
  const { left, right } = useHolisticMultiPerson(videoRef, examples)
  return <div className={isDesktop ? 'mx-auto flex max-w-3xl flex-col gap-space-md' : 'flex flex-col gap-space-md px-margin pb-space-lg pt-space-sm'}><div className="flex items-center gap-space-xs"><span className="h-2.5 w-2.5 animate-ping rounded-full bg-secondary" /><span className="text-sm font-semibold text-secondary">Multi-Vision Active</span></div><div className="relative mx-auto min-h-[290px] w-full max-w-xl overflow-hidden rounded-2xl bg-surface-container-lowest" style={{ aspectRatio: '4/3' }}><video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 h-full w-full object-cover opacity-85" /><div className="relative z-10 grid h-full grid-cols-2 gap-space-sm p-space-xs"><PersonPanel label="P1 · Left" colorClass="text-primary" sign={left?.label || left} /><PersonPanel label="P2 · Right" colorClass="text-secondary" sign={right?.label || right} /></div></div><div className="flex items-start gap-3 rounded-xl bg-surface-container-low p-space-md"><Icon name="info" className="text-primary" size={20} /><p className="text-xs text-on-surface-variant">Constrained demo: left/right frame split, not real person tracking. Works best with two people on opposite sides of frame with minimal overlap.</p></div></div>
}
