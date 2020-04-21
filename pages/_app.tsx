import { CookiesProvider } from 'react-cookie'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'
theme.colors = Object.assign({
  c1: '#ffc857' ,
  c2: '#e9724c',
  c3: '#c5283d',
  c4: '#481d24',
  c5: '#255f85',
  g1: '#666666',
}, theme.colors)

import '../css/global.css'
import Stripes from '../components/lib/stripes'

export default ({ Component, pageProps }) => {
  return (
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <Stripes>
          <Component {...pageProps} />
        </Stripes>
      </ThemeProvider>
    </CookiesProvider>
  )
}