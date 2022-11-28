import { extend } from '@react-three/fiber'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { useTheme } from 'styled-components'
import { Mesh } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { useSnapshot } from 'valtio'
import fragment from '../../../public/Fragment Mono_Regular.json'
import { NODE_RADIUS } from './constants'
import Line from './Line'
import { graphStore } from './store'
import { MeshType, Node as Node_ } from './types'

extend({ TextGeometry })

interface Props {
  url: string
  node: Node_
}

const Node: React.FC<Props> = ({ url, node }) => {
  const { graph } = useSnapshot(graphStore)
  const theme = useTheme()
  const font = new FontLoader().parse(fragment)
  const label = useRef<Mesh>(null)
  const [labelOffset, setLabelOffset] = useState<number>(0)

  useLayoutEffect(() => {
    if (label.current) {
      label.current.geometry.computeBoundingBox()
      const boundingBox = label.current.geometry.boundingBox
      if (boundingBox) {
        setLabelOffset(-(boundingBox.max.x - boundingBox.min.x) / 2)
      }
    }
  }, [])

  return (
    <>
      <mesh position={[node.x, node.y, node.z]} userData={{ url, type: MeshType.Node }}>
        <sphereGeometry args={[NODE_RADIUS, 15, 15]} />
        <meshStandardMaterial color={theme.color.primary} />
      </mesh>
      <mesh ref={label} position={[node.x + labelOffset, node.y + NODE_RADIUS + 0.5, node.z]}>
        <textGeometry
          args={[
            node.label,
            {
              font,
              size: 1,
              height: 0.25,
              bevelEnabled: true,
              bevelSize: 0.05,
              bevelThickness: 0.05,
            },
          ]}
        />
        <meshLambertMaterial attach="material" color={theme.color.contrast} />
      </mesh>
      {[...node.connections].map(
        connection =>
          graph.hasOwnProperty(connection) && (
            <Line
              key={connection}
              start={graph[connection]}
              end={node}
              color={theme.color.secondary90}
            />
          ),
      )}
    </>
  )
}

export default Node
