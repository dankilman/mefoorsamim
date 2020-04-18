import { Server } from 'boardgame.io/server'
import Game from '../../lib/game'
import config from '../../lib/config'

const server = Server({ games: [Game] })
const port = config.gameServerPort
server.run({port}, () => {
  console.log(`> Game ready on http://localhost:${port}`)
})

export default () => {}