import { Graph } from '../types'

export interface GraphStore {
  graph: Graph
}

export interface NodeStore {
  url: string | null
}

export interface IndexedURLStore {
  urls: string[]
}

export interface GraphSignalStore {
  count: number
}
