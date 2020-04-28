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

  return (
    <Flex
      flexWrap="wrap"
      height="80vh"
      overflow="auto"
      m="10px auto 0 auto"
      css={{alignContent: 'flex-start'}}
    >
      <Message fontSize={50}>Game Over</Message>

      <Box
        mt={10}
        width={1}
        display="grid"
        p={10}
        css={{
          gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
          justifyItems: 'center',
          gap: '5px',
          border: '1px solid black'
        }}
      >
        <Box>Players</Box>
        <Box># Mefoorsamim</Box>
        {guesses.map((info) => {
          const {numberOfGuesses, player1Name, player2Name} = info
          return ([
            <Box>{player1Name} & {player2Name}</Box>,
            <Box>{numberOfGuesses}</Box>
          ])
        })}
      </Box>

      <Box
        mt={10}
        width={1}
        display="grid"
        p={10}
        css={{
          gridTemplateColumns: 'repeat(2, minmax(180px, 1fr))',
          justifyItems: 'center',
          gap: '5px',
          border: '1px solid black'
        }}
      >
        <Box>Players</Box>
        <Box>Mefoorsam</Box>
        {guesses.map((info, index) => {
          const {guesses: pairGuesses, player1Name, player2Name} = info
          return pairGuesses.map((guess, index) => {
            return ([
              <Box>{player1Name} & {player2Name}</Box>,
              <Box>{guess}</Box>
            ])
          })
        })}
      </Box>

      <Box
        mt={10}
        width={1}
        display="grid"
        p={10}
        css={{
          gridTemplateColumns: 'repeat(3, minmax(180px, 1fr))',
          justifyItems: 'center',
          gap: '5px',
          border: '1px solid black'
        }}
      >
        <Box>Speaker</Box>
        <Box>Answerer</Box>
        <Box>Mefoorsam</Box>
        {G.guesses.map((info, index) => {
          const {speakerIndex, answererIndex, name} = info
          const speakerName = G.players[speakerIndex].name
          const answererName = G.players[answererIndex].name
          return ([
            <Box>{speakerName}</Box>,
            <Box>{answererName}</Box>,
            <Box>{name}</Box>
          ])
        })}
      </Box>

    </Flex>
  )
}

export default GameSummary