import {now} from '../../lib/time'
import {Text} from 'rebass'
import CountdownComponent from 'react-countdown'

interface CountdownContext {
  end?: number
  left?: number
}

interface CountdownProps {
  context: CountdownContext
  defaultValue: string
  onComplete?: any
  textFn: any
}

function Countdown(props: CountdownProps) {
  const {context: {end, left}, defaultValue, onComplete, textFn} = props
  // when countdown is controlled, value is time left
  const value = end || left
  if (value) {
    return (
      <CountdownComponent
        date={value}
        now={now}
        onComplete={onComplete}
        controlled={!!left}
        daysInHours={true}
        renderer={data => <Text>{textFn(data)}</Text>}
      />
    )
  } else {
    return <Text>{defaultValue}</Text>
  }
}

export default Countdown