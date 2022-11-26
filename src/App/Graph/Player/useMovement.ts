import { useEffect, useState } from 'react'

type Movement = 'forward' | 'backward' | 'left' | 'right' | 'up' | 'down'
const USED_KEYS = ['KeyW', 'KeyS', 'KeyA', 'KeyD', 'Space', 'ShiftLeft'] as const
type KeyboardCode = typeof USED_KEYS[number]

const isKeyCodeUsed = (keyCode: string): keyCode is KeyboardCode =>
  !!USED_KEYS.find(code => code === keyCode)

const KEYS_TO_MOVEMENT: { [key in KeyboardCode]: Movement } = {
  KeyW: 'forward',
  KeyS: 'backward',
  KeyA: 'left',
  KeyD: 'right',
  Space: 'up',
  ShiftLeft: 'down',
}
export const useMovement = () => {
  const [movement, setMovement] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false,
  })

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const code = e.code
      if (isKeyCodeUsed(code)) {
        setMovement(m => ({ ...m, [KEYS_TO_MOVEMENT[code]]: true }))
      }
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      const code = e.code
      if (isKeyCodeUsed(code)) {
        setMovement(m => ({ ...m, [KEYS_TO_MOVEMENT[code]]: false }))
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return { ...movement, keysHeld: Object.values(movement).filter(val => val).length }
}
