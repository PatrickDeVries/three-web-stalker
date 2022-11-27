import { Physics } from '@react-three/cannon'
import { Canvas, extend } from '@react-three/fiber'
import React, { useRef } from 'react'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'
import { useSnapshot } from 'valtio'
import Button from '../../common/Button'
import Node from './Node'
import { Player, PlayerControls } from './Player/Player'
import { store } from './store/store'
import { Wrapper } from './style'

extend({ PointerLockControls: PointerLockControlsImpl })

interface Props {
  rootURL: string
}

const Graph: React.FC<Props> = ({ rootURL }) => {
  const { graph } = useSnapshot(store)
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
        <Canvas
          onClick={() => {
            controlsRef.current?.lockCursor()
            controlsRef.current?.onClick()
          }}
        >
          <ambientLight intensity={0.25} />
          <directionalLight position={[-3, 5, 8]} />
          <Physics>
            <Player ref={controlsRef} />
          </Physics>
          {Object.entries(graph).map(([url, node]) => (
            <Node key={url} url={url} node={node} />
          ))}
        </Canvas>
      </Wrapper>
    </>
  )
}

export default Graph
