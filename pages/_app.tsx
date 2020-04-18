import { CookiesProvider } from 'react-cookie'
import { ThemeProvider } from 'emotion-theming'
import theme from '@rebass/preset'

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