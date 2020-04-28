import {Box, Flex, Heading, Text} from 'rebass'
import Message from './lib/message'

interface GameSummaryProps {
  summary: any
}

function GameSummary(props: GameSummaryProps) {
  const {summary} = props
  const {guesses} = summary
  return (
    <Flex
      flexWrap="wrap"
      height="80vh"
      overflow="auto"
      m="10px auto 0 auto"
      css={{alignContent: 'flex-start'}}
    >
      <Message fontSize={50}>Game Over</Message>
      <Heading mt={10} mb={1} width={1}>Number Of Mefoorsamim By Each Pair</Heading>
      {guesses.map((info, index) => {
        const {numberOfGuesses, player1Name, player2Name} = info
        return (
          <Box width={1} key={index}>
            <Text width={1}>- {player1Name} and {player2Name} with {numberOfGuesses} correct mefoorsamim answers</Text>
          </Box>
        )
      })}
      {guesses.map((info, index) => {
        const {guesses: pairGuesses, player1Name, player2Name} = info
        return (
          <Box mt={1} width={1} key={index}>
            <Heading width={1}>Mefoorsamim by {player1Name} and {player2Name}</Heading>
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