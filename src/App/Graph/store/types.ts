import { Graph } from '../types'

export interface GraphStore {
  graph: Graph
}

export interface NodeStore {
  url: string | null
}
