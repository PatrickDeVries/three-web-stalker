import { useMemo, useState } from 'react'
import { useSnapshot } from 'valtio'
import Button from '../common/Button'
import { URL_TEST_REGEX } from '../common/constants'
import Input from '../common/Input'
import Pills from '../common/Pills'
import { buildGraph } from './Graph'
import { graph } from './Graph/store'
import { Configuration, Content, Main, Section, Wrapper } from './style'

const isURLValid = (value: string): boolean => {
  return URL_TEST_REGEX.test(value)
}

const App: React.FC = () => {
  const [mode, setMode] = useState<'search' | 'url'>('search')
  const [baseSite, setBaseSite] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [maxDepth, setMaxDepth] = useState<string>('2')
  const graphSnap = useSnapshot(graph)

  const searchUrl = useMemo(
    () => `http://google.com/search?${new URLSearchParams({ q: search })}`,
    [search],
  )

  console.log('current graph', graphSnap)

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
            onClick={() =>
              buildGraph(mode === 'url' ? baseSite ?? '' : searchUrl, parseInt(maxDepth, 10))
            }
          >
            Get it
          </Button>
          <p>{Object.keys(graphSnap).join(' | ')}</p>
        </Wrapper>
      </Content>
    </Main>
  )
}

export default App
