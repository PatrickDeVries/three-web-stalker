import { useMemo, useState } from 'react'
import Input from '../common/Input'
import Pills from '../common/Pills'
import { Configuration, Main, Section } from './style'

const isURLValid = (value: string): boolean => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value,
  )
}

const App: React.FC = () => {
  const [mode, setMode] = useState<'search' | 'url'>('search')
  const [baseSite, setBaseSite] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [maxDepth, setMaxDepth] = useState<string>('2')

  const searchUrl = useMemo(
    () => `http://google.com/search?${new URLSearchParams({ q: search })}`,
    [search],
  )

  return (
    <Main>
      <h1>Three Web Stalker</h1>
      <Section>
        <h3>Configuration</h3>
        <Configuration>
          <Pills<'search' | 'url'>
            options={[
              { label: 'Search', value: 'search' },
              { label: 'URL', value: 'url' },
            ]}
            value={mode}
            onChange={value => setMode(value)}
            label="Mode"
          />
          {mode === 'search' ? (
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
              value={baseSite ?? ''}
              onChange={e => setBaseSite(e.target.value)}
              error={baseSite !== null && !isURLValid(baseSite) ? 'Invalid URL' : null}
            />
          )}
          <Input
            label="Max tree depth"
            type="number"
            value={maxDepth}
            min={1}
            onChange={e => setMaxDepth(e.target.value)}
          />
        </Configuration>
      </Section>
      <Section>
        <h3>
          Current site:&nbsp;
          <a href={mode === 'url' ? baseSite ?? '' : searchUrl} target="_blank" rel="noreferrer">
            {mode === 'url' ? baseSite : searchUrl}
          </a>
        </h3>
      </Section>
    </Main>
  )
}

export default App
