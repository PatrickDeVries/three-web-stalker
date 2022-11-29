import { Physics } from '@react-three/cannon'
import { Canvas, extend } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'
import { useSnapshot } from 'valtio'
import Node from './Node'
import { Player, PlayerControls } from './Player/Player'
import { graphStore } from './store/store'
import { Wrapper } from './style'

extend({ PointerLockControls: PointerLockControlsImpl })

interface Props {
  controlsRef: React.RefObject<PlayerControls>
}

const Graph: React.FC<Props> = ({ controlsRef }) => {
  const { graph } = useSnapshot(graphStore)
  const canvasRef = useRef<HTMLDivElement>(null)

  const threeCanvas = useMemo(
    () => (
      <Canvas
        onClick={e => {
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
    ),
    [controlsRef, graph],
  )

  return <Wrapper ref={canvasRef}>{threeCanvas}</Wrapper>
}

export default Graph
