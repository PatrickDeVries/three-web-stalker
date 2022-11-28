import { proxy } from 'valtio'
import { INITIAL_GRAPH, INITIAL_NODE } from './initial'
import { GraphStore, NodeStore } from './types'

export const graphStore = proxy<GraphStore>(INITIAL_GRAPH)

export const activeNodeStore = proxy<NodeStore>(INITIAL_NODE)
