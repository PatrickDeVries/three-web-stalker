import { extend } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { useTheme } from 'styled-components'
import { BufferGeometry, Color, Vector3 } from 'three'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'
import { Node } from './types'

extend({ MeshLine, MeshLineMaterial })

interface Props {
  start: Node
  end: Node
}

const Line: React.FC<Props> = ({ start, end }) => {
  const theme = useTheme()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  useEffect(() => {
    if (ref.current) {
      const geometry = new BufferGeometry().setFromPoints(
        [start, end].map(point => new Vector3(point.x, point.y, point.z)),
      )
      ref.current.geometry.setGeometry(geometry)
      console.log(ref.current.material)
    }
  }, [start, end])

  return (
    <mesh raycast={MeshLineRaycast} ref={ref}>
      <meshLine attach="geometry" />
      <meshLineMaterial
        attach="material"
        color={new Color(theme.color.focus)}
        // linecap="round"
        linewidth={1}
        // transparent
        opacity={0.5}
        sizeAttenuation
        // depthTest={false}
      />
    </mesh>
  )
}

export default Line
