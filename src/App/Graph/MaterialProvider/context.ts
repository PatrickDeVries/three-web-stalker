import { createContext } from 'react'
import { MaterialContextType } from './types'

export const MaterialContext = createContext<MaterialContextType | null>(null)
