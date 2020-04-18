import {Server} from 'boardgame.io'
import {useState} from 'react'
import {Box, Button, Flex, Heading} from 'rebass'

interface PairingPhaseProps {
  gameMetadata: Server.GameMetadata
  choosePairs: any
}

function PairingPhase(props: PairingPhaseProps) {
  const [currentPairs, setCurrentPairs] = useState([])
  const {gameMetadata, choosePairs} = props
  const colors = [
    '#C4B7CB',
    '#BBC7CE',
    '#BFEDEF',
    '#98E2C6',
    '#545C52'
  ]
  const totalPlayers = Object.keys(gameMetadata.players).length
  const shouldPickFirstPairMember = currentPairs.length === 0 || currentPairs[currentPairs.length - 1].length === 2
  const noMorePicks = currentPairs.length === totalPlayers / 2 && currentPairs[currentPairs.length - 1].length === 2
  let heading
  if (noMorePicks) {
    heading =  'No more names to pick pairs. Either submit or undo to change selections'
  } else if (shouldPickFirstPairMember) {
    heading = 'Click a name to pick the first member of the current pair'
  } else {
    heading = 'Click a name to pick the second member of the current pair'
  }
  return (
    <Flex mt={10} width={1} flexWrap="wrap">
      <Heading width={1}>{heading}</Heading>
      {Object.values(gameMetadata.players).map((playerMetadata, index) => {
        let pairIndex = -1
        for (let i = 0; i < currentPairs.length; i++) {
          if (pairIndex > -1) {
            break
          }
          const pair = currentPairs[i]
          for (const player of pair) {
            if (player.id === playerMetadata.id) {
              pairIndex = i
              break
            }
          }
        }
        const isSelected = pairIndex > -1
        const variant = isSelected ? 'primary' : 'outline'
        const bg = isSelected ? colors[pairIndex] : null
        return (
          <Button
            key={index}
            onClick={() => {
              if (isSelected) {
                return
              }
              const newCurrentPairs = currentPairs.slice()
              if (currentPairs.length > 0 && currentPairs[currentPairs.length - 1].length === 1) {
                newCurrentPairs[currentPairs.length - 1].push(playerMetadata)
              } else {
                newCurrentPairs.push([playerMetadata])
              }
              setCurrentPairs(newCurrentPairs)
            }}
            width={1}
            mt={1}
            bg={bg}
            variant={variant}>
            {playerMetadata.name}
          </Button>
        )
      })}
      <Box mt={1} width={1}>
        <Button
          mr={1}
          onClick={() => {
            if (currentPairs.length === 0) {
              return
            }
            const newCurrentPairs = currentPairs.slice()
            const lastPair = currentPairs[currentPairs.length - 1]
            if (lastPair.length === 1) {
              newCurrentPairs.pop()
            } else {
              newCurrentPairs[currentPairs.length - 1].pop()
            }
            setCurrentPairs(newCurrentPairs)
          }}
        >
          Undo
        </Button>
        <Button
          bg="green"
          onClick={() => {
            if (currentPairs.length < 2 || currentPairs[currentPairs.length - 1].length === 1) {
              console.log('Not enough')
              return
            }
            choosePairs(currentPairs.map(([player1, player2], index) => ({
              color: colors[index], player1, player2, index
            })))
          }}
        >
          Submit
        </Button>
      </Box>
    </Flex>
  )
}

export default PairingPhase
