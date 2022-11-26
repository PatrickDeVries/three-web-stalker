import { Physics } from '@react-three/cannon'
import { Canvas, extend } from '@react-three/fiber'
import React, { Fragment, useRef } from 'react'
import { useTheme } from 'styled-components'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'
import { useSnapshot } from 'valtio'
import Button from '../../common/Button'
import { NODE_RADIUS } from './constants'
import Line from './Line'
import { Player, PlayerControls } from './Player/Player'
import { store } from './store/store'
import { Wrapper } from './style'

extend({ PointerLockControls: PointerLockControlsImpl })

interface Props {
  rootURL: string
}

const Graph: React.FC<Props> = ({ rootURL }) => {
  const { graph } = useSnapshot(store)
  const theme = useTheme()
  const canvasRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<PlayerControls>(null)

  return (
    <>
      <Button
        onClick={() => {
          controlsRef.current?.resetCamera()
          controlsRef.current?.lockCursor()
        }}
      >
        Reset Position
      </Button>
      <Wrapper ref={canvasRef}>
        <Canvas onClick={() => controlsRef.current?.lockCursor()}>
          <ambientLight intensity={0.25} />
          <directionalLight position={[-3, 5, 8]} />
          <Physics>
            <Player ref={controlsRef} />
          </Physics>
          {Object.entries(graph).map(([url, node]) => (
            <Fragment key={url}>
              <mesh position={[node.x, node.y, node.z]}>
                <sphereGeometry args={[NODE_RADIUS, 15, 15]} />
                <meshStandardMaterial color={theme.color.primary} />
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
    </>
  )
}

export default Graph
