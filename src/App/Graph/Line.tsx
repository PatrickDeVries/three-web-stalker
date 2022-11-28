import { extend } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import { BufferGeometry, Color, Vector3 } from 'three'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'

extend({ MeshLine, MeshLineMaterial })

interface Props {
  start: Vector3 //Node
  end: Vector3 // Node
  color: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData?: { [key: string]: any }
}

const Line: React.FC<Props> = ({ start, end, color, userData }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)
  useEffect(() => {
    if (ref.current) {
      const geometry = new BufferGeometry().setFromPoints(
        [start, end].map(point => new Vector3(point.x, point.y, point.z)),
      )
      ref.current.geometry.setGeometry(geometry)
    }
  }, [start, end])

  return (
    <mesh raycast={MeshLineRaycast} ref={ref} userData={userData}>
      <meshLine attach="geometry" />
      <meshLineMaterial
        attach="material"
        color={new Color(color)}
        linecap="round"
        linewidth={0.25}
        transparent
      />
    </mesh>
  )
}

export default Line
