import {useEffect, useState} from 'react'
import ReactModal from 'react-modal'
import {Box, Button, Card, Flex} from 'rebass'
import {Input} from '@rebass/forms'
import api from '../lib/api-client'
import LobbyGame from './lobby-game'
import {useCookies} from 'react-cookie'
import Heading from './lib/heading'
import Message from './lib/message'

let currentTimeoutID

async function fetchGameData(gameID, setGameState, previousHash=null) {
  const gameState = await api.lobby('get', {gameID})
  if (!previousHash || gameState.hash !== previousHash) {
    setGameState(gameState)
  }
  currentTimeoutID = setTimeout(() => fetchGameData(gameID, setGameState, gameState.hash), 1000)
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
  const isJoined = !!players[playerName.trim()]
  const numOfJoinedPlayers = Object.keys(players).length
  const canStart = numOfJoinedPlayers >= 4 && numOfJoinedPlayers % 2 === 0

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

      <Message m={30}>
        Enter your name, then click "Join". Click "Start" once everybody joined
      </Message>

      <Input
        mt={1}
        width={1}
        value={playerName}
        placeholder="Your Name"
        onChange={e => setPlayerName((e.target as any).value)}
        onInput={e => setPlayerName((e.target as any).value)}
        onKeyPress={e => e.key === 'Enter' && joinRoom()}
      />
      <Button
        mt={1}
        width={1}
        onClick={() => joinRoom()}
        bg={isJoined ? 'gray' : 'c5'}
        disabled={isJoined}
      >
        Join
      </Button>
      <Message m={30}>Currently In</Message>
      <Box width={1}>
        {Object.entries(players).map(([playerName, playerConfig], index) => {
          return <Card m={1} key={index}>{playerName}</Card>
        })}
      </Box>
      <Button
        mt={1}
        width={1}
        onClick={() => api.lobby('start', {gameID})}
        bg={!canStart || !isJoined ? 'gray' : 'c5'}
        disabled={!canStart || !isJoined}
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
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showClearModal, setShowClearModal] = useState(false)
  const [cookies, setCookie] = useCookies(['playerName'])
  const playerName = queryPlayerName || cookies.playerName || ''
  const setPlayerName = name => setCookie('playerName', name, {path: '/'})
  const [gameState, setGameState] = useState({})

  let showComponent
  if (!gameState['status']) {
    showComponent = (
      <Heading>Loading Game...</Heading>
    )
  } else if (gameState['status'] === 'running') {
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

  useEffect(() => {
    fetchGameData(gameID, setGameState)
    return () => {
      if (currentTimeoutID) {
        clearTimeout(currentTimeoutID)
      }
    }
  }, [])

  const players = gameState['players'] || {}
  const isSpectator = !players[playerName.trim()]

  const rules = [
    'Must be a real/fictive character: Not an object, a band name or a tv show for example.',
    'Reasonably known: Character needs to be reasonably known within the group of people playing the game.',
    'Shbira rule: If "Bira" is the current name, you can\'t say "Sounds like shbira".',
    'AB rule: Cannot iterate letters until reaching the correct letter.',
    'Bazaar rule: If a correct name was guessed right as the turn ends, it is a valid win.',
  ]
  const header = (
    <Flex mt={10} flexWrap="wrap" width={1} justifyContent="flex-end">
      <Flex
        sx={{
          border: '1px solid black',
          borderRadius: '4px',
        }}
        alignItems="center"
        mr={1}
        pl={2}
        width={300}
      >
        {playerName} {isSpectator ? '(Not In Game)' : ''}
      </Flex>
      <Button
        mr={1}
        onClick={() => setShowHelpModal(true)}
        bg="c5"
      >
        ?
      </Button>
      <ReactModal
        isOpen={showHelpModal}
        onRequestClose={() => setShowHelpModal(false)}
        ariaHideApp={false}
        style={{
          content: {
            width: '800px',
            margin: '0 auto'
          }
        }}
      >
        <Flex width={1} flexWrap="wrap">
          <Flex width={1} justifyContent="space-between">
            <Heading>
              Game Rules And Guidelines
            </Heading>
            <Button bg="c5" onClick={() => setShowHelpModal(false)}>X</Button>
          </Flex>
          <ul>
            {rules.map((item, index) => {
              return (
                <li key={index}>{item}</li>
              )
            })}
          </ul>
        </Flex>
      </ReactModal>
      <Button
        bg="c3"
        onClick={() => setShowClearModal(true)}
      >
        X
      </Button>
      <ReactModal
        isOpen={showClearModal}
        onRequestClose={() => setShowClearModal(false)}
        ariaHideApp={false}
        style={{
          content: {
            width: '600px',
            height: '200px',
            margin: '0 auto'
          }
        }}
      >
        <Flex width={1} flexWrap="wrap">
          <Flex width={1} justifyContent="flex-end">
            <Button bg="c5" onClick={() => setShowClearModal(false)}>X</Button>
          </Flex>
        </Flex>
        <Heading>
          Are you sure you want to clear current game data?
        </Heading>
        <Button
          mt={1}
          bg="c3"
          onClick={async () => {
            await api.manage('clearGameData', {gameID})
            setShowClearModal(false)
          }}
        >
          Yes, Please Clear
        </Button>
      </ReactModal>
    </Flex>
  )

  return (
    <Flex
      width="800px"
      flexWrap="wrap"
      m="0 auto"
    >
      {header}
      {showComponent}
    </Flex>
  )

}

export default Lobby