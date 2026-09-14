import { useState } from 'react'
import Icon from '../Icon'

const LANGUAGES = [
  { code: 'ASL', name: 'American Sign Language', tag: 'MOST COMMON', flag: 'US' },
  { code: 'ISL', name: 'Indian Sign Language', flag: 'IN' },
  { code: 'BSL', name: 'British Sign Language', flag: 'GB' },
  { code: 'Auslan', name: 'Australian Sign Language', flag: 'AU' },
]

export default function LanguageSelect({ onNext }) {
  const [selected, setSelected] = useState('ASL')
  return <div className="flex min-h-screen flex-col gap-space-md px-margin pb-space-lg pt-space-lg"><div className="text-xs font-bold uppercase tracking-wide text-secondary">Setup Wizard · Step 1 of 3</div><div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high"><div className="h-full bg-primary" style={{ width: '33%' }} /></div><h1 className="text-3xl font-bold text-on-surface">Choose your sign language</h1><p className="text-on-surface-variant">Select the primary visual language for the 3D avatar.</p><div className="flex flex-col gap-space-sm">{LANGUAGES.map(language => <button key={language.code} onClick={() => setSelected(language.code)} className="flex items-center justify-between rounded-xl bg-surface-container p-space-md text-left"><div className="flex items-center gap-space-sm"><div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-container-high text-xs text-on-surface-variant">{language.flag}</div><div><div className="flex items-center gap-2"><span className="font-bold text-on-surface">{language.code}</span>{language.tag && <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-bold text-secondary">{language.tag}</span>}</div><span className="text-sm text-on-surface-variant">{language.name}</span></div></div><div className={`flex h-6 w-6 items-center justify-center rounded-full ${selected === language.code ? 'bg-primary' : 'bg-surface-container-high'}`}>{selected === language.code && <Icon name="check" size={16} className="text-on-primary" />}</div></button>)}</div><button onClick={() => onNext(selected)} className="mt-auto flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-primary-container font-bold text-on-primary">Continue <Icon name="arrow_forward" /></button></div>
}
