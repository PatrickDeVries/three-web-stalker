import React, { useMemo } from 'react'
import { useSnapshot } from 'valtio'
import Node from './Node'
import { graphUpdateSignal, indexedURLStore } from './store'

const Nodes: React.FC = () => {
  const { count } = useSnapshot(graphUpdateSignal)

  const nodes = useMemo(
    () =>
      count > 0
        ? indexedURLStore.urls.map((url, i) => <Node key={`node-${url}-${i}`} url={url} />)
        : null,
    [count],
  )

  return <>{nodes}</>
}

export default Nodes
