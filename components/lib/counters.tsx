import {Box, Flex, Text} from 'rebass'
import {State} from '../../lib/game'
import {Ctx} from 'boardgame.io'

interface CountersProps {
  G: State
  ctx: Ctx
}

function Counters(props: CountersProps) {
  const {G, ctx} = props
  const totalNames = ctx.numPlayers * G.numNamesPerPlayer
  const leftNames = G.names.length + (!!G.currentName ? 1 : 0)
  const guessedNames = totalNames - leftNames

  const pairNumGuesses = (
    <Flex
      width={1}
      flexWrap="wrap"
      justifyContent="space-between"
      mt="5px"
    >
      {G.pairs.map( ([player1ID, player2ID], index) => {
        const player1 = G.players[player1ID]
        const pairIndex = player1.pairIndex
        const numOfGuesses = (G.pairGuesses[pairIndex] || []).length
        const bg = player1.pairColor
        const color = ['c3', 'c4', 'c5'].includes(bg) ? '#fff' : null
        return (
          <Flex
            flex={1}
            alignItems="center"
            key={index}
            color={color}
            bg={bg}
            p={2}
          >
            <Text flex={1} textAlign="center">{numOfGuesses}</Text>
          </Flex>
        )
      })}
    </Flex>
  )

  const totals = (
    <Flex
      flexWrap="wrap"
      width={1}
      justifyContent="space-between"
      color="#fff"
      bg="c5"
      mt="5px"
      p={10}
    >
      <Text flex={1}>Names Left: {leftNames}</Text>
      <Text flex={1}>Names Guessed: {guessedNames}</Text>
      <Text flex={1}>Current Turn Guesses: {G.currentTurnGuesses}</Text>
    </Flex>
  )
  return (
    <Box width={1}>
      {pairNumGuesses}
      {totals}
    </Box>
  )
}

export default Counters