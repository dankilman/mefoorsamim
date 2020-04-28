import {useTheme} from 'emotion-theming'
import {useState} from 'react'
import api from '../../lib/api-client'
import {Box, Button, Card, Flex, Text} from 'rebass'
import Message from './message'
import {Input} from '@rebass/forms'
import config from '../../lib/config'
import validator from 'validator'

interface WaitingRoomProps {
  gameID
  playerName
  setPlayerName
  gameState
  setGameState
}

function WaitingRoom(props: WaitingRoomProps) {
  const {gameID, playerName, setPlayerName, gameState, setGameState} = props
  const theme: any = useTheme()
  const [numberOfNamesToFill, setNumberOfNamesToFill] = useState('')
  const players = gameState['players'] || {}
  const isJoined = !!players[playerName.trim()]
  const numOfJoinedPlayers = Object.keys(players).length
  const canStart = numOfJoinedPlayers >= 4 && numOfJoinedPlayers % 2 === 0
  const startDisabled = !canStart || !isJoined

  const validatedSetNumberOfNames = value => {
    if (!(validator.isEmpty(value) || validator.isInt(value, {min: 1, max: 1000}))) {
      return
    }
    setNumberOfNamesToFill(value)
  }

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

      <Message m={20}>
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
        bg={isJoined ? 'g1' : 'c5'}
        disabled={isJoined}
      >
        Join
      </Button>
      <Message m={20}>Currently In</Message>

      <Box
        width={1}
        display="grid"
        css={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: theme.space[1],
        }}
      >
        {Object.entries(players).map(([playerName, playerConfig], index) => {
          return (
            <Card key={index}>
              <Text textAlign="center">{playerName}</Text>
            </Card>
          )
        })}
      </Box>

      <Box width={1} display={canStart ? null : 'none'}>
        <Flex width={1}>
          <Input
            mt={1}
            placeholder={`Number Of Names Each Player Needs To Fill (Default ${config.defaultNumberOfNamesToFill})`}
            disabled={startDisabled}
            value={numberOfNamesToFill}
            onChange={e => validatedSetNumberOfNames((e.target as any).value)}
            onInput={e => validatedSetNumberOfNames((e.target as any).value)}
          />
        </Flex>

        <Button
          mt={1}
          width={1}
          onClick={async () => {
            const response = await api.lobby('start', {gameID, numberOfNamesToFill})
            if (response.validationMessage) {
              console.warn(response.validationMessage)
            }
          }}
          bg={startDisabled ? 'g1' : 'c5'}
          disabled={startDisabled}
        >
          Start
        </Button>
      </Box>

    </Flex>
  )
}

export default WaitingRoom
