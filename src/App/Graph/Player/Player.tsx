import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { BufferGeometry, Mesh, Vector3 } from 'three'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'
import { MOVE_SPEED } from '../constants'
import { useMovement } from './useMovement'

export interface PlayerControls {
  resetCamera: () => void
  lockCursor: () => void
}

export const Player = React.forwardRef((_, ref) => {
  const { camera, gl } = useThree()
  const cursorControls = useRef<PointerLockControlsImpl>(null)

  const { forward, backward, left, right, up, down } = useMovement()

  const [needsReset, setNeedsReset] = useState<boolean>(false)

  const [playerRef, api] = useSphere(() => ({
    mass: 0,
    type: 'Dynamic',
    position: [0, 0, 20],
  }))

  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    return api.velocity.subscribe(v => (velocity.current = v))
  }, [api.velocity])

  useFrame(() => {
    if (playerRef.current) {
      camera.position.copy(playerRef.current.position)

      let direction = new Vector3(0, 0, 0)
      if (needsReset) {
        if (playerRef.current.position.distanceTo(new Vector3(0, 0, 20)) < 1) {
          setNeedsReset(() => false)
        } else {
          camera.rotation.set(0, 0, 0)
          direction
            .subVectors(new Vector3(0, 0, 20), playerRef.current.position)
            .applyEuler(camera.rotation)
        }
      } else {
        let frontVector = new Vector3(0, 0, 0)
        let sideVector = new Vector3(0, 0, 0)

        frontVector.set(0, 0, Number(backward) - Number(forward))
        sideVector.set(Number(left) - Number(right), Number(down) - Number(up), 0)
        direction
          .subVectors(frontVector, sideVector)
          .normalize()
          .multiplyScalar(MOVE_SPEED)
          .applyEuler(camera.rotation)
      }
      api.velocity.set(direction.x, direction.y, direction.z)

      // Calculating front/side movement
      playerRef.current.getWorldPosition(playerRef.current.position)
    }
  })

  useImperativeHandle(ref, () => ({
    resetCamera: () => {
      setNeedsReset(() => true)
    },
    lockCursor: () => {
      if (cursorControls.current) {
        cursorControls.current.lock()
      }
    },
  }))

  return (
    <>
      <pointerLockControls ref={cursorControls} args={[camera, gl.domElement]} />
      <mesh ref={playerRef as React.RefObject<Mesh<BufferGeometry>>} />
    </>
  )
})
