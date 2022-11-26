import { createGlobalStyle, css } from 'styled-components'

export const Global = createGlobalStyle`
  ${({ theme }) => css`
    html {
      color: ${theme.color.primary};
      background-color: ${theme.color.background};
    }

    a {
      color: ${theme.color.secondary};
    }
  `}
`
