import { useSphere } from '@react-three/cannon'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import {
  BufferGeometry,
  Color,
  Group,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three'
import { MeshLine, MeshLineMaterial } from 'three.meshline'
import { PointerLockControls as PointerLockControlsImpl } from 'three/examples/jsm/controls/PointerLockControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { MOVE_SPEED } from '../constants'
import useMaterial from '../MaterialProvider/hooks'
import { activeNodeStore, graphStore } from '../store'
import { MeshType } from '../types'
import { useMovement } from './useMovement'

export interface PlayerControls {
  resetCamera: () => void
  lockCursor: () => void
  onClick: () => void
}

export const Player = React.forwardRef((_, ref) => {
  const theme = useTheme()
  const { nodeMaterial, lineMaterial, textMaterial } = useMaterial()

  const { camera, gl, raycaster, scene } = useThree()

  const cursorControls = useRef<PointerLockControlsImpl>(null)
  const { forward, backward, left, right, up, down, sprint } = useMovement()
  const [needsReset, setNeedsReset] = useState<boolean>(false)

  const reticle = useRef<Mesh<BufferGeometry>>(null)
  const lines = useRef<Group>(null)
  const [playerRef, api] = useSphere(() => ({
    mass: 0,
    type: 'Dynamic',
    position: [0, 0, 50],
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
      if (lines.current) {
        lines.current.position.set(...vector.toArray())
        lines.current.lookAt(camera.position)
      }

      let direction = new Vector3(0, 0, 0)
      if (needsReset) {
        // Move player back to roughly the starting point
        if (playerRef.current.position.distanceTo(new Vector3(0, 0, 50)) < 1) {
          setNeedsReset(() => false)
        } else {
          camera.lookAt(new Vector3(0, 0, 0))
          direction
            .subVectors(new Vector3(0, 0, 50), playerRef.current.position)
            .applyEuler(camera.rotation)
        }
      } else {
        // Calculating front/side movement
        let frontVector = new Vector3(0, 0, 0)
        let sideVector = new Vector3(0, 0, 0)

        frontVector.set(0, 0, Number(backward) - Number(forward))
        sideVector.set(Number(left) - Number(right), Number(down) - Number(up), 0)
        direction
          .subVectors(frontVector, sideVector)
          .normalize()
          .multiplyScalar(MOVE_SPEED * (sprint ? 2 : 1))
          .applyEuler(camera.rotation)
      }
      api.velocity.set(direction.x, direction.y, direction.z)

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
        const clickedURL = nodes[0].object.userData.url
        activeNodeStore.url = clickedURL

        const connectedURLs = new Set<string>([
          ...(graphStore.graph[clickedURL]?.connections ?? []),
        ])
        let parentURL: string | null = graphStore.graph[clickedURL]?.parent ?? null
        while (parentURL !== null) {
          connectedURLs.add(parentURL)
          parentURL = graphStore.graph[parentURL]?.parent ?? null
        }

        scene.children.forEach(child => {
          // handle node selection
          if (child.userData.type === MeshType.Node) {
            const nodeChild = child as Mesh<SphereGeometry, MeshStandardMaterial>
            if (nodeChild.userData.url === clickedURL) {
              nodeChild.material = nodeMaterial.active
            } else if (connectedURLs.has(nodeChild.userData.url)) {
              nodeChild.material = nodeMaterial.inActiveTree
            } else {
              nodeChild.material = nodeMaterial.inactive
            }
          } // handle text selection
          else if (child.userData.type === MeshType.Text) {
            const nodeChild = child as Mesh<TextGeometry, MeshLambertMaterial>
            if (nodeChild.userData.url === clickedURL) {
              nodeChild.material = textMaterial.active
            } else if (connectedURLs.has(nodeChild.userData.url)) {
              nodeChild.material = textMaterial.inActiveTree
            } else {
              nodeChild.material = textMaterial.inactive
            }
          }
          // handle connection selection
          else if (child.userData.type === MeshType.Connection) {
            const lineChild = child as Mesh<typeof MeshLine, typeof MeshLineMaterial>
            if (
              lineChild.userData.from === clickedURL ||
              (connectedURLs.has(lineChild.userData.from) &&
                (connectedURLs.has(lineChild.userData.to.url) ||
                  lineChild.userData.to.url === clickedURL))
            ) {
              lineChild.material = lineMaterial.active
            } else {
              lineChild.material = lineMaterial.inactive
            }
          }
        })
      } else {
        activeNodeStore.url = null
        scene.children.forEach(child => {
          // handle node selection
          if (child.userData.type === MeshType.Node) {
            ;(child as Mesh<SphereGeometry, MeshStandardMaterial>).material = nodeMaterial.default
          } // handle text selection
          else if (child.userData.type === MeshType.Text) {
            ;(child as Mesh<TextGeometry, MeshLambertMaterial>).material = textMaterial.default
          }
          // handle connection selection
          else if (child.userData.type === MeshType.Connection) {
            ;(child as Mesh<typeof MeshLine, typeof MeshLineMaterial>).material =
              lineMaterial.default
          }
        })
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
      <group ref={lines}>
        <mesh position={new Vector3(0.003, 0, 0)}>
          <boxGeometry args={[0.002, 0.0005, 0.0005]} />
          <meshBasicMaterial color={new Color(theme.color.primary80)} transparent opacity={0.9} />
        </mesh>
        <mesh position={new Vector3(-0.003, 0, 0)}>
          <boxGeometry args={[0.002, 0.0005, 0.0005]} />
          <meshBasicMaterial color={new Color(theme.color.primary80)} transparent opacity={0.9} />
        </mesh>
        <mesh position={new Vector3(0, 0.003, 0)}>
          <boxGeometry args={[0.0005, 0.002, 0.0005]} />
          <meshBasicMaterial color={new Color(theme.color.primary80)} transparent opacity={0.9} />
        </mesh>
        <mesh position={new Vector3(0, -0.003, 0)}>
          <boxGeometry args={[0.0005, 0.002, 0.0005]} />
          <meshBasicMaterial color={new Color(theme.color.primary80)} transparent opacity={0.9} />
        </mesh>
      </group>
    </>
  )
})
