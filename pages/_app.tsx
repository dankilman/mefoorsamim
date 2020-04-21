import { CookiesProvider } from 'react-cookie'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
theme.colors = Object.assign({
  c1: '#ffc857' ,
  c2: '#e9724c',
  c3: '#c5283d',
  c4: '#481d24',
  c5: '#255f85',
}, theme.colors)

import '../css/global.css'

export default ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CookiesProvider>
  )
}