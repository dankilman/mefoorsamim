import config from './config'
import {FlatFile} from 'boardgame.io/server'

const db = new FlatFile({
  dir: config.gameServerStorageDir
})

export default db
