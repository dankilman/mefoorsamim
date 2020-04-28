import {countdownSeconds, beforeStartCountdownSeconds, State} from '../lib/game'
import {Ctx, PlayerID} from 'boardgame.io'
import {Box, Flex, Text, Button} from 'rebass'
import {Moves} from '../lib/types'
import {zeroPad} from 'react-countdown'
import NamesHeader from './lib/names-header'
import Countdown from './lib/countdown'

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
  const totalNames = ctx.numPlayers * G.numNamesPerPlayer
  // +1 because current name is popped into G.currentName
  const leftNames = G.names.length + 1
  const guessedNames = totalNames - leftNames
  let counter = (
    <Countdown
      context={{end: G.countdownEnd, left: G.countdownLeft}}
      defaultValue={`00:${countdownSeconds}`}
      textFn={({minutes, seconds}) => `${zeroPad(minutes)}:${zeroPad(seconds)}`}
      onComplete={isPlaying ? () => moves.endTimer() : null}
    />
  )
  return (
    <Flex width={1} flexWrap="wrap" >
      <NamesHeader G={G} ctx={ctx} />
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
          {counter}
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
  const button = (bg, onClick, text, disabled, zIndex = null) => {
    const ml = buttons.length === 0 ? 0 : 1
    const b = (
      <Button
        key={buttons.length}
        bg={disabled ? 'g1' : bg}
        ml={ml}
        onClick={() => onClick()}
        flex={1}
        disabled={disabled}
        css={{zIndex}}
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
        m="10px auto 0 auto"
        overflow="auto"
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
  } else if (playingStage === 'beforePlaying') {
    if (isPlaying) {
      // don't show word until start is pressed
      content = null
    }
    const counter = (
      <Countdown
        context={{end: G.beforePlayEnd}}
        defaultValue={`${beforeStartCountdownSeconds}...`}
        textFn={({seconds}) => `${seconds}...`}
        onComplete={isPlaying ? () => moves.actuallyStartTurn() : null}
      />
    )
    button('c5', moves.startTurn, counter, !isPlaying)
  } else if (playingStage === 'playing') {
    const isPause = !!G.countdownLeft
    const disabled = isPause || !isPlaying
    const pauseOrResume = isPause ? moves.resumeTimer : moves.pauseTimer
    const pauseOrResumeText = isPause ? 'Resume Timer' : 'Pause Timer'
    button('green', moves.addCurrentNameAndGetNextName, 'Guessed Correctly, Get Next Name!', disabled)
    button('c3', moves.undoLastGuess, 'Oops, undo my last move', disabled)
    button('c5', pauseOrResume, pauseOrResumeText, !isActive, 1)
    button('c5', moves.endTimer, 'End Timer', !isPlaying)
  } else if (playingStage === 'ending') {
    button('c5', moves.endTurn, 'End Turn', !isPlaying)
    button('c5', moves.addLastAndEndTurn, 'We got the last name right!', !isPlaying)
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
  const isPause = playingStage === 'playing' && !G.countdownEnd
  let maybeOverlay = null
  if (isPause) {
    maybeOverlay = (
      <Box
        height="100%"
        width="100%"
        css={{
          background: 'rgba(0, 0, 0, 0.8)',
          position: 'fixed',
          left: 0,
          top: 0,
        }}
      />
    )
  }
  return (
    <Box width={1}>
      <Header G={G} ctx={ctx} isActive={isActive} moves={moves} stage={stage} />
      {maybeOverlay}
      <Body G={G} isActive={isActive} playerID={playerID} moves={moves} stage={stage} playingStage={playingStage}/>
    </Box>
  )
}

export default PlayingPhase
