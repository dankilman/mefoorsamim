import {Box, Flex, Heading, Text} from 'rebass'
import Message from './lib/message'
import {State} from '../lib/game'

interface GameSummaryProps {
  G: State
}

function GameSummary(props: GameSummaryProps) {
  const {G} = props
  const summary: any = G.summary
  const {guesses} = summary

  function table(columns, items) {
    return (
      <Box
        mt={10}
        width={1}
        display="grid"
        css={{
          gridTemplateColumns: `repeat(${columns}, minmax(80px, 1fr))`,
          borderTop: '1px solid black',
          borderRight: '1px solid black',
        }}
      >
        {items.map((item, index) => {
          const isHeader = index < columns
          return (
            <Box
              key={index}
              sx={{
                padding: '8px',
                borderLeft: '1px solid black',
                borderBottom: '1px solid black',
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

  return (
    <Flex
      flexWrap="wrap"
      height="80vh"
      overflow="auto"
      m="10px auto 0 auto"
      css={{alignContent: 'flex-start'}}
    >
      <Message fontSize={50}>Game Summary</Message>

      {table(2, ['Players', '# Mefoorsamim'].concat(guesses.flatMap((info) => {
        const {numberOfGuesses, player1Name, player2Name} = info
        return [`${player1Name} & ${player2Name}`, numberOfGuesses]
      })))}

      {table(2, ['Players', 'Mefoorsam'].concat(guesses.flatMap((info) => {
        const {guesses: pairGuesses, player1Name, player2Name} = info
        return pairGuesses.flatMap((guess) => {
          return [`${player1Name} & ${player2Name}`, guess]
        })
      })))}

      {table(3, ['Speaker', 'Answerer', 'Mefoorsam'].concat(G.guesses.flatMap((info) => {
        const {speakerIndex, answererIndex, name} = info
        const speakerName = G.players[speakerIndex].name
        const answererName = G.players[answererIndex].name
        return [speakerName, answererName, name]
      })))}

    </Flex>
  )
}

export default GameSummary