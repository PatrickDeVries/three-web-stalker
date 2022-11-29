import { useMemo, useRef, useState } from 'react'
import { useSnapshot } from 'valtio'
import Button from '../common/Button'
import { URL_TEST_REGEX } from '../common/constants'
import Input from '../common/Input'
import Pills from '../common/Pills'
import { buildGraph } from './Graph'
import Graph from './Graph/Graph'
import { PlayerControls } from './Graph/Player'
import { activeNodeStore, graphStore } from './Graph/store/store'
import {
  Configuration,
  Content,
  GraphButtons,
  List,
  Main,
  Section,
  SiteHeading,
  Wrapper,
} from './style'

const isURLValid = (value: string): boolean => {
  return URL_TEST_REGEX.test(value)
}

const App: React.FC = () => {
  const [mode, setMode] = useState<'search' | 'url'>('search')
  const [baseSite, setBaseSite] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [maxDepth, setMaxDepth] = useState<string>('1')

  const controlsRef = useRef<PlayerControls>(null)

  const { graph } = useSnapshot(graphStore)
  const { url } = useSnapshot(activeNodeStore)

  const searchUrl = useMemo(
    () => `http://google.com/search?${new URLSearchParams({ q: search })}`,
    [search],
  )

  const graphComponent = useMemo(
    () => (
      <Graph
        baseURL={mode === 'url' ? baseSite ?? '' : searchUrl}
        maxDepth={parseInt(maxDepth, 10)}
        controlsRef={controlsRef}
      />
    ),
    [baseSite, maxDepth, mode, searchUrl],
  )

  return (
    <Main>
      <Content>
        <Wrapper>
          <h1>Three Web Stalker</h1>
          <Section>
            <h3>Initial Setup</h3>
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
            <SiteHeading>
              <h3>Current Root:</h3>
              <a
                href={mode === 'url' ? baseSite ?? '' : searchUrl}
                target="_blank"
                rel="noreferrer"
              >
                {mode === 'url' ? baseSite : searchUrl}
              </a>
            </SiteHeading>

            <SiteHeading>
              <h3>Selected Site:&nbsp;</h3>
              {url && (
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              )}
            </SiteHeading>

            <GraphButtons>
              <Button
                onClick={() => {
                  graphStore.graph = {}
                  buildGraph(mode === 'url' ? baseSite ?? '' : searchUrl, parseInt(maxDepth))
                  // controlsRef.current?.resetCamera()
                }}
              >
                Build Graph
              </Button>
              <Button
                disabled={!url}
                onClick={() => {
                  setMode('url')
                  setBaseSite(url)
                }}
              >
                Set Selected as Root
              </Button>
              <Button
                onClick={() => {
                  controlsRef.current?.resetCamera()
                  controlsRef.current?.lockCursor()
                }}
              >
                Reset Position
              </Button>
            </GraphButtons>

            {graphComponent}
          </Section>

          <Section>
            <h3>Indexed Sites ({Object.keys(graph).length}):</h3>
            <List>
              {Object.keys(graph)
                .map(url => url.replace('www.', ''))
                .sort((a, b) => (a > b ? 1 : -1))
                .map(url => (
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
