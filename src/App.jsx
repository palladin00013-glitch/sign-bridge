import { useState } from 'react'
import { Button, Card } from '@mantine/core'
import { useInstallPrompt } from './hooks/useInstallPrompt'
import OfflineBanner from './components/OfflineBanner'
import HearingToDeaf from './components/HearingToDeaf'
import DeafToHearing from './components/DeafToHearing'
import CalibrationWizard from './components/CalibrationWizard'
import MultiPersonDemo from './components/MultiPersonDemo'

function InstallButton() {
  const { canInstall, installed, promptInstall } = useInstallPrompt()

  if (installed) return <span>✅ Installed</span>
  if (!canInstall) return null
  return <Button onClick={promptInstall}>📲 Install App</Button>
}

export default function App() {
  const [tab, setTab] = useState('h2d')
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 16 }}>
      <OfflineBanner />
      <nav style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <Button onClick={() => setTab('h2d')}>Hearing→Deaf</Button>
        <Button onClick={() => setTab('d2h')}>Deaf→Hearing</Button>
        <Button onClick={() => setTab('calibrate')}>Calibrate Signs</Button>
        <Button onClick={() => setTab('multi')}>Multi-Person Demo</Button>
        <InstallButton />
      </nav>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {tab === 'h2d' && <HearingToDeaf />}
        {tab === 'd2h' && <DeafToHearing />}
        {tab === 'calibrate' && <CalibrationWizard onDone={() => setTab('h2d')} />}
        {tab === 'multi' && <MultiPersonDemo />}
      </Card>
    </div>
  )
}
