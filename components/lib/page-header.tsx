import {Button, Flex} from 'rebass'
import ReactModal from 'react-modal'
import Heading from './heading'
import api from '../../lib/api-client'
import {useState} from 'react'

interface PageHeaderProps {
  gameState: any
  gameID: string
  playerName: string
}

function PageHeader(props: PageHeaderProps) {
  const {gameState, gameID, playerName} = props
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showClearModal, setShowClearModal] = useState(false)

  const players = gameState['players'] || {}
  const isSpectator = !players[playerName.trim()]

  const rules = [
    'Must be a real/fictive character: Not an object, a band name or a tv show for example.',
    'Reasonably known: Character needs to be reasonably known within the group of people playing the game.',
    'Shbira rule: If "Bira" is the current name, you can\'t say "Sounds like shbira".',
    'AB rule: Cannot iterate letters until reaching the correct letter.',
    'Buzzer rule: If a correct name was guessed right as the turn ends, it is a valid win.',
    'Google rule: Do not google names, as tempting as it may be.',
  ]

  return (
    <Flex flexWrap="wrap" width={1} justifyContent="flex-end">
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
      <Button
        mr={1}
        onClick={() => setShowHelpModal(true)}
        bg="c5"
        css={{zIndex: 2}}
      >
        ?
      </Button>
      <ReactModal
        isOpen={showHelpModal}
        onRequestClose={() => setShowHelpModal(false)}
        ariaHideApp={false}
        style={{
          content: {
            width: '700px',
            maxWidth: '70vw',
            height: '270px',
            margin: '0 auto',
            backgroundColor: '#f8f9fa',
          },
          overlay: {zIndex: 3}
        }}
      >
        <Flex width={1} flexWrap="wrap">
          <Flex width={1} justifyContent="space-between">
            <Heading>
              Game Rules And Guidelines
            </Heading>
            <Button bg="c5" onClick={() => setShowHelpModal(false)}>X</Button>
          </Flex>
          <ul>
            {rules.map((item, index) => {
              return (
                <li key={index}>{item}</li>
              )
            })}
          </ul>
        </Flex>
      </ReactModal>
      <Button
        bg="c3"
        onClick={() => setShowClearModal(true)}
      >
        X
      </Button>
      <ReactModal
        isOpen={showClearModal}
        onRequestClose={() => setShowClearModal(false)}
        ariaHideApp={false}
        style={{
          content: {
            width: '600px',
            maxWidth: '70vw',
            height: '110px',
            margin: '0 auto',
            backgroundColor: '#f8f9fa',
          }
        }}
      >
        <Flex width={1} flexWrap="wrap">
          <Flex width={1} justifyContent="flex-end">
            <Button bg="c5" onClick={() => setShowClearModal(false)}>X</Button>
          </Flex>
        </Flex>
        <Heading>
          Are you sure you want to clear current game data?
        </Heading>
        <Button
          mt={1}
          bg="c3"
          onClick={async () => {
            await api.manage('clearGameData', {gameID})
            setShowClearModal(false)
          }}
        >
          Yes, Please Clear
        </Button>
      </ReactModal>
    </Flex>
  )
}

export default PageHeader