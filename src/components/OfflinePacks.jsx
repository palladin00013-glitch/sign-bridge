import { useEffect, useState } from 'react'
import Icon from './Icon'
import { phrases } from '../lib/phraseMatcher'

export default function OfflinePacks({ onBack }) {
  const [cacheReady, setCacheReady] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.ready.then(() => setCacheReady(true))
  }, [])

  const categories = ['clinic', 'education', 'casual', 'general']
  return <div className="flex flex-col gap-space-md px-margin pb-space-lg pt-space-sm"><div className="flex items-center gap-space-xs"><button onClick={onBack}><Icon name="arrow_back" /></button><h1 className="text-2xl font-bold">Offline Packs</h1></div><div className="flex items-center justify-between rounded-xl bg-surface-container p-space-md"><div className="flex items-center gap-2"><Icon name={cacheReady ? 'offline_pin' : 'sync'} className={cacheReady ? 'text-secondary' : 'text-tertiary'} /><span className="text-sm">{cacheReady ? 'Service worker active — app works offline' : 'Caching in progress…'}</span></div></div>{categories.map(category => { const count = phrases.filter(phrase => phrase.category === category).length; return <div key={category} className="flex items-center justify-between rounded-xl bg-surface-container p-space-md"><div><p className="font-semibold capitalize">{category} Pack</p><p className="text-xs text-on-surface-variant">{count} phrases · avatar-rendered (no video yet)</p></div><span className="text-xs font-bold text-secondary">✓ Always available</span></div> })}<p className="text-center text-xs text-on-surface-variant">Since phrases render via the on-device avatar rather than downloaded video files, every pack is available offline by default — nothing to download yet.</p></div>
}
