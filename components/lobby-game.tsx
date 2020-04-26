import {Heading} from 'rebass'
import Game from '../lib/game'
import GameBoard from './game-board'
import {SocketIO} from 'boardgame.io/multiplayer'
import {Client} from './custom-game-client'
import config from '../lib/config'
import React, {useEffect, useState} from 'react'

let GameClient: any = null

interface LobbyGameProps {
  gameID
  playerName
  gameState
}

function LobbyGame(props: LobbyGameProps) {
  const {gameID, playerName, gameState} = props
  const [forceUpdate, setForceUpdate] = useState(0)
  const players = gameState.players
  const playerConfig = players[playerName]
  const playerID = playerConfig?.id
  useEffect(() => {
    if (!GameClient) {
      const gameServerPrefix = config.clientGameServerPrefix
      const gameServerPort = config.clientGameServerPort
      GameClient = Client({
        game: Game,
        numPlayers: Object.keys(players).length,
        board: GameBoard,
        debug: false,
        multiplayer: SocketIO({
          server: `${gameServerPrefix}${config.hostName}:${gameServerPort}`
        }),
      })
      setForceUpdate(forceUpdate + 1)
    }
  })
  if (!GameClient) {
    return <Heading>Loading Game...</Heading>
  } else {
    return (
      <GameClient gameID={gameID} playerID={playerID} />
    )
  }
}

export default LobbyGame