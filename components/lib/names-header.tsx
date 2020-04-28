import {Flex, Text} from 'rebass'
import {State} from '../../lib/game'
import {Ctx} from 'boardgame.io'

interface NamesHeaderProps {
  G: State
  ctx: Ctx
}

function NamesHeader(props: NamesHeaderProps) {
  const {G, ctx} = props
  const phase = ctx.phase
  const currentPlayer = G.players[ctx.currentPlayer]
  return (
    <Flex
      width={1}
      flexWrap="wrap"
      justifyContent="space-between"
      mt={10}
    >
      {G.order.map((playerID, index) => {
        const player = G.players[playerID]
        const submittedNames = G.playersThatSubmittedNames.includes(playerID.toString())
        const isCurrent = playerID.toString() === currentPlayer.id.toString()
        const playerColor = player.pairColor
        let color
        let borderColor
        let text = player.name
        if (phase === 'playing') {
          color = playerColor
          borderColor = isCurrent ? 'black' : color
        } else {
          if (submittedNames) {
            color = borderColor = playerColor
          } else {
            color = 'rgba(255, 255, 255, 0)'
            borderColor = 'black'
          }
        }
        const textColor = ['c3', 'c4', 'c5'].includes(color) ? '#fff' : null
        const borderSize = 3
        const sx = {border: `${borderSize}px solid ${borderColor}`}
        return (
          <Flex
            flex={1}
            alignItems="center"
            key={index}
            sx={sx}
            color={textColor}
            bg={color}
            p={2}
          >
            <Text flex={1} textAlign="center">{text}</Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default NamesHeader