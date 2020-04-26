import {Box} from 'rebass'
import {useTheme} from 'emotion-theming'

export default props => {
  const {colors: {c1, c2, c3, c4, c5}} = useTheme()
  const increment = 300
  return (
    <Box
      {...props}
      width={1}
      minHeight="100vh"
      css={{
        background: `
          repeating-linear-gradient(
            45deg,
            ${c1} 0,
            ${c1} ${increment}px,
            ${c2} ${increment}px,
            ${c2} ${increment * 2}px,
            ${c3} ${increment * 2}px,
            ${c3} ${increment * 3}px,
            ${c4} ${increment * 3}px,
            ${c4} ${increment * 4}px,
            ${c5} ${increment * 4}px,
            ${c5} ${increment * 5}px
          )
        `
      }}
    />
  )
}

