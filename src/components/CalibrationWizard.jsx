import { useRef, useState, useCallback } from 'react'
import { Button } from '@mantine/core'
import { useHandLandmarks } from '../hooks/useHandLandmarks'
import { landmarksToVector } from '../lib/signClassifier'
import { saveExample } from '../lib/calibrationStore'

const SIGNS = ['hello', 'help', 'yes', 'no', 'thank_you'] // add up to 8-10

export default function CalibrationWizard({ onDone }) {
  const videoRef = useRef(null)
  const [signIndex, setSignIndex] = useState(0)
  const [samplesTaken, setSamplesTaken] = useState(0)
  const lastVectorRef = useRef(null)

  const onLandmarks = useCallback((landmarks) => {
    lastVectorRef.current = landmarksToVector(landmarks)
  }, [])

  const ready = useHandLandmarks(videoRef, onLandmarks)

  async function captureSample() {
    if (!lastVectorRef.current) return alert('No hand detected — hold the sign steady in frame.')
    await saveExample(SIGNS[signIndex], lastVectorRef.current)
    const next = samplesTaken + 1
    setSamplesTaken(next)
    if (next >= 3) {
      setSamplesTaken(0)
      if (signIndex + 1 < SIGNS.length) setSignIndex(signIndex + 1)
      else onDone()
    }
  }

  return (
    <div>
      <video ref={videoRef} style={{ width: 320 }} muted playsInline />
      {!ready && <p>Loading sign recognizer…</p>}
      <h3>Show the sign for: "{SIGNS[signIndex]}"</h3>
      <p>Sample {samplesTaken + 1} of 3</p>
      <Button onClick={captureSample}>Capture</Button>
    </div>
  )
}
