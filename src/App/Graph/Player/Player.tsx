import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import {
  BufferGeometry,
  Color,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'
import { MOVE_SPEED } from '../constants'
import { activeNodeStore } from '../store'
import { MeshType } from '../types'
import { useMovement } from './useMovement'

export interface PlayerControls {
  resetCamera: () => void
  lockCursor: () => void
  onClick: () => void
}

export const Player = React.forwardRef((_, ref) => {
  const theme = useTheme()
  const { camera, gl, raycaster, scene } = useThree()

  const cursorControls = useRef<PointerLockControlsImpl>(null)
  const { forward, backward, left, right, up, down } = useMovement()
  const [needsReset, setNeedsReset] = useState<boolean>(false)

  const reticle = useRef<Mesh<BufferGeometry>>(null)
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

      // place reticle
      const vector = new Vector3(0, 0, -0.8).unproject(camera)
      if (reticle.current) {
        reticle.current.position.set(...vector.toArray())
      }

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
    onClick: () => {
      raycaster.setFromCamera(new Vector2(), camera)
      const nodes = raycaster
        .intersectObjects(scene.children)
        .filter(mesh => mesh.object.userData.type === MeshType.Node)

      if (nodes.length && activeNodeStore.url !== nodes[0].object.userData.url) {
        activeNodeStore.url = nodes[0].object.userData.url

        scene.children.forEach(child => {
          if (child.userData.type === MeshType.Node) {
            if (child.userData.url !== nodes[0].object.userData.url) {
              ;(child as Mesh<SphereGeometry, MeshStandardMaterial>).material.color = new Color(
                theme.color.primary,
              )
            } else {
              ;(child as Mesh<SphereGeometry, MeshStandardMaterial>).material.color = new Color(
                theme.color.contrast,
              )
            }
          }
        })
      } else if (activeNodeStore.url) {
        activeNodeStore.url = null
      }
    },
  }))

  return (
    <>
      <pointerLockControls ref={cursorControls} args={[camera, gl.domElement]} />
      <mesh ref={playerRef as React.RefObject<Mesh<BufferGeometry>>} />
      <mesh ref={reticle}>
        <sphereGeometry args={[0.0005, 64, 32]} />
        <meshBasicMaterial color={new Color(theme.color.contrast)} />
      </mesh>
    </>
  )
})
