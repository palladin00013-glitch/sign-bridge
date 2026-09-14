import { useEffect, useRef, useState } from 'react'
import { Holistic } from '@mediapipe/holistic'
import { landmarksToVector, classifySign } from '../lib/signClassifier'

function makeCroppedCanvas(video, side) {
  const canvas = document.createElement('canvas')
  canvas.width = video.videoWidth / 2
  canvas.height = video.videoHeight
  const ctx = canvas.getContext('2d')
  const sx = side === 'left' ? 0 : video.videoWidth / 2
  ctx.drawImage(video, sx, 0, video.videoWidth / 2, video.videoHeight, 0, 0, canvas.width, canvas.height)
  return canvas
}

function usePersonTracker(videoRef, side, examples) {
  const [sign, setSign] = useState(null)
  const holisticRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    const holistic = new Holistic({
      locateFile: (file) => `/mediapipe/holistic/${file}`, // pre-copied for offline use, see Module 7 note
    })
    holistic.setOptions({ modelComplexity: 0, minDetectionConfidence: 0.5 })
    holistic.onResults((results) => {
      const hand = results.rightHandLandmarks || results.leftHandLandmarks
      if (hand) setSign(classifySign(landmarksToVector(hand), examples))
    })
    holisticRef.current = holistic

    let raf
    const loop = async () => {
      if (videoRef.current.readyState >= 2) {
        const cropped = makeCroppedCanvas(videoRef.current, side)
        await holistic.send({ image: cropped })
      }
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(raf); holistic.close() }
  }, [videoRef, side, examples])

  return sign
}

export function useHolisticMultiPerson(videoRef, examples) {
  const left = usePersonTracker(videoRef, 'left', examples)
  const right = usePersonTracker(videoRef, 'right', examples)
  return { left, right }
}
