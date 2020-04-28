import {useEffect, useState} from 'react'
import {Flex} from 'rebass'
import api from '../lib/api-client'
import LobbyGame from './lobby-game'
import {useCookies} from 'react-cookie'
import Heading from './lib/heading'
import WaitingRoom from './lib/waiting-room'
import PageHeader from './lib/page-header'

let currentTimeoutID

async function fetchGameData(gameID, setGameState, previousHash=null) {
  const gameState = await api.lobby('get', {gameID})
  if (!previousHash || gameState.hash !== previousHash) {
    setGameState(gameState)
  }
  currentTimeoutID = setTimeout(() => fetchGameData(gameID, setGameState, gameState.hash), 1000)
}

interface LobbyProps {
  gameID: string
  queryPlayerName: string
}

function Lobby(props: LobbyProps) {
  const {gameID, queryPlayerName} = props
  const [cookies, setCookie] = useCookies(['playerName'])
  const playerName = queryPlayerName || cookies.playerName || ''
  const setPlayerName = name => setCookie('playerName', name, {path: '/'})
  const [gameState, setGameState] = useState({})

  useEffect(() => {
    fetchGameData(gameID, setGameState)
    return () => {
      if (currentTimeoutID) {
        clearTimeout(currentTimeoutID)
      }
    }
  }, [])

  let body
  if (!gameState['status']) {
    body = (
      <Heading>Loading Game...</Heading>
    )
  } else if (gameState['status'] === 'running') {
    body = (
      <LobbyGame
        gameID={gameID}
        playerName={playerName}
        gameState={gameState}
      />
    )
  } else {
    body = (
      <WaitingRoom
        gameID={gameID}
        playerName={playerName}
        setPlayerName={setPlayerName}
        gameState={gameState}
        setGameState={setGameState}
      />
    )
  }

  return (
    <Flex
      width="800px"
      maxWidth="100vw"
      p={10}
      bg="rgba(255, 255, 255, 0.85)"
      flexWrap="wrap"
      m="0 auto"
      sx={{borderRadius: '0 0 4px 4px'}}
    >
      <PageHeader gameState={gameState} gameID={gameID} playerName={playerName} />
      {body}
    </Flex>
  )

}

export default Lobby