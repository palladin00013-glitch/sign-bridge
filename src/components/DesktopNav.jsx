import Icon from './Icon'

const NAV = [
  { id: 'bridge', label: 'Live Bridge', icon: 'record_voice_over' },
  { id: 'library', label: 'Phrase Library', icon: 'menu_book' },
  { id: 'group', label: 'Group Mode', icon: 'groups' },
  { id: 'calibrate', label: 'Calibrate', icon: 'tune' },
]

export default function DesktopNav({ screen, setScreen, onOpenSettings }) {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface-container/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-space-lg">
        <div className="flex items-center gap-2">
          <Icon name="sign_language" className="text-primary" size={26} />
          <span className="text-lg font-bold">SignBridge</span>
        </div>

        <nav className="flex items-center gap-1">
          {NAV.map(item => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${screen === item.id ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <button onClick={onOpenSettings} className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high" aria-label="Open settings">
          <Icon name="settings" size={20} />
        </button>
      </div>
    </header>
  )
}
