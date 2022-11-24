import { proxy } from 'valtio'
import { Graph } from './types'

export const graph = proxy<Graph>({})
