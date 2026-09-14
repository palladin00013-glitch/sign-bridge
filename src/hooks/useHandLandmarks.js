import { useEffect, useRef, useState } from 'react'
import { Hands } from '@mediapipe/hands'
import { Camera } from '@mediapipe/camera_utils'

export function useHandLandmarks(videoRef, onLandmarks) {
  const handsRef = useRef(null)

  useEffect(() => {
    if (!videoRef.current) return
    const hands = new Hands({
      locateFile: (file) => `/mediapipe/hands/${file}`,
    })
    hands.setOptions({ maxNumHands: 1, modelComplexity: 0, minDetectionConfidence: 0.6 })
    hands.onResults((results) => {
      if (results.multiHandLandmarks?.[0]) onLandmarks(results.multiHandLandmarks[0])
    })
    handsRef.current = hands

    const camera = new Camera(videoRef.current, {
      onFrame: async () => await hands.send({ image: videoRef.current }),
      width: 320,
      height: 240,
    })
    camera.start()

    return () => camera.stop()
  }, [videoRef, onLandmarks])
}
