import { Server, FlatFile } from 'boardgame.io/server'
import Game from '../../lib/game'
import config from '../../lib/config'
import lobbyStorage from '../../lib/lobby-store'

lobbyStorage.init().then(() => {
  console.log('> Lobby storage initiated')
})
const server = Server({
  games: [Game],
  db: new FlatFile({
    dir: config.gameServerStorageDir
  })
})
const port = config.gameServerPort
server.run({port}, () => {
  console.log(`> Game ready on http://localhost:${port}`)
})

export default () => {}