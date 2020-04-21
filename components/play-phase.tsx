import {countdownSeconds, State} from '../lib/game'
import {Ctx, PlayerID} from 'boardgame.io'
import {Box, Card, Flex, Text, Button} from 'rebass'
import {Moves} from '../lib/types'
import Countdown, {zeroPad} from 'react-countdown'
import {now} from '../lib/time'

function getCurrentStage(ctx: Ctx, playerID) {
  const activePlayers = ctx.activePlayers
  if (!activePlayers) {
    return undefined
  }
  return activePlayers[playerID]
}

interface HeaderProps {
  isActive: boolean
  G: State
  ctx: Ctx
  moves: Moves
  stage: string
}

function Header(props: HeaderProps) {
  const {G, ctx, isActive, moves, stage} = props
  const isWatching = stage === 'watching'
  const isPlaying = !isWatching && isActive
  const currentPlayer = G.players[ctx.currentPlayer]
  const totalNames = ctx.numPlayers * G.numNamesPerPlayer
  // +1 because current name is popped into G.currentName
  const leftNames = G.names.length + 1
  const guessedNames = totalNames - leftNames
  let countdownOrText = <Text>00:{countdownSeconds}</Text>
  // when countdown is controlled, value is time left
  const countdownValue = G.countdownEnd || G.countdownLeft
  if (countdownValue) {
    const onComplete = isPlaying ? () => moves.endTimer() : null
    countdownOrText = (
      <Countdown
        date={countdownValue}
        now={now}
        onComplete={onComplete}
        controlled={!!G.countdownLeft}
        daysInHours={true}
        renderer={({minutes, seconds}) => <Text>{zeroPad(minutes)}:{zeroPad(seconds)}</Text>}
      />
    )
  }
  return (
    <Flex width={1} flexWrap="wrap" >
      <Flex
        width={1}
        flexWrap="wrap"
        justifyContent="space-between"
        mt={10}
      >
        {G.order.map((playerID, index) => {
          const isCurrent = playerID.toString() === currentPlayer.id.toString()
          const player = G.players[playerID]
          const color = player.pairColor
          const pairIndex = player.pairIndex
          const numOfGuesses = (G.pairGuesses[pairIndex] || []).length
          const borderColor = isCurrent ? 'black' : color
          const sx = {border: `3px solid ${borderColor}`}
          return (
            <Card
              flex={1}
              key={index}
              sx={sx}
              bg={color}
            >
              <Text verticalAlign="center" textAlign="center">{player.name} ({numOfGuesses})</Text>
            </Card>
          )
        })}
      </Flex>
      <Flex
        flexWrap="wrap"
        width={1}
        justifyContent="space-between"
        mt={10}
        p={10}
        sx={{
          border: '1px solid black',
        }}
      >
        <Text flex={1}>Names Left: {leftNames}</Text>
        <Text flex={1}>Names Guessed: {guessedNames}</Text>
        <Text flex={1}>Current Turn Guesses: {G.currentTurnGuesses}</Text>
      </Flex>
      <Flex
        flexWrap="wrap"
        width={1}
        height={100}
        m="auto"
      >
        <Text
          textAlign="center"
          m="auto"
          fontSize={50}
        >
          {countdownOrText}
        </Text>
      </Flex>
    </Flex>
  )
}

interface BodyProps {
  G: State
  moves: Moves
  isActive: boolean
  playerID: PlayerID
  stage: string
  playingStage: string
}

function Body(props: BodyProps) {
  const {G, isActive, playerID, moves, stage, playingStage} = props
  const isWatching = stage === 'watching'
  const isPlaying = !isWatching && isActive
  let buttons = []
  const button = (bg, onClick, text, disabled = false) => {
    const ml = buttons.length === 0 ? 0 : 1
    const b = (
      <Button
        key={buttons.length}
        bg={disabled ? 'g1' : bg}
        ml={ml}
        onClick={() => onClick()}
        flex={1}
        disabled={disabled}
      >
        {text}
      </Button>
    )
    buttons.push(b)
  }

  let content
  if (isPlaying) {
    content = (
      <Flex
        flexWrap="wrap"
        width={1}
        height={300}
        m="auto"
      >
        <Text
          textAlign="center"
          m="auto"
          fontSize={100}
        >
          {G.currentName}
        </Text>
      </Flex>
    )
  } else if (isWatching) {
    const thisPlayerName = G.players[playerID].name
    content = <Box mt={2}>This is not your turn {thisPlayerName}. Please wait patiently :)</Box>
  } else {
    content = <div />
  }
  if (playingStage === 'starting') {
    if (isPlaying) {
      // don't show word until start is pressed
      content = null
    }
    button('c5', moves.startTurn, 'Start Turn!', !isPlaying)
  } else if (playingStage === 'playing') {
    const isPause = !!G.countdownLeft
    const disabled = isPause || !isPlaying
    const pauseOrResume = isPause ? moves.resumeTimer : moves.pauseTimer
    const pauseOrResumeText = isPause ? 'Resume Timer' : 'Pause Timer'
    button('green', moves.addCurrentNameAndGetNextName, 'Guessed Correctly, Get Next Name!', disabled)
    button('c3', moves.undoLastGuess, 'Oops, undo my last move', disabled)
    button('c5', pauseOrResume, pauseOrResumeText, !isActive)
    button('c5', moves.endTimer, 'End Timer', !isPlaying)
  } else if (playingStage === 'ending') {
    button('c5', moves.endTurn, 'End Turn', !isPlaying)
    button('c5', moves.addLastAndEndTurn, 'End Turn But Also Add Last Name!', !isPlaying)
  } else {
    console.error(`Unexpected stage ${playingStage}`)
  }
  return (
    <Flex flexWrap="wrap" width={1}>
      <Flex
        width={1}
        flexWrap="wrap"
        justifyContent="space-between"
      >
        {buttons}
      </Flex>
      {content}
    </Flex>
  )
}

interface PlayingPhaseProps {
  G: State
  ctx: Ctx
  moves: Moves
  isActive: boolean
  playerID: PlayerID
}

function PlayingPhase(props: PlayingPhaseProps) {
  const {G, ctx, moves, isActive, playerID} = props
  const stage = getCurrentStage(ctx, playerID)
  const playingStage = getCurrentStage(ctx, ctx.currentPlayer)
  return (
    <Box width={1}>
      <Header G={G} ctx={ctx} isActive={isActive} moves={moves} stage={stage} />
      <Body G={G} isActive={isActive} playerID={playerID} moves={moves} stage={stage} playingStage={playingStage}/>
    </Box>
  )
}

export default PlayingPhase
