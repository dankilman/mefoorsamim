import {Flex} from 'rebass'

interface CurrentPlayerStatusProps {
  gameState: any
  playerName: string
}

function CurrentPlayerStatus(props: CurrentPlayerStatusProps) {
  const {gameState, playerName} = props
  const players = gameState['players'] || {}
  const isSpectator = !players[playerName.trim()]
  return (
    <Flex
      sx={{
        border: '1px solid black',
        borderRadius: '4px',
      }}
      alignItems="center"
      mr={1}
      pl={2}
      width={300}
      maxWidth="50vw"
    >
      {playerName} {isSpectator ? '(Not In Game)' : ''}
    </Flex>
  )
}

export default CurrentPlayerStatus
