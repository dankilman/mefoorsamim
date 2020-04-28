import {Box, Flex} from 'rebass'
import Message from './lib/message'
import {State} from '../lib/game'

function table(header, items) {
  const columns = header.length
  const border = '1px solid black'
  return (
    <Box
      mt={10}
      width={1}
      display="grid"
      css={{
        gridTemplateColumns: `repeat(${columns}, minmax(80px, 1fr))`,
        borderTop: border,
        borderRight: border,
      }}
    >
      {header.concat(items).map((item, index) => {
        const isHeader = index < columns
        return (
          <Box
            key={index}
            sx={{
              padding: '8px',
              borderLeft: border,
              borderBottom: border,
              backgroundColor: isHeader ? 'c5' : null,
              color: isHeader ? '#fff' : null,
            }}
          >
            {item}
          </Box>
        )
      })}
    </Box>
  )
}

interface GameSummaryProps {
  G: State
}

function GameSummary(props: GameSummaryProps) {
  const {G: {players, guesses: allGuesses, summary: {guesses: pairGuesses}}} = props
  return (
    <Flex
      flexWrap="wrap"
      height="80vh"
      overflow="auto"
      m="10px auto 0 auto"
      css={{alignContent: 'flex-start'}}
    >
      <Message fontSize={50}>Game Summary</Message>

      {table(['Players', '# Mefoorsamim'], pairGuesses.flatMap((info) => {
        const {numberOfGuesses, player1Name, player2Name} = info
        return [`${player1Name} & ${player2Name}`, numberOfGuesses]
      }))}

      {table(['Players', 'Mefoorsam'], pairGuesses.flatMap((info) => {
        const {guesses: pairGuesses, player1Name, player2Name} = info
        return pairGuesses.flatMap((guess) => {
          return [`${player1Name} & ${player2Name}`, guess]
        })
      }))}

      {table(['Speaker', 'Answerer', 'Mefoorsam'], allGuesses.flatMap((info) => {
        const {speakerIndex, answererIndex, name} = info
        const speakerName = players[speakerIndex].name
        const answererName = players[answererIndex].name
        return [speakerName, answererName, name]
      }))}

    </Flex>
  )
}

export default GameSummary