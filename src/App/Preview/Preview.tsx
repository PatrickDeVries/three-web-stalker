import React from 'react'
import { useSnapshot } from 'valtio'
import Accordion from '../../common/Accordion'
import { activeNodeStore } from '../Graph/store'
import { Section } from '../style'
import { EmptyMessage, Wrapper } from './style'

const Preview: React.FC = () => {
  const { url } = useSnapshot(activeNodeStore)
  return (
    <Section>
      <h3>Preview of Selected</h3>

      <Accordion>
        {url ? (
          <Wrapper src={url} title="Preview" />
        ) : (
          <EmptyMessage>No node selected</EmptyMessage>
        )}
      </Accordion>
    </Section>
  )
}

export default Preview
