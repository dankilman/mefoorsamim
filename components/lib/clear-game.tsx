import ReactModal from 'react-modal'
import {Button, Flex} from 'rebass'
import Heading from './heading'
import api from '../../lib/api-client'

interface ClearGameProps {
  gameID: string
  showClearModal: boolean
  setShowClearModal: any
}

function ClearGame(props: ClearGameProps) {
  const {gameID, showClearModal, setShowClearModal} = props
  return (
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
        },
        overlay: {zIndex: 3}
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
  )
  
}

export default ClearGame
