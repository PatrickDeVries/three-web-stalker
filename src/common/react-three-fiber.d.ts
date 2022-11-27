import { MeshLine, MeshLineMaterial } from 'three.meshline'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

extend({ PointerLockControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLine: ReactThreeFiber.Object3DNode<MeshLine, typeof MeshLine>
      meshLineMaterial: ReactThreeFiber.Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>
      pointerLockControls: ReactThreeFiber.Object3DNode<
        PointerLockControls,
        typeof PointerLockControls
      >
      textGeometry: ReactThreeFiber.Object3DNode<TextGeometry, typeof TextGeometry>
    }
  }
}
