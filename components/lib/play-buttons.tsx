import {Button, Flex} from 'rebass'
import Countdown from './countdown'
import {beforeStartCountdownSeconds, State} from '../../lib/game'
import {Moves} from '../../lib/types'

interface PlayButtonsProps {
  G: State
  moves: Moves
  isActive: boolean
  playingStage: string
  isPlaying: boolean
}

function PlayButtons(props: PlayButtonsProps) {
  const {G, isActive, playingStage, moves, isPlaying} = props
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
  if (playingStage === 'starting') {
    button('c5', moves.startTurn, 'Start Turn!', !isPlaying)
  } else if (playingStage === 'beforePlaying') {
    const countdown = (
      <Countdown
        context={{end: G.beforePlayEnd}}
        defaultValue={`${beforeStartCountdownSeconds}...`}
        textFn={({seconds}) => `${seconds}...`}
        onComplete={isPlaying ? () => moves.actuallyStartTurn() : null}
      />
    )
    button('c5', moves.startTurn, countdown, !isPlaying)
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
    <Flex
      width={1}
      flexWrap="wrap"
      justifyContent="space-between"
    >
      {buttons}
    </Flex>
  )
}

export default PlayButtons