import {Box, Flex, Heading, Text} from 'rebass'

interface GameSummaryProps {
  summary: any
}

function GameSummary(props: GameSummaryProps) {
  const {summary} = props
  const {guesses} = summary
  return (
    <Flex flexWrap="wrap">
      <Flex width={1} flexWrap="wrap" m="auto">
        <Text textAlign="center" m="auto" p={20} fontSize={50}>Game Over!</Text>
      </Flex>
      <Heading mb={1} width={1}>Number Of Guesses By Each Pair</Heading>
      {guesses.map((info, index) => {
        const {numberOfGuesses, player1Name, player2Name} = info
        return (
          <Box width={1} key={index}>
            <Text width={1}>- {player1Name} and {player2Name} with {numberOfGuesses} correct guesses</Text>
          </Box>
        )
      })}
      {guesses.map((info, index) => {
        const {guesses: pairGuesses, player1Name, player2Name} = info
        return (
          <Box mt={1} width={1} key={index}>
            <Heading width={1}>Guesses by {player1Name} and {player2Name}</Heading>
            {pairGuesses.map((guess, index) => {
              return (
                <Text key={index} width={1}>- {guess}</Text>
              )
            })}
          </Box>
        )
      })}
    </Flex>
  )
}

export default GameSummary