import {Box} from 'rebass'
import {State} from '../../lib/game'

interface PauseOverlayProps {
  G: State
  playingStage: string
}

function PauseOverlay(props: PauseOverlayProps) {
  const {G, playingStage} = props
  const isPause = playingStage === 'playing' && !G.countdownEnd
  let maybeOverlay = <span />
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
  return maybeOverlay
}

export default PauseOverlay