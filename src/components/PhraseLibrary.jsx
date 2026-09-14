import { useState } from 'react'
import Icon from './Icon'
import { phrases } from '../lib/phraseMatcher'
import { speak } from '../hooks/useTTS'

const TABS = [
  { id: 'clinic', label: 'Clinic', icon: 'local_hospital' },
  { id: 'education', label: 'Education', icon: 'school' },
  { id: 'casual', label: 'Casual', icon: 'chat_bubble' },
]

export default function PhraseLibrary({ onSend }) {
  const [tab, setTab] = useState('clinic')
  const [query, setQuery] = useState('')
  const list = phrases.filter(phrase => (phrase.category === tab || phrase.category === 'general') && phrase.text[0].toLowerCase().includes(query.toLowerCase()))
  return <div className="flex flex-col gap-space-md px-margin pb-space-lg pt-space-sm"><div className="flex items-center justify-between"><h1 className="text-2xl font-bold">Phrase Library</h1><span className="flex items-center gap-1 text-xs text-secondary"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-secondary" />Sync OK</span></div><div className="flex items-center justify-between rounded-lg bg-surface-container-high px-3 py-2 text-xs text-on-surface-variant"><span className="flex items-center gap-1.5"><Icon name="offline_pin" className="text-primary" size={16} />{list.length} phrases cached offline</span><span className="font-bold text-secondary">✓ Verified</span></div><div className="flex items-center gap-2 overflow-x-auto">{TABS.map(item => <button key={item.id} onClick={() => setTab(item.id)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 font-semibold ${tab === item.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'}`}><Icon name={item.icon} size={18} />{item.label}</button>)}</div><div className="relative"><Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" /><input value={query} onChange={event => setQuery(event.target.value)} className="min-h-[52px] w-full rounded-xl bg-surface-container pl-12 pr-4 text-on-surface outline-none placeholder:text-on-surface-variant" placeholder={`Search phrases in ${tab}...`} /></div><div className="flex flex-col gap-space-md">{list.map(phrase => <div key={phrase.id} className="flex flex-col gap-3 rounded-xl bg-surface-container p-4"><h2 className="text-lg font-semibold capitalize">{phrase.text[0]}</h2><div className="grid grid-cols-2 gap-2"><button onClick={() => speak(phrase.text[0])} className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-surface-container-high font-semibold"><Icon name="volume_up" className="text-secondary" size={18} />TTS Audio</button><button onClick={() => onSend(phrase)} className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-lg bg-primary font-semibold text-on-primary"><Icon name="bolt" size={18} />Send to Bridge</button></div></div>)}</div></div>
}
