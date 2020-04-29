import ReactModal from 'react-modal'
import {Button, Flex} from 'rebass'
import Heading from './heading'

const rules = [
  'Must be a real/fictive character: Not an object, a band name or a tv show for example.',
  'Reasonably known: Character needs to be reasonably known within the group of people playing the game.',
  'Shbira rule: If "Bira" is the current name, you can\'t say "Sounds like shbira".',
  'AB rule: Cannot iterate letters until reaching the correct letter.',
  'Buzzer rule: If a correct name was guessed right as the turn ends, it is a valid win.',
  'Google rule: Do not google names, as tempting as it may be.',
]

interface RulesAndGuidelinesProps {
  showHelpModal: boolean
  setShowHelpModal: any
}

function RulesAndGuideLines(props: RulesAndGuidelinesProps) {
  const {showHelpModal, setShowHelpModal} = props
  return (
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
  ) 
}

export default RulesAndGuideLines
