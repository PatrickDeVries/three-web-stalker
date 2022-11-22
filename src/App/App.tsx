import { useState } from 'react'
import Input from '../common/Input'
import Pills from '../common/Pills'
import { Main } from './style'

const App: React.FC = () => {
  const [mode, setMode] = useState<'google' | 'url'>('google')
  const [baseSite, setBaseSite] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  return (
    <Main>
      <h1>Three Web Stalker</h1>
      <Pills<'google' | 'url'>
        options={[
          { label: 'Search', value: 'google' },
          { label: 'URL', value: 'url' },
        ]}
        value={mode}
        onChange={value => setMode(value)}
      />
      {mode === 'google' ? (
        <Input
          label="Search"
          type="string"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      ) : (
        <Input
          label="Base site"
          type="string"
          value={baseSite}
          onChange={e => setBaseSite(e.target.value)}
        />
      )}
    </Main>
  )
}

export default App
