import {Box} from 'rebass'
import {useTheme} from 'emotion-theming'

export default props => {
  const {colors: {c1, c2, c3, c4, c5}} = useTheme()
  return (
    <Box
      {...props}
      width={1}
      height="100vh"
      css={{
        background: `
          repeating-linear-gradient(
            45deg,
            ${c1} 0%,
            ${c1} 20%,
            ${c2} 20%,
            ${c2} 40%,
            ${c3} 40%,
            ${c3} 60%,
            ${c4} 60%,
            ${c4} 80%,
            ${c5} 80%,
            ${c5} 100%
          )
        `
      }}
    />
  )
}

