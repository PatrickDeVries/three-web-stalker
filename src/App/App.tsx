import { useMemo, useState } from 'react'
import { useSnapshot } from 'valtio'
import Button from '../common/Button'
import { URL_TEST_REGEX } from '../common/constants'
import Input from '../common/Input'
import Pills from '../common/Pills'
import { buildGraph } from './Graph'
import Graph from './Graph/Graph'
import { store } from './Graph/store/store'
import { Configuration, Content, List, Main, Section, Wrapper } from './style'

const isURLValid = (value: string): boolean => {
  return URL_TEST_REGEX.test(value)
}

const App: React.FC = () => {
  const [mode, setMode] = useState<'search' | 'url'>('search')
  const [baseSite, setBaseSite] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [maxDepth, setMaxDepth] = useState<string>('1')
  const { graph } = useSnapshot(store)

  const searchUrl = useMemo(
    () => `http://google.com/search?${new URLSearchParams({ q: search })}`,
    [search],
  )

  return (
    <Main>
      <Content>
        <Wrapper>
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
              <a
                href={mode === 'url' ? baseSite ?? '' : searchUrl}
                target="_blank"
                rel="noreferrer"
              >
                {mode === 'url' ? baseSite : searchUrl}
              </a>
            </h3>
          </Section>
          <Button
            onClick={() => {
              store.graph = {}
              buildGraph(mode === 'url' ? baseSite ?? '' : searchUrl, parseInt(maxDepth, 10))
            }}
          >
            BuildGraph
          </Button>
          <Graph rootURL={mode === 'url' ? baseSite ?? '' : searchUrl} />
          <Section>
            <h3>Indexed sites ({Object.keys(graph).length}):</h3>
            <List>
              {Object.keys(graph).map(url => (
                <a key={url} href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              ))}
            </List>
          </Section>
        </Wrapper>
      </Content>
    </Main>
  )
}

export default App
