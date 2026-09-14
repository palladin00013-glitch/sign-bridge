import Icon from '../Icon'

const STEPS = [
  { icon: 'mic', title: 'Hearing person speaks or types', desc: 'Instant speech-to-text transcription with offline noise filtering.' },
  { icon: 'accessibility_new', title: 'Deaf person sees sign avatar + captions', desc: 'Real-time avatar translates sentences into sign gestures.' },
  { icon: 'touch_app', title: 'Deaf person replies with text, buttons, or signs', desc: 'Fast phrase tap presets or sign recognition convert back to speech.' },
]

export default function Tutorial({ onFinish }) {
  return <div className="flex min-h-screen flex-col gap-space-md px-margin pb-space-lg pt-space-lg"><div className="text-xs font-bold uppercase tracking-wide text-primary">Quick Tutorial · Step 3 of 3 (100%)</div><div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high"><div className="h-full bg-primary" style={{ width: '100%' }} /></div><h1 className="text-3xl font-bold text-on-surface">How SignBridge works</h1><p className="text-on-surface-variant">Seamless two-way bridge in 3 simple steps.</p><div className="flex flex-col gap-space-sm">{STEPS.map((step, index) => <div key={step.title} className="flex gap-space-sm rounded-xl bg-surface-container p-space-md"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-on-primary">{index + 1}</div><div><p className="flex items-center gap-2 font-bold text-on-surface"><Icon name={step.icon} size={18} className="text-primary" />{step.title}</p><p className="mt-1 text-sm text-on-surface-variant">{step.desc}</p></div></div>)}</div><button onClick={onFinish} className="mt-auto flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-primary-container font-bold text-on-primary">Finish Setup <Icon name="arrow_forward" /></button></div>
}
