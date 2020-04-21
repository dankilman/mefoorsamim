import {Flex} from 'rebass'
import Game from '../lib/game'
import GameBoard from './game-board'
import {SocketIO} from 'boardgame.io/multiplayer'
import {Client} from './custom-game-client'
import config from '../lib/config'

interface GameAreaProps {
  gameID
  playerName
  gameState
}

function GameArea(props: GameAreaProps) {
  const {playerName, gameState, gameID} = props
  const players = gameState.players
  const playerConfig = players[playerName]
  const playerID = playerConfig?.id

  const gameServerPrefix = config.clientGameServerPrefix
  const gameServerPort = config.clientGameServerPort
  const GameClient: any = Client({
    game: Game,
    numPlayers: Object.keys(players).length,
    board: GameBoard,
    debug: false,
    multiplayer: SocketIO({
      server: `${gameServerPrefix}${config.hostName}:${gameServerPort}`
    }),
    gameMetadata: gameState,
  })

  return (
    <GameClient gameID={gameID} playerID={playerID} />
  )
}

interface LobbyGameProps {
  gameID
  playerName
  gameState
}

function LobbyGame(props: LobbyGameProps) {
  const {gameID, playerName, gameState} = props
  return (
    <Flex width={1} flexWrap="wrap">
      <GameArea gameID={gameID} playerName={playerName} gameState={gameState}/>
    </Flex>
  )
}

export default LobbyGame