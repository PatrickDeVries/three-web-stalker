import { useContext } from 'react'
import { MeshLambertMaterial, MeshStandardMaterial } from 'three'
import { MeshLineMaterial } from 'three.meshline'
import { MaterialContext } from './context'
import { MaterialContextType } from './types'

const INITIAL_MATERIAL_CONTEXT: MaterialContextType = {
  nodeMaterial: {
    default: new MeshStandardMaterial(),
    active: new MeshStandardMaterial(),
    inactive: new MeshStandardMaterial(),
    inActiveTree: new MeshStandardMaterial(),
  },
  textMaterial: {
    default: new MeshLambertMaterial(),
    active: new MeshLambertMaterial(),
    inactive: new MeshLambertMaterial(),
    inActiveTree: new MeshLambertMaterial(),
  },
  lineMaterial: {
    default: new MeshLineMaterial(),
    active: new MeshLineMaterial(),
    inactive: new MeshLineMaterial(),
    inActiveTree: new MeshLineMaterial(),
  },
}

const useMaterial = (): MaterialContextType =>
  useContext(MaterialContext) ?? INITIAL_MATERIAL_CONTEXT

export default useMaterial
