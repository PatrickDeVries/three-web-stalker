import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      primary: string
      primary90: string
      primary80: string
      primary60: string
      primary40: string
      primary20: string
      secondary: string
      secondary90: string
      secondary80: string
      secondary60: string
      secondary40: string
      secondary20: string
      contrast: string
      contrast90: string
      contrast80: string
      contrast60: string
      contrast40: string
      contrast20: string
      error: string
      background: string
      background50: string
      background100: string
    }
  }
}
