import {useEffect, useState} from 'react'
import {Box, Button, Card, Flex, Heading} from 'rebass'
import {Input} from '@rebass/forms'
import api from '../lib/api-client'
import LobbyGame from './lobby-game'
import {useCookies} from 'react-cookie'


function fetchGameState(gameID, setGameState) {
  async function fetchData() {
    const gameState = await api.lobby('get', {gameID})
    setGameState(gameState)
    if (gameState.status !== 'running') {
      setTimeout(fetchData, 1000)
    }
  }
  useEffect(() => { fetchData() }, [])
}

interface WaitingRoomProps {
  gameID
  playerName
  setPlayerName
  gameState
  setGameState
}

function WaitingRoom(props: WaitingRoomProps) {
  const {gameID, playerName, setPlayerName, gameState, setGameState} = props
  const players = gameState['players'] || {}

  const joinRoom = async () => {
    if (!playerName.trim()) {
      return
    }
    const gameState = await api.lobby('join', {
      gameID,
      playerName: playerName.trim(),
    })
    setGameState(gameState)
  }
  return (
    <Flex mt={10} flexWrap="wrap">
      <Heading width={1}>Enter your name, then click "Join". Click "Start" once everybody joined</Heading>
      <Input
        mt={1}
        width={1}
        value={playerName}
        onChange={e => setPlayerName((e.target as any).value)}
        onInput={e => setPlayerName((e.target as any).value)}
        onKeyPress={e => e.key === 'Enter' && joinRoom()}
      />
      <Button
        mt={1}
        width={1}
        onClick={() => joinRoom()}
      >
        Join
      </Button>
      <Heading mt={1} width={1}>Currently In</Heading>
      <Box width={1}>
        {Object.entries(players).map(([playerName, playerConfig], index) => {
          return <Card m={1} key={index}>{playerName}</Card>
        })}
      </Box>
      <Button
        mt={1}
        width={1}
        onClick={() => api.lobby('start', {gameID})}
      >
        Start
      </Button>
    </Flex>
  )
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

  let showComponent
  if (gameState['status'] === 'running') {
    showComponent = (
      <LobbyGame
        gameID={gameID}
        playerName={playerName}
        gameState={gameState}
      />
    )
  } else {
    showComponent = (
      <WaitingRoom
        gameID={gameID}
        playerName={playerName}
        setPlayerName={setPlayerName}
        gameState={gameState}
        setGameState={setGameState}
      />
    )
  }

  fetchGameState(gameID, setGameState)

  return (
    <Flex
      width="800px"
      flexWrap="wrap"
      m="0 auto"
    >
      {showComponent}
    </Flex>
  )

}

export default Lobby