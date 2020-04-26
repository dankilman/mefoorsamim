import {Flex, Heading} from 'rebass'
import Game from '../lib/game'
import GameBoard from './game-board'
import {SocketIO} from 'boardgame.io/multiplayer'
import {Client} from './custom-game-client'
import config from '../lib/config'
import React, {useEffect, useState} from 'react'

interface GameAreaProps {
  gameID
  playerName
  gameState
}


let GameClient: any = null

function GameArea(props: GameAreaProps) {
  const {playerName, gameState, gameID} = props
  const players = gameState.players
  const playerConfig = players[playerName]
  const playerID = playerConfig?.id
  const [forceUpdate, setForceUpdate] = useState(0)

  const gameServerPrefix = config.clientGameServerPrefix
  const gameServerPort = config.clientGameServerPort

  useEffect(() => {
    if (!GameClient) {
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
  }
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