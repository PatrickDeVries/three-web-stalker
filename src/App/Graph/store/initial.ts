import { GraphSignalStore, GraphStore, IndexedURLStore, NodeStore } from './types'

export const INITIAL_GRAPH: GraphStore = { graph: {} }
export const INITIAL_NODE: NodeStore = { url: null }
export const INITIAL_INDEXED_URLS: IndexedURLStore = { urls: [] }
export const INITIAL_GRAPH_SIGNAL: GraphSignalStore = { count: 0 }
