import {Flex, Text} from 'rebass'
import {State} from '../../lib/game'
import {Ctx} from 'boardgame.io'

interface CountersProps {
  G: State
  ctx: Ctx
}

function Counters(props: CountersProps) {
  const {G, ctx} = props
  const totalNames = ctx.numPlayers * G.numNamesPerPlayer
  // +1 because current name is popped into G.currentName
  const leftNames = G.names.length + 1
  const guessedNames = totalNames - leftNames
  return (
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
  )
}

export default Counters