import { Physics } from '@react-three/cannon'
import { Canvas, extend } from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'
import MaterialProvider from './MaterialProvider'
import Nodes from './Nodes'
import { Player, PlayerControls } from './Player/Player'
import { Wrapper } from './style'

extend({ PointerLockControls: PointerLockControlsImpl })

interface Props {
  controlsRef: React.RefObject<PlayerControls>
}

const Graph: React.FC<Props> = ({ controlsRef }) => {
  const canvasRef = useRef<HTMLDivElement>(null)

  const threeCanvas = useMemo(
    () => (
      <MaterialProvider>
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
          <Nodes />
        </Canvas>
      </MaterialProvider>
    ),
    [controlsRef],
  )

  return <Wrapper ref={canvasRef}>{threeCanvas}</Wrapper>
}

export default Graph
