import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import './common/theme/global.css'
import StyleProvider from './common/theme/StyleProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StyleProvider>
      <App />
    </StyleProvider>
  </React.StrictMode>,
)
