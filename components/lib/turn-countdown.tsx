import {Flex, Text} from 'rebass'
import Countdown from './countdown'
import {countdownSeconds, State} from '../../lib/game'
import {zeroPad} from 'react-countdown'
import {Moves} from '../../lib/types'

interface TurnCountdownProps {
  G: State
  isActive: boolean
  moves: Moves
  stage: string
}

function TurnCountdown(props: TurnCountdownProps) {
  const {G, isActive, moves, stage} = props
  const isWatching = stage === 'watching'
  const isPlaying = !isWatching && isActive
  let countdown = (
    <Countdown
      context={{end: G.countdownEnd, left: G.countdownLeft}}
      defaultValue={`00:${countdownSeconds}`}
      textFn={({minutes, seconds}) => `${zeroPad(minutes)}:${zeroPad(seconds)}`}
      onComplete={isPlaying ? () => moves.endTimer() : null}
    />
  )
  return (
    <Flex flexWrap="wrap" width={1} height={100} m="auto">
      <Text textAlign="center" m="auto" fontSize={50}>
        {countdown}
      </Text>
    </Flex>
  )
}

export default TurnCountdown
