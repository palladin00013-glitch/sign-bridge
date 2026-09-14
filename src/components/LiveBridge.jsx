import { useState, useRef, useEffect } from 'react'
import Icon from './Icon'
import SignVideoPlayer from './SignVideoPlayer'
import { matchPhrase, phrases } from '../lib/phraseMatcher'
import { detectEmotionFromText } from '../lib/emotionDetector'
import { speak } from '../hooks/useTTS'
import { useSTT } from '../hooks/useSTT'
import SignVision from './SignVision'

export default function LiveBridge({ settings, onOpenSettings, onOpenOffline }) {
  const [context, setContext] = useState(settings.contextDomains[0] || 'clinic')
  const [log, setLog] = useState([])
  const [input, setInput] = useState('')
  const [avatarPhrase, setAvatarPhrase] = useState(null)
  const [emotion, setEmotion] = useState('neutral')
  const [avatarSpeed, setAvatarSpeed] = useState(1)
  const [captionsOn, setCaptionsOn] = useState(settings.captions)
  const [transcriptOpen, setTranscriptOpen] = useState(true)
  const [online, setOnline] = useState(navigator.onLine)
  const [activeTab, setActiveTab] = useState('bridge')
  const bottomRef = useRef(null)

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [log])

  function handleUtterance(text) {
    if (!text.trim()) return
    const matched = matchPhrase(text)
    setEmotion(detectEmotionFromText(text))
    if (matched) setAvatarPhrase(matched)
    setLog(items => [...items, { from: 'voice', name: 'Hearing (Voice)', text, ts: new Date() }])
    setInput('')
  }

  const { listening, start } = useSTT(handleUtterance)

  function quickReply(text) {
    setLog(items => [...items, { from: 'sign', name: 'Deaf (Sign)', text, ts: new Date() }])
    if (settings.ttsEnabled) speak(text)
  }

  const contextPhrases = phrases.filter(p => p.category === context || p.category === 'general').slice(0, 8)

  return (
    <div className="flex w-full flex-col space-y-space-md px-margin pb-6 pt-space-sm">
      <div className="flex items-center justify-between gap-2">
        <button className="flex min-h-[48px] items-center gap-2 rounded-full bg-surface-container px-3 py-2" onClick={() => setContext(context === 'clinic' ? 'education' : context === 'education' ? 'casual' : 'clinic')}>
          <Icon name="medical_services" className="text-primary" fill size={20} />
          <span className="capitalize">{context} Mode</span><Icon name="keyboard_arrow_down" className="text-on-surface-variant" size={18} />
        </button>
        <div className="flex items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1.5">{online ? <><Icon name="wifi" size={18} className="text-secondary" /><span className="text-xs font-semibold text-secondary">Online</span></> : <><Icon name="wifi_off" size={18} className="text-tertiary" /><span className="text-xs font-semibold text-tertiary">Cached Mode</span></>}</div>
        <button onClick={onOpenSettings} aria-label="Settings"><Icon name="settings" className="text-on-surface-variant" /></button>
      </div>

      <div className="flex rounded-xl bg-surface-container p-1">
        <button onClick={() => setActiveTab('bridge')} className={`flex-1 rounded-lg py-2 text-sm font-semibold ${activeTab === 'bridge' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Quick &amp; Text</button>
        <button onClick={() => setActiveTab('vision')} className={`flex-1 rounded-lg py-2 text-sm font-semibold ${activeTab === 'vision' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>Sign Vision</button>
      </div>

      {activeTab === 'vision' && <SignVision />}
      <div className={activeTab === 'vision' ? 'hidden' : ''}>

      <div className="relative flex aspect-[4/4.5] w-full flex-col justify-between overflow-hidden rounded-2xl bg-surface-container-low shadow-lg">
        <div className="relative z-10 flex items-center justify-between p-3"><div className="flex gap-1 rounded-xl bg-surface-container-highest/90 p-1">{[0.5, 1, 1.5].map(value => <button key={value} onClick={() => setAvatarSpeed(value)} className={`rounded-lg px-2.5 py-1 text-xs font-bold ${avatarSpeed === value ? 'bg-primary text-on-primary' : 'text-on-surface-variant'}`}>{value}x</button>)}</div><button onClick={() => setCaptionsOn(value => !value)} className="flex items-center gap-1 rounded-xl bg-surface-container-highest/90 px-3 py-1.5 text-xs font-semibold text-primary"><Icon name="closed_caption" size={18} fill /> {captionsOn ? 'ON' : 'OFF'}</button></div>
        <div className="flex flex-1 items-center justify-center"><SignVideoPlayer phrase={avatarPhrase} emotion={emotion} speed={avatarSpeed} size={settings.avatarSize} /></div>
        {captionsOn && avatarPhrase && <div className="relative z-10 w-full p-3"><div className="flex flex-col gap-2 rounded-xl bg-surface-container/95 p-3.5"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 animate-pulse rounded-full bg-secondary" /><span className="text-[11px] font-bold uppercase tracking-wider text-secondary">Translating Voice → {settings.signLanguage}</span></div><p className="text-lg capitalize leading-snug text-on-surface">{avatarPhrase.id.replace('_', ' ')}</p></div></div>}
      </div>

      <div className="flex w-full flex-col gap-3 rounded-2xl bg-surface-container p-3.5"><div className="flex items-center justify-between"><div className="flex items-center gap-2"><Icon name="chat_bubble_outline" className="text-primary" size={20} /><span className="font-semibold">Live Session Log</span><span className="rounded-full bg-surface-container-high px-2 py-0.5 text-[11px] text-on-surface-variant">{log.length} msgs</span></div><button onClick={() => setTranscriptOpen(open => !open)} className="flex items-center gap-1 text-xs text-on-surface-variant">{transcriptOpen ? 'Collapse' : 'Show'} <Icon name={transcriptOpen ? 'expand_less' : 'expand_more'} size={18} /></button></div>{transcriptOpen && <div className="flex max-h-56 flex-col gap-2.5 overflow-y-auto">{log.map((item, index) => <div key={index} className={`flex items-start gap-2.5 rounded-xl p-2.5 ${item.from === 'voice' ? 'bg-surface-container-low' : 'bg-surface-container-high'}`}><Icon name={item.from === 'voice' ? 'record_voice_over' : 'sign_language'} size={18} className={item.from === 'voice' ? 'text-primary' : 'text-secondary'} /><div className="min-w-0 flex-1"><div className="flex justify-between text-[11px]"><span className={`font-bold ${item.from === 'voice' ? 'text-primary' : 'text-secondary'}`}>{item.name}</span><span className="text-on-surface-variant">{item.ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div><p className="text-sm text-on-surface">{item.text}</p></div><button onClick={() => speak(item.text)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary"><Icon name="volume_up" size={16} /></button></div>)}<div ref={bottomRef} /></div>}</div>

      <div className="flex flex-col gap-space-sm"><div className="flex items-center gap-2.5"><button onClick={start} className={`flex min-h-[56px] flex-1 items-center justify-center gap-2.5 rounded-2xl font-bold shadow-lg ${listening ? 'bg-error text-on-error' : 'bg-primary text-on-primary'}`}><Icon name="mic" size={28} fill /> {listening ? 'Listening...' : 'Hold or Tap to Speak'}</button><button onClick={onOpenOffline} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container text-primary"><Icon name="cloud_download" size={24} /></button></div><div className="flex items-center gap-2 rounded-2xl bg-surface-container p-1.5"><input value={input} onChange={event => setInput(event.target.value)} onKeyDown={event => event.key === 'Enter' && handleUtterance(input)} className="min-h-[48px] min-w-0 flex-1 bg-transparent px-3.5 py-2.5 text-on-surface placeholder:text-outline focus:outline-none" placeholder="Type message to sign or voice..." /><button onClick={() => handleUtterance(input)} className="flex min-h-[48px] items-center gap-1 rounded-xl bg-primary px-4 font-semibold text-on-primary">Send <Icon name="send" size={18} /></button></div><div className="grid grid-cols-2 gap-2.5 pt-1">{contextPhrases.slice(0, 4).map(item => <button key={item.id} onClick={() => quickReply(item.text[0])} className="flex min-h-[52px] items-center justify-center rounded-xl bg-surface-container-high font-semibold">{item.text[0]}</button>)}</div></div>
      </div>
    </div>
  )
}
