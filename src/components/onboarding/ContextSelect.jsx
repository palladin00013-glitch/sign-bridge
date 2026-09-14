import { useState } from 'react'
import Icon from '../Icon'

const DOMAINS = [
  { id: 'clinic', name: 'Clinic & Healthcare', desc: 'Symptoms, dosages, doctor dialogue', icon: 'medical_services' },
  { id: 'education', name: 'Education & Classroom', desc: 'Lectures, Q&A, academic terms', icon: 'school' },
  { id: 'casual', name: 'Casual & Daily', desc: 'Friends, family, quick chats', icon: 'coffee' },
  { id: 'public', name: 'Public Services & Transit', desc: 'Government desks, transit counters, banks', icon: 'account_balance' },
]

export default function ContextSelect({ onNext }) {
  const [selected, setSelected] = useState(['clinic', 'education'])
  const toggle = id => setSelected(values => values.includes(id) ? values.filter(value => value !== id) : [...values, id])
  return <div className="flex min-h-screen flex-col gap-space-md px-margin pb-space-lg pt-space-lg"><div className="text-xs font-bold uppercase tracking-wide text-primary">Setup Step 2 of 3 · 66% Complete</div><div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high"><div className="h-full bg-primary" style={{ width: '66%' }} /></div><h1 className="text-3xl font-bold text-on-surface">Where will you use SignBridge most?</h1><p className="text-on-surface-variant">We'll tailor quick phrases and sign precision for these situations.</p><div className="flex flex-col gap-space-sm">{DOMAINS.map(domain => <button key={domain.id} onClick={() => toggle(domain.id)} className={`flex items-center gap-space-sm rounded-xl border-l-4 bg-surface-container p-space-md text-left ${selected.includes(domain.id) ? 'border-primary' : 'border-transparent'}`}><div className="flex h-11 w-11 items-center justify-center rounded-lg bg-surface-container-high text-primary"><Icon name={domain.icon} /></div><div className="flex-1"><p className="font-bold text-on-surface">{domain.name}</p><p className="text-xs text-on-surface-variant">{domain.desc}</p></div><div className={`flex h-6 w-6 items-center justify-center rounded ${selected.includes(domain.id) ? 'bg-primary' : 'bg-surface-container-high'}`}>{selected.includes(domain.id) && <Icon name="check" size={16} className="text-on-primary" />}</div></button>)}</div><div className="flex items-start gap-2 rounded-xl bg-surface-container-low p-space-md text-sm text-on-surface-variant"><Icon name="info" className="text-primary" size={18} />Multiple can be selected. You can switch modes on the fly during any live conversation.</div><button onClick={() => onNext(selected)} className="mt-auto flex min-h-[56px] w-full items-center justify-center gap-2 rounded-xl bg-primary-container font-bold text-on-primary">Continue <Icon name="arrow_forward" /></button></div>
}
