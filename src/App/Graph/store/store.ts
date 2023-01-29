import { proxy } from 'valtio'
import { INITIAL_GRAPH, INITIAL_GRAPH_SIGNAL, INITIAL_INDEXED_URLS, INITIAL_NODE } from './initial'
import { GraphSignalStore, GraphStore, IndexedURLStore, NodeStore } from './types'

export const graphStore = proxy<GraphStore>(INITIAL_GRAPH)

export const activeNodeStore = proxy<NodeStore>(INITIAL_NODE)

export const indexedURLStore = proxy<IndexedURLStore>(INITIAL_INDEXED_URLS)

export const graphUpdateSignal = proxy<GraphSignalStore>(INITIAL_GRAPH_SIGNAL)
