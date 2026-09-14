import { useState } from 'react'
import OfflineBanner from './components/OfflineBanner'
import ModeSelectScreen from './components/ModeSelectScreen'
import ContextSelectScreen from './components/ContextSelectScreen'
import ChatScreen from './components/ChatScreen'
import SettingsScreen from './components/SettingsScreen'
import CalibrationWizard from './components/CalibrationWizard'
import MultiPersonDemo from './components/MultiPersonDemo'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [mode, setMode] = useState(null)
  const [context, setContext] = useState(null)

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh' }}>
      <OfflineBanner />

      {screen === 'home' && (
        <ModeSelectScreen
          onSelect={(selectedMode) => { setMode(selectedMode); setScreen('context') }}
          onCalibrate={() => setScreen('calibrate')}
          onMultiDemo={() => setScreen('multi')}
        />
      )}

      {screen === 'context' && (
        <ContextSelectScreen
          onBack={() => setScreen('home')}
          onSelect={(selectedContext) => { setContext(selectedContext); setScreen('chat') }}
        />
      )}

      {screen === 'chat' && (
        <ChatScreen
          mode={mode}
          context={context}
          onBack={() => setScreen('context')}
          onSettings={() => setScreen('settings')}
        />
      )}

      {screen === 'settings' && <SettingsScreen onBack={() => setScreen('chat')} />}
      {screen === 'calibrate' && <CalibrationWizard onDone={() => setScreen('home')} />}
      {screen === 'multi' && <MultiPersonDemo />}
    </div>
  )
}
