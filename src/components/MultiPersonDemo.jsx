import { useRef, useEffect } from 'react'
import { useHolisticMultiPerson } from '../hooks/useHolisticMultiPerson'
import { getAllExamples } from '../lib/calibrationStore'
import { useState } from 'react'

export default function MultiPersonDemo() {
  const videoRef = useRef(null)
  const [examples, setExamples] = useState([])

  useEffect(() => {
    getAllExamples().then(setExamples)
    navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } })
      .then(stream => { videoRef.current.srcObject = stream })
  }, [])

  const { left, right } = useHolisticMultiPerson(videoRef, examples)

  return (
    <div>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: 640 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', width: 640 }}>
        <p>Person 1 (left): {left || '—'}</p>
        <p>Person 2 (right): {right || '—'}</p>
      </div>
    </div>
  )
}
