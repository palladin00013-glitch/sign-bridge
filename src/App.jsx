import { useEffect, useState } from 'react'
import { getSettings, saveSettings } from './lib/settingsStore'
import Welcome from './components/onboarding/Welcome'
import LanguageSelect from './components/onboarding/LanguageSelect'
import ContextSelect from './components/onboarding/ContextSelect'
import Tutorial from './components/onboarding/Tutorial'
import LiveBridge from './components/LiveBridge'
import PhraseLibrary from './components/PhraseLibrary'
import GroupMode from './components/GroupMode'
import CalibrationWizard from './components/CalibrationWizard'
import SettingsScreen from './components/SettingsScreen'
import OfflinePacks from './components/OfflinePacks'
import HelpSafety from './components/HelpSafety'
import Icon from './components/Icon'

const NAV = [
  { id: 'bridge', label: 'Bridge', icon: 'record_voice_over' },
  { id: 'library', label: 'Library', icon: 'menu_book' },
  { id: 'group', label: 'Group', icon: 'groups' },
  { id: 'calibrate', label: 'Calibrate', icon: 'tune' },
]

export default function App() {
  const [settings, setSettings] = useState(null)
  const [onboardStep, setOnboardStep] = useState('welcome')
  const [screen, setScreen] = useState('bridge')

  useEffect(() => {
    getSettings().then(value => {
      setSettings(value)
      setOnboardStep(value.onboarded ? 'done' : 'welcome')
    })
  }, [])

  if (!settings) return null

  if (onboardStep !== 'done') {
    if (onboardStep === 'welcome') return <Welcome onNext={() => setOnboardStep('language')} onWatchDemo={() => setOnboardStep('language')} />
    if (onboardStep === 'language') return <LanguageSelect onNext={async signLanguage => { const next = await saveSettings({ signLanguage }); setSettings(next); setOnboardStep('context') }} />
    if (onboardStep === 'context') return <ContextSelect onNext={async contextDomains => { const next = await saveSettings({ contextDomains }); setSettings(next); setOnboardStep('tutorial') }} />
    return <Tutorial onFinish={async () => { const next = await saveSettings({ onboarded: true }); setSettings(next); setOnboardStep('done') }} />
  }

  return (
    <div className={`min-h-screen ${settings.highContrast ? 'contrast-125' : ''}`}>
      <div className="pb-24">
        {screen === 'bridge' && <LiveBridge settings={settings} onOpenSettings={() => setScreen('settings')} onOpenOffline={() => setScreen('offline')} />}
        {screen === 'library' && <PhraseLibrary settings={settings} onSend={() => setScreen('bridge')} />}
        {screen === 'group' && <GroupMode />}
        {screen === 'calibrate' && <CalibrationWizard onDone={() => setScreen('bridge')} />}
        {screen === 'settings' && <SettingsScreen settings={settings} onChange={setSettings} onBack={() => setScreen('bridge')} onOpenHelp={() => setScreen('help')} />}
        {screen === 'offline' && <OfflinePacks onBack={() => setScreen('bridge')} />}
        {screen === 'help' && <HelpSafety onBack={() => setScreen('settings')} />}
      </div>
      <nav className="fixed bottom-0 z-50 w-full bg-surface-container/90 pb-safe backdrop-blur-xl">
        <div className="flex h-16 items-center justify-around px-margin">
          {NAV.map(item => <button key={item.id} onClick={() => setScreen(item.id)} className={`flex min-h-[48px] min-w-[56px] flex-col items-center justify-center ${screen === item.id ? 'font-bold text-primary' : 'text-on-surface-variant'}`}><Icon name={item.icon} size={24} /><span className="text-[11px]">{item.label}</span></button>)}
        </div>
      </nav>
    </div>
  )
}
