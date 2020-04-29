import {Button, Flex} from 'rebass'
import {useState} from 'react'
import RulesAndGuideLines from './rules-and-guidelines'
import ClearGame from './clear-game'
import CurrentPlayerStatus from './current-player-status'

interface PageHeaderProps {
  gameState: any
  gameID: string
  playerName: string
}

function PageHeader(props: PageHeaderProps) {
  const {gameState, gameID, playerName} = props
  const [showHelpModal, setShowHelpModal] = useState(false)
  const [showClearModal, setShowClearModal] = useState(false)

  return (
    <Flex flexWrap="wrap" width={1} justifyContent="flex-end">
      <CurrentPlayerStatus gameState={gameState} playerName={playerName} />
      <Button
        mr={1}
        onClick={() => setShowHelpModal(true)}
        bg="c5"
        css={{zIndex: 2}}
      >
        ?
      </Button>
      <RulesAndGuideLines showHelpModal={showHelpModal} setShowHelpModal={setShowHelpModal} />
      <Button
        bg="c3"
        onClick={() => setShowClearModal(true)}
      >
        X
      </Button>
      <ClearGame gameID={gameID} showClearModal={showClearModal} setShowClearModal={setShowClearModal} />
    </Flex>
  )
}

export default PageHeader