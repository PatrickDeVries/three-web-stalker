export interface Node {
  label: string
  x: number
  y: number
  z: number
  connections: Set<string>
}

export type Graph = Record<string, Node> // URL to node

export enum MeshType {
  Node = 'NODE',
}
