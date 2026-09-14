import { useEffect, useState } from 'react'

export default function OfflineBanner() {
  const [online, setOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (online) return null

  return (
    <div role="status" style={{ marginBottom: 16, padding: 8, background: '#fff3cd' }}>
      You are offline. SignBridge is using cached resources.
    </div>
  )
}
