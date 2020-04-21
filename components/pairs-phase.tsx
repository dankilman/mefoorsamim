import {Server} from 'boardgame.io'
import {useState} from 'react'
import {Box, Button, Flex} from 'rebass'
import Message from './lib/message'

interface PairingPhaseProps {
  gameMetadata: Server.GameMetadata
  choosePairs: any
  isActive: boolean
}

function PairingPhase(props: PairingPhaseProps) {
  const [currentPairs, setCurrentPairs] = useState([])
  const {gameMetadata, choosePairs, isActive} = props
  const colors = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5'
  ]
  const totalPlayers = Object.keys(gameMetadata.players).length
  const shouldPickFirstPairMember = currentPairs.length === 0 || currentPairs[currentPairs.length - 1].length === 2
  const noMorePicks = currentPairs.length === totalPlayers / 2 && currentPairs[currentPairs.length - 1].length === 2
  const buttonDisabled = !isActive
  const submitDisabled = !noMorePicks
  const undoDisabled = currentPairs.length === 0
  let heading
  if (!isActive) {
    heading = 'Waiting for players to pick pairs'
  } else if (noMorePicks) {
    heading =  'No more names to pick pairs. Either submit or undo to change selections'
  } else if (shouldPickFirstPairMember) {
    heading = 'Click a name to pick the first member of the current pair'
  } else {
    heading = 'Click a name to pick the second member of the current pair'
  }
  return (
    <Flex mt={10} width={1} flexWrap="wrap">
      <Message>{heading}</Message>
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
            variant={variant}
            disabled={buttonDisabled || isSelected}
            sx={isSelected ? {
              borderStyle: 'solid',
              borderWidth: 1,
              borderColor: 'black',
            } : null}
          >
            {playerMetadata.name}
          </Button>
        )
      })}
      <Box mt={1} width={1}>
        <Button
          mr={1}
          onClick={() => {
            const newCurrentPairs = currentPairs.slice()
            const lastPair = currentPairs[currentPairs.length - 1]
            if (lastPair.length === 1) {
              newCurrentPairs.pop()
            } else {
              newCurrentPairs[currentPairs.length - 1].pop()
            }
            setCurrentPairs(newCurrentPairs)
          }}
          bg={(buttonDisabled || undoDisabled) ? 'gray' : 'c5'}
          disabled={buttonDisabled || undoDisabled}
        >
          Undo
        </Button>
        <Button
          bg={(submitDisabled || buttonDisabled) ? 'gray' : 'green'}
          onClick={() => {
            choosePairs(currentPairs.map(([player1, player2], index) => ({
              color: colors[index], player1, player2, index
            })))
          }}
          disabled={submitDisabled || buttonDisabled}
        >
          Submit
        </Button>
      </Box>
    </Flex>
  )
}

export default PairingPhase
