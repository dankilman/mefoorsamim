import {Box, Flex, Text} from 'rebass'
import {State} from '../../lib/game'
import {PlayerID} from 'boardgame.io'

interface PlayContentProps {
  G: State
  playerID: PlayerID
  playingStage: string
  isPlaying: boolean
  isWatching: boolean
}

function PlayContent(props: PlayContentProps) {
  const {G, isPlaying, isWatching, playerID, playingStage} = props
  let content = <div />
  if (isPlaying && ['playing', 'ending'].includes(playingStage)) {
    content = (
      <Flex
        flexWrap="wrap"
        width={1}
        height={300}
        m="10px auto 0 auto"
        overflow="auto"
      >
        <Text
          textAlign="center"
          m="auto"
          fontSize={100}
        >
          {G.currentName}
        </Text>
      </Flex>
    )
  } else if (isWatching) {
    const thisPlayerName = G.players[playerID].name
    content = <Box mt={2}>This is not your turn {thisPlayerName}. Please wait patiently :)</Box>
  }
  return content
}

export default PlayContent