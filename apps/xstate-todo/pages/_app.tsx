import React from 'react'

import '../styles/global.css'

interface AppProps {
  Component: React.ComponentType
  pageProps: Record<string, any>
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default App
