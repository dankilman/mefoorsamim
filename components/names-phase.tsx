import {State} from '../lib/game'
import {useState} from 'react'
import {Input} from '@rebass/forms'
import {Button, Flex} from 'rebass'
import Message from './lib/message'

interface NamingPhaseProps {
  G: State
  isActive: boolean
  chooseNames: any
}

function NamingPhase(props: NamingPhaseProps) {
  const {G, isActive, chooseNames} = props
  const numberOfNames = G.numNamesPerPlayer
  const [currentNames, setCurrentNames] = useState(new Array(numberOfNames))
  const inputs = []
  for (let i = 0; i < numberOfNames; i++) {
    inputs.push(
      <Input
        key={i}
        mt={1}
        flex='0 0 49.7%'
        value={currentNames[i]}
        onInput={(e) => {
          const newCurrentNames = currentNames.slice()
          newCurrentNames[i] = e.currentTarget.value
          setCurrentNames(newCurrentNames)
        }}
        disabled={!isActive}
      />
    )
  }
  const numFilledNames = currentNames.filter(v => !!(v.trim())).length
  const done = numFilledNames === numberOfNames
  let heading
  if (!isActive) {
    heading = 'Now we wait for the other players to finish writing their names'
  } else if (done) {
    heading = 'Great! Click submit or change the names some more'
  } else {
    heading = `Write ${numberOfNames} names. You have ${numberOfNames - numFilledNames} left`
  }
  const disabled = !done || !isActive
  return (
    <Flex width={1} flexWrap="wrap">
      <Message m={10}>{heading}</Message>
      <Flex width={1} flexWrap="wrap" justifyContent="space-between">
        {inputs}
      </Flex>
      <Button
        mt={1}
        bg={disabled ? 'g1' : 'green'}
        onClick={() => {
          chooseNames(currentNames.map(v => v.trim()))
        }}
        disabled={disabled}
      >
        Submit
      </Button>
    </Flex>
  )
}

export default NamingPhase
