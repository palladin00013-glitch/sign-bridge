import { useRef, useEffect } from 'react'
import { useHolisticMultiPerson } from '../hooks/useHolisticMultiPerson'
import { getAllExamples } from '../lib/calibrationStore'
import { useState } from 'react'

function ConfidenceBar({ confidence }) {
  return (
    <div style={{ width: 150, height: 8, background: '#eee', borderRadius: 4 }}>
      <div style={{
        width: `${Math.round(confidence * 100)}%`,
        height: '100%',
        background: confidence > 0.6 ? '#43a047' : '#fb8c00',
        borderRadius: 4,
        transition: 'width 120ms linear',
      }} />
    </div>
  )
}

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
        <div>
          <p>Person 1 (left): {left?.label || '—'}</p>
          <ConfidenceBar confidence={left?.confidence || 0} />
        </div>
        <div>
          <p>Person 2 (right): {right?.label || '—'}</p>
          <ConfidenceBar confidence={right?.confidence || 0} />
        </div>
      </div>
    </div>
  )
}
