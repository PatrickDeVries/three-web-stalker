import React from 'react'
import { useSnapshot } from 'valtio'
import Node from './Node'
import { graphStore } from './store'

const Nodes: React.FC = () => {
  const { graph } = useSnapshot(graphStore)

  // TODO: pass in connection locations from here so graphStore is not used in the Node
  // TODO: add nodes to scene dynamically when new, rathe than re-rendering the full list each time one is added
  return (
    <>
      {Object.entries(graph).map(([url, node]) => (
        <Node key={url} url={url} node={node} />
      ))}
    </>
  )
}

export default Nodes
