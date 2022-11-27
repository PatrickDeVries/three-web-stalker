import { Graph } from '../types'

export interface GraphStore {
  graph: Graph
  active: string | null
}
