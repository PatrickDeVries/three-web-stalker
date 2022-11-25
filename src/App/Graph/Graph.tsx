import { Canvas } from '@react-three/fiber'
import React, { Fragment } from 'react'
import { useTheme } from 'styled-components'
import { useSnapshot } from 'valtio'
import { NODE_RADIUS } from './constants'
import Line from './Line'
import { store } from './store'
import { Wrapper } from './style'

interface Props {
  rootURL: string
}

const Graph: React.FC<Props> = ({ rootURL }) => {
  const { graph } = useSnapshot(store)
  const theme = useTheme()

  return (
    <Wrapper>
      <Canvas>
        <color attach="background" args={[theme.color.backgroundHighlight]} />

        <ambientLight intensity={0.1} />
        <directionalLight position={[-5, 5, 5]} />
        {Object.entries(graph).map(([url, node]) => (
          <Fragment key={url}>
            <mesh position={[node.x, node.y, node.z]}>
              <sphereGeometry args={[NODE_RADIUS, 15, 15]} />
              <meshStandardMaterial color={theme.color.text} />
            </mesh>
            {[...node.connections].map(
              connection =>
                graph.hasOwnProperty(connection) && (
                  <Line key={connection} start={graph[connection]} end={node} />
                ),
            )}
          </Fragment>
        ))}
      </Canvas>
    </Wrapper>
  )
}

export default Graph
