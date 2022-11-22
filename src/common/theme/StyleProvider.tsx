import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Global } from './style'
import theme from './theme'
interface Props {
  children: React.ReactNode
}

const StyleProvider: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Global />
      {children}
    </ThemeProvider>
  )
}

export default StyleProvider
