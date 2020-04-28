import {State} from '../lib/game'
import {Ctx, PlayerID} from 'boardgame.io'
import {Box} from 'rebass'
import {Moves} from '../lib/types'
import Header from './lib/play-header'
import Body from './lib/play-body'
import PauseOverlay from './lib/pause-overlay'

function getCurrentStage(ctx: Ctx, playerID) {
  const activePlayers = ctx.activePlayers
  if (!activePlayers) {
    return undefined
  }
  return activePlayers[playerID]
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
      <PauseOverlay G={G} playingStage={playingStage} />
      <Body G={G} isActive={isActive} playerID={playerID} moves={moves} stage={stage} playingStage={playingStage}/>
    </Box>
  )
}

export default PlayingPhase
