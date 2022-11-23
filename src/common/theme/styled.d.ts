import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      text: string
      focus: string
      background: string
      error: string
    }
  }
}
