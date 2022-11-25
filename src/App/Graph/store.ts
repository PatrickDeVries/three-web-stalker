import { proxy } from 'valtio'
import { GraphStore } from './types'

export const store = proxy<GraphStore>({ graph: {} })
