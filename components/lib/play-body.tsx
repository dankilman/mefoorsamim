import {State} from '../../lib/game'
import {Moves} from '../../lib/types'
import {PlayerID} from 'boardgame.io'
import {Flex} from 'rebass'
import PlayButtons from './play-buttons'
import PlayContent from './play-content'

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

  return (
    <Flex flexWrap="wrap" width={1}>
      <PlayButtons G={G} moves={moves} isActive={isActive} playingStage={playingStage} isPlaying={isPlaying} />
      <PlayContent G={G} playerID={playerID} playingStage={playingStage} isPlaying={isPlaying} isWatching={isWatching} />
    </Flex>
  )
}

export default Body
