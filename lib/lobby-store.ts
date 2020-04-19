import storage from 'node-persist'
import config from './config'

let store = null

async function getStore() {
  if (!store) {
    await init()
  }
  return store
}

async function init() {
  const lobbyStorage = storage.create({
    dir: config.lobbyStorageDir
  })
  await lobbyStorage.init()
  store = lobbyStorage
}

async function set(key, value) {
  const s = await getStore()
  return await s.setItem(key, value)
}

async function get(key) {
  const s = await getStore()
  return await s.getItem(key)
}

async function remove(key) {
  const s = await getStore()
  return await s.removeItem(key)
}

export default {init, set, get, remove}