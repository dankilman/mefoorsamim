import {Ctx, PlayerID, Server} from 'boardgame.io'
import {State} from '../lib/game'
import {EventsAPI} from 'boardgame.io/dist/types/src/plugins/events/events'
import PairingPhase from './pairs-phase'
import NamingPhase from './names-phase'
import PlayingPhase from './play-phase'
import {Moves} from '../lib/types'
import {Box} from 'rebass'
import GameSummary from './game-summary'


interface BoardProps {
  G: State
  ctx: Ctx
  moves: Moves
  events: EventsAPI
  reset: any
  undo: any
  redo: any
  log: any
  gameID: string
  playerID: PlayerID
  gameMetadata: Server.GameMetadata
  isActive: boolean
  isMultiplayer: boolean
  isConnected: boolean
  credentials: string
}


function Board(props: BoardProps) {
  const {G, ctx, moves, playerID, isActive, gameMetadata} = props
  const phase = ctx.phase
  if (phase === 'pairing') {
    return <PairingPhase gameMetadata={gameMetadata} choosePairs={moves.choosePairs}/>
  } else if (phase === 'naming') {
    return <NamingPhase G={G} isActive={isActive} chooseNames={moves.chooseNames}/>
  } else if (phase === 'playing') {
    return <PlayingPhase G={G} ctx={ctx} moves={moves} isActive={isActive} playerID={playerID}/>
  } else if (ctx.gameover) {
    return <GameSummary summary={G.summary} />
  } else {
    return <Box>This should not have happened :( (board)</Box>
  }
}

export default Board
