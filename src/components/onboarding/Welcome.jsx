import Icon from '../Icon'

export default function Welcome({ onNext, onWatchDemo }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-space-md px-margin text-center">
      <div className="flex h-32 w-32 items-center justify-center rounded-full bg-surface-container-high"><Icon name="sign_language" size={56} className="text-primary" /></div>
      <h1 className="text-4xl font-bold text-on-surface">SignBridge</h1>
      <p className="max-w-xs text-on-surface-variant">Real-time text/sign bridge for Deaf and hearing people</p>
      <span className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-3 py-1.5 text-sm text-primary"><Icon name="bolt" size={16} /> Works offline after first setup</span>
      <div className="mt-space-md grid w-full max-w-sm grid-cols-2 gap-space-sm">
        <div className="rounded-xl bg-surface-container p-space-md"><Icon name="visibility" className="mb-1 text-secondary" /><p className="font-semibold text-on-surface">Dual Visual</p><p className="text-xs text-on-surface-variant">Split-stream sync</p></div>
        <div className="rounded-xl bg-surface-container p-space-md"><Icon name="tune" className="mb-1 text-primary" /><p className="font-semibold text-on-surface">Low Latency</p><p className="text-xs text-on-surface-variant">Sub-100ms gestures</p></div>
      </div>
      <button onClick={onNext} className="mt-space-md flex min-h-[56px] w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-primary-container font-bold text-on-primary">Get Started <Icon name="arrow_forward" /></button>
      <button onClick={onWatchDemo} className="flex min-h-[52px] w-full max-w-sm items-center justify-center rounded-xl bg-surface-container-high font-semibold text-on-surface">Watch Demo</button>
      <p className="mt-space-sm flex items-center gap-1 text-xs text-on-surface-variant"><Icon name="accessibility_new" size={16} /> No sign language knowledge needed for hearing companions.</p>
    </div>
  )
}
