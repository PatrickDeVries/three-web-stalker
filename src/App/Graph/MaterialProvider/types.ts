import { MeshLambertMaterial, MeshStandardMaterial } from 'three'
import { MeshLineMaterial } from 'three.meshline'

export interface MaterialContextType {
  nodeMaterial: {
    default: MeshStandardMaterial
    active: MeshStandardMaterial
    inActiveTree: MeshStandardMaterial
    inactive: MeshStandardMaterial
  }
  textMaterial: {
    default: MeshLambertMaterial
    active: MeshLambertMaterial
    inActiveTree: MeshLambertMaterial
    inactive: MeshLambertMaterial
  }
  lineMaterial: {
    default: typeof MeshLineMaterial
    active: typeof MeshLineMaterial
    inActiveTree: typeof MeshLineMaterial
    inactive: typeof MeshLineMaterial
  }
}
