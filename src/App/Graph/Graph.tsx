import { Physics } from '@react-three/cannon'
import { Canvas, extend } from '@react-three/fiber'
import React, { useRef } from 'react'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'
import { useSnapshot } from 'valtio'
import Button from '../../common/Button'
import Node from './Node'
import { Player, PlayerControls } from './Player/Player'
import { graphStore } from './store/store'
import { Buttons, Wrapper } from './style'
import { buildGraph } from './utils'

extend({ PointerLockControls: PointerLockControlsImpl })

interface Props {
  baseURL: string
  maxDepth: number
}

const Graph: React.FC<Props> = ({ baseURL, maxDepth }) => {
  const { graph } = useSnapshot(graphStore)
  const canvasRef = useRef<HTMLDivElement>(null)
  const controlsRef = useRef<PlayerControls>(null)

  return (
    <>
      <Buttons>
        <Button
          onClick={() => {
            graphStore.graph = {}
            buildGraph(baseURL, maxDepth)
            controlsRef.current?.resetCamera()
          }}
        >
          Build Graph
        </Button>
        <Button
          onClick={() => {
            controlsRef.current?.resetCamera()
            controlsRef.current?.lockCursor()
          }}
        >
          Reset Position
        </Button>
      </Buttons>
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
