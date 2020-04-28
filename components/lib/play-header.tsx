import {State} from '../../lib/game'
import {Ctx} from 'boardgame.io'
import {Moves} from '../../lib/types'
import {Flex} from 'rebass'
import NamesHeader from './names-header'
import Counters from './counters'
import TurnCountdown from './turn-countdown'

interface HeaderProps {
  isActive: boolean
  G: State
  ctx: Ctx
  moves: Moves
  stage: string
}

function Header(props: HeaderProps) {
  const {G, ctx, isActive, moves, stage} = props
  return (
    <Flex width={1} flexWrap="wrap" >
      <NamesHeader G={G} ctx={ctx} />
      <Counters G={G} ctx={ctx} />
      <TurnCountdown G={G} isActive={isActive} moves={moves} stage={stage}/>
    </Flex>
  )
}

export default Header
