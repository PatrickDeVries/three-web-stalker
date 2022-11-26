import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      secondary: string
      secondary90: string
      secondary80: string
      secondary60: string
      secondary40: string
      secondary20: string
      contrast: string
      error: string
      background: string
      background50: string
      background100: string
    }
  }
}
