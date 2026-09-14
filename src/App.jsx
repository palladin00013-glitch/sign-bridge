import { useState } from 'react'
import HearingToDeaf from './components/HearingToDeaf'
import DeafToHearing from './components/DeafToHearing'
import CalibrationWizard from './components/CalibrationWizard'
import MultiPersonDemo from './components/MultiPersonDemo'

export default function App() {
  const [tab, setTab] = useState('h2d')
  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 16 }}>
      <nav style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        <button onClick={() => setTab('h2d')}>Hearing→Deaf</button>
        <button onClick={() => setTab('d2h')}>Deaf→Hearing</button>
        <button onClick={() => setTab('calibrate')}>Calibrate Signs</button>
        <button onClick={() => setTab('multi')}>Multi-Person Demo</button>
      </nav>
      {tab === 'h2d' && <HearingToDeaf />}
      {tab === 'd2h' && <DeafToHearing />}
      {tab === 'calibrate' && <CalibrationWizard onDone={() => setTab('h2d')} />}
      {tab === 'multi' && <MultiPersonDemo />}
    </div>
  )
}
