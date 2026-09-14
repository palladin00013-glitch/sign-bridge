import localforage from 'localforage'

const store = localforage.createInstance({ name: 'sign-bridge-settings' })

const DEFAULTS = {
  onboarded: false,
  signLanguage: 'ASL',
  contextDomains: ['clinic'],
  avatarSpeed: 1,
  avatarSize: 'large',
  captions: true,
  captionSize: 'md',
  highContrast: false,
  haptics: true,
  sttEnabled: true,
  ttsEnabled: true,
  ttsVoice: 'default',
  offlineOnly: false,
}

export async function getSettings() {
  const saved = await store.getItem('settings')
  return { ...DEFAULTS, ...(saved || {}) }
}

export async function saveSettings(patch) {
  const next = { ...(await getSettings()), ...patch }
  await store.setItem('settings', next)
  return next
}
