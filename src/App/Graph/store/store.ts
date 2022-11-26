import { proxy } from 'valtio'
import { INITIAL } from './initial'
import { GraphStore } from './types'

export const store = proxy<GraphStore>(INITIAL)
