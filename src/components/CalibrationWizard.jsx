import { useRef, useState, useCallback } from 'react'
import Icon from './Icon'
import { useHandLandmarks } from '../hooks/useHandLandmarks'
import { landmarksToVector } from '../lib/signClassifier'
import { saveExample } from '../lib/calibrationStore'

const SIGNS = ['YES', 'NO', 'PAIN', 'HELP', 'GOOD', 'BAD', 'STOP', 'THANKS']

export default function CalibrationWizard({ onDone }) {
  const videoRef = useRef(null)
  const [signIndex, setSignIndex] = useState(0)
  const [samples, setSamples] = useState(0)
  const lastVectorRef = useRef(null)
  const [recording, setRecording] = useState(false)
  const onLandmarks = useCallback(landmarks => { lastVectorRef.current = landmarksToVector(landmarks) }, [])
  useHandLandmarks(videoRef, onLandmarks)

  async function capture() {
    if (!lastVectorRef.current) return
    setRecording(true)
    await saveExample(SIGNS[signIndex].toLowerCase(), lastVectorRef.current)
    setTimeout(() => {
      setRecording(false)
      const next = samples + 1
      if (next >= 3) {
        setSamples(0)
        if (signIndex + 1 < SIGNS.length) setSignIndex(signIndex + 1)
        else onDone()
      } else setSamples(next)
    }, 600)
  }

  const progress = Math.round(((signIndex + samples / 3) / SIGNS.length) * 100)
  return <div className="flex flex-col gap-space-md px-margin pb-space-lg pt-space-sm"><div className="flex items-center justify-between text-xs"><span className="flex items-center gap-1.5 text-primary"><span className="h-2 w-2 animate-pulse rounded-full bg-primary" />Personalized AI Engine</span><span className="text-on-surface-variant">Step {signIndex + 1} of {SIGNS.length} ({progress}% complete)</span></div><div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high"><div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} /></div><div><h2 className="text-2xl font-bold text-on-surface">Calibrate My Signs</h2><p className="text-sm text-on-surface-variant">Teach the app your unique signing cadence in ~60s.</p></div><div className="relative flex items-center justify-between overflow-hidden rounded-xl bg-surface-container p-space-md"><div className="absolute bottom-0 left-0 top-0 w-1.5 bg-primary" /><div className="pl-space-xs"><span className="text-xs font-semibold uppercase text-on-surface-variant">Target Gesture:</span><p className="text-2xl font-black text-on-surface">{SIGNS[signIndex]}</p></div><div className="flex h-16 w-16 items-center justify-center rounded-xl bg-surface-container-high text-primary"><Icon name="front_hand" size={32} /></div></div><div className="relative aspect-[4/3] max-h-[320px] w-full overflow-hidden rounded-xl bg-surface-container-lowest"><video ref={videoRef} autoPlay muted playsInline className="h-full w-full object-cover opacity-70" />{recording && <div className="absolute inset-0 flex items-center justify-center bg-primary/20"><div className="h-20 w-20 animate-ping rounded-full bg-primary/30" /></div>}<div className="absolute inset-x-2 bottom-2 flex items-center gap-space-xs rounded-lg bg-surface-container-high/95 px-space-sm py-2"><Icon name="info" className="text-primary" size={20} /><p className="text-xs text-on-surface">Sign <strong className="text-primary">"{SIGNS[signIndex]}"</strong> steadily, centered in frame.</p></div></div><div className="space-y-space-sm rounded-xl bg-surface-container p-space-md"><div className="flex items-center justify-between"><span className="flex items-center gap-2 font-semibold"><Icon name="data_thresholding" className="text-primary" size={18} />Repetition Samples</span><span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">{samples} / 3 Recorded</span></div><div className="grid grid-cols-3 gap-2">{[0, 1, 2].map(index => <div key={index} className={`flex h-11 items-center justify-center gap-1.5 rounded-lg text-xs font-semibold ${index < samples ? 'bg-secondary/20 text-secondary' : 'bg-surface-container-high text-on-surface-variant'}`}><Icon name={index < samples ? 'check_circle' : 'hourglass_empty'} size={16} fill={index < samples} />Sample {index + 1}</div>)}</div></div><button onClick={capture} disabled={recording} className="flex min-h-[56px] w-full items-center justify-center gap-3 rounded-xl bg-primary font-bold text-on-primary disabled:opacity-60"><Icon name="fiber_manual_record" className={recording ? 'animate-pulse' : ''} />{recording ? 'Sampling…' : 'Record Sample'}</button><div className="flex items-center gap-2 overflow-x-auto pb-1">{SIGNS.map((sign, index) => <div key={sign} className={`flex shrink-0 flex-col rounded-xl px-3.5 py-2 ${index === signIndex ? 'bg-primary text-on-primary' : index < signIndex ? 'bg-secondary/20 text-secondary' : 'bg-surface-container text-on-surface-variant opacity-70'}`}><span className="text-xs font-bold">{sign}</span><span className="text-[10px]">{index < signIndex ? 'Done' : index === signIndex ? `${samples}/3` : 'Queued'}</span></div>)}</div><div className="flex items-start gap-3 rounded-xl bg-surface-container-low p-space-md"><Icon name="shield_lock" className="text-secondary" size={22} /><p className="text-xs text-on-surface-variant">On-device calibration only. No video or landmark data ever leaves your device.</p></div></div>
}
