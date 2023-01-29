import React from 'react'
import { useSnapshot } from 'valtio'
import Accordion from '../../common/Accordion'
import { graphStore } from '../Graph/store'
import { Section } from '../style'
import { List } from './style'

const SiteList: React.FC = () => {
  const { graph } = useSnapshot(graphStore)

  const keyCount = Object.keys(graph).length

  return (
    <Section>
      <h3>Indexed Sites ({keyCount})</h3>
      <Accordion>
        <List>
          {Object.keys(graph)
            .map(url => url.replace('www.', ''))
            .sort((a, b) => (a > b ? 1 : -1))
            .map((url, i) => (
              <a key={`url-${url}-${i}`} href={url} target="_blank" rel="noreferrer">
                {url}
              </a>
            ))}
          {!keyCount && <h4>No sites indexed yet, hit Build Graph to start indexing</h4>}
        </List>
      </Accordion>
    </Section>
  )
}

export default SiteList
