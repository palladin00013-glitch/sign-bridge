import localforage from 'localforage'

const store = localforage.createInstance({ name: 'sign-bridge-settings' })

export async function getSettings() {
  return (await store.getItem('settings')) || {
    avatarSpeed: 'normal',
    avatarSize: 'medium',
    captions: true,
    highContrast: false,
  }
}

export async function saveSettings(settings) {
  await store.setItem('settings', settings)
}
