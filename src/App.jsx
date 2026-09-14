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
import DesktopNav from './components/DesktopNav'
import Icon from './components/Icon'
import { useIsDesktop } from './hooks/useMediaQuery'

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
  const isDesktop = useIsDesktop()

  useEffect(() => {
    getSettings().then(value => {
      setSettings(value)
      setOnboardStep(value.onboarded ? 'done' : 'welcome')
    })
  }, [])

  if (!settings) return null

  if (onboardStep !== 'done') {
    const wrap = node => <div className="flex min-h-screen items-center justify-center bg-background"><div className="w-full max-w-md">{node}</div></div>
    if (onboardStep === 'welcome') return wrap(<Welcome onNext={() => setOnboardStep('language')} onWatchDemo={() => setOnboardStep('language')} />)
    if (onboardStep === 'language') return wrap(<LanguageSelect onNext={async signLanguage => { const next = await saveSettings({ signLanguage }); setSettings(next); setOnboardStep('context') }} />)
    if (onboardStep === 'context') return wrap(<ContextSelect onNext={async contextDomains => { const next = await saveSettings({ contextDomains }); setSettings(next); setOnboardStep('tutorial') }} />)
    return wrap(<Tutorial onFinish={async () => { const next = await saveSettings({ onboarded: true }); setSettings(next); setOnboardStep('done') }} />)
  }

  const screens = {
    bridge: <LiveBridge settings={settings} isDesktop={isDesktop} onOpenSettings={() => setScreen('settings')} onOpenOffline={() => setScreen('offline')} />,
    library: <PhraseLibrary settings={settings} isDesktop={isDesktop} onSend={() => setScreen('bridge')} />,
    group: <GroupMode isDesktop={isDesktop} />,
    calibrate: <CalibrationWizard isDesktop={isDesktop} onDone={() => setScreen('bridge')} />,
    settings: <SettingsScreen settings={settings} onChange={setSettings} onBack={() => setScreen('bridge')} onOpenHelp={() => setScreen('help')} />,
    offline: <OfflinePacks isDesktop={isDesktop} onBack={() => setScreen('bridge')} />,
    help: <HelpSafety isDesktop={isDesktop} onBack={() => setScreen('settings')} />,
  }

  return (
    <div className={`min-h-screen ${settings.highContrast ? 'contrast-125' : ''}`}>
      {isDesktop && <DesktopNav screen={screen} setScreen={setScreen} onOpenSettings={() => setScreen('settings')} />}
      <div className={isDesktop ? 'mx-auto max-w-7xl px-space-lg py-space-lg' : 'pb-24'}>
        {screens[screen]}
      </div>
      {!isDesktop && <nav className="fixed bottom-0 z-50 w-full bg-surface-container/90 pb-safe backdrop-blur-xl">
        <div className="flex h-16 items-center justify-around px-margin">
          {NAV.map(item => <button key={item.id} onClick={() => setScreen(item.id)} className={`flex min-h-[48px] min-w-[56px] flex-col items-center justify-center ${screen === item.id ? 'font-bold text-primary' : 'text-on-surface-variant'}`}><Icon name={item.icon} size={24} /><span className="text-[11px]">{item.label}</span></button>)}
        </div>
      </nav>}
    </div>
  )
}
