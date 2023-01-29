import { extend } from '@react-three/fiber'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Mesh, Vector3 } from 'three'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import fragment from '../../Fragment Mono_Regular.json'
import { NODE_GEOMETRY, NODE_RADIUS } from './constants'
import Line from './Line'
import useMaterial from './MaterialProvider/hooks'
import { graphStore } from './store'
import { MeshType } from './types'

extend({ TextGeometry })

interface Props {
  url: string
}

const Node: React.FC<Props> = ({ url }) => {
  const { nodeMaterial, lineMaterial, textMaterial } = useMaterial()
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

  const node = graphStore.graph[url]
  if (!node) return null

  const connections = [...node.connections]
    .filter(url => graphStore.graph.hasOwnProperty(url))
    .map(connection => ({
      url: connection,
      node: graphStore.graph[connection],
    }))

  return (
    <>
      <mesh
        position={[node.x, node.y, node.z]}
        userData={{ url, connections: node.connections, type: MeshType.Node }}
        geometry={NODE_GEOMETRY}
        material={nodeMaterial.default}
      />
      <mesh
        ref={label}
        position={[node.x + labelOffset, node.y + NODE_RADIUS + 0.5, node.z]}
        userData={{ url, connections: node.connections, type: MeshType.Text }}
        material={textMaterial.default}
      >
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
      </mesh>
      {connections.map((connection, i) => (
        <Line
          key={`${connection.url}-${url}-${i}`}
          start={new Vector3(node.x, node.y, node.z)}
          end={new Vector3(connection.node?.x, connection.node?.y, connection.node?.z)}
          material={lineMaterial.default}
          userData={{ type: MeshType.Connection, from: url, to: connection }}
        />
      ))}
    </>
  )
}

export default Node
