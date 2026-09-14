import localforage from 'localforage'

const store = localforage.createInstance({ name: 'sign-bridge-calibration' })

export async function saveExample(label, vector) {
  const existing = (await store.getItem(label)) || []
  existing.push(vector)
  await store.setItem(label, existing)
}

export async function getAllExamples() {
  const keys = await store.keys()
  const out = []
  for (const label of keys) {
    const vectors = await store.getItem(label)
    vectors.forEach(vector => out.push({ label, vector }))
  }
  return out
}

export async function clearCalibration() {
  await store.clear()
}
