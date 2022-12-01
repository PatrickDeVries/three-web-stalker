import { extend } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import { BufferGeometry, Color, Vector3 } from 'three'
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline'

extend({ MeshLine, MeshLineMaterial })

const isColor = (object: Object): object is Color =>
  object.hasOwnProperty('r') && object.hasOwnProperty('g') && object.hasOwnProperty('b')

interface Props {
  start: Vector3 //Node
  end: Vector3 // Node
  material: Color | typeof MeshLineMaterial
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData?: { [key: string]: any }
}

const Line: React.FC<Props> = ({ start, end, userData, material }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null)

  const lineMaterial = useMemo(
    () =>
      isColor(material)
        ? new MeshLineMaterial({
            color: material,
            lineWidth: 0.5,
          })
        : material,
    [material],
  )

  useEffect(() => {
    if (ref.current) {
      const geometry = new BufferGeometry().setFromPoints(
        [start, end].map(point => new Vector3(point.x, point.y, point.z)),
      )
      ref.current.geometry.setGeometry(geometry)
    }
  }, [start, end])

  return (
    <mesh ref={ref} userData={userData} raycast={MeshLineRaycast} material={lineMaterial}>
      <meshLine attach="geometry" />
    </mesh>
  )
}

export default Line
