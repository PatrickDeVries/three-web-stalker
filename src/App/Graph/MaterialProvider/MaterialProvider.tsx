import React, { useMemo } from 'react'
import { useTheme } from 'styled-components'
import { Color, MeshLambertMaterial, MeshStandardMaterial } from 'three'
import { MeshLineMaterial } from 'three.meshline'
import { MaterialContext } from './context'
import { MaterialContextType } from './types'

const COMMON_LINE_PROPS = { lineWidth: 0.5 }

const MaterialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme()

  const materials: MaterialContextType = useMemo(
    () => ({
      nodeMaterial: {
        default: new MeshStandardMaterial({ color: new Color(theme.color.primary) }),
        active: new MeshStandardMaterial({ color: new Color(theme.color.contrast) }),
        inActiveTree: new MeshStandardMaterial({ color: new Color(theme.color.primary80) }),
        inactive: new MeshStandardMaterial({ color: new Color(theme.color.primary40) }),
      },
      textMaterial: {
        default: new MeshLambertMaterial({ color: new Color(theme.color.contrast) }),
        active: new MeshLambertMaterial({ color: new Color(theme.color.contrast) }),
        inActiveTree: new MeshLambertMaterial({ color: new Color(theme.color.contrast80) }),
        inactive: new MeshLambertMaterial({ color: new Color(theme.color.contrast40) }),
      },
      lineMaterial: {
        default: new MeshLineMaterial({
          color: new Color(theme.color.secondary),
          ...COMMON_LINE_PROPS,
        }),
        active: new MeshLineMaterial({
          color: new Color(theme.color.secondary),
          ...COMMON_LINE_PROPS,
        }),
        inActiveTree: new MeshLineMaterial({
          color: new Color(theme.color.secondary),
          ...COMMON_LINE_PROPS,
        }),
        inactive: new MeshLineMaterial({
          color: new Color(theme.color.secondary60),
          ...COMMON_LINE_PROPS,
        }),
      },
    }),
    [
      theme.color.contrast,
      theme.color.contrast40,
      theme.color.contrast80,
      theme.color.primary,
      theme.color.primary40,
      theme.color.primary80,
      theme.color.secondary,
      theme.color.secondary60,
    ],
  )

  return <MaterialContext.Provider value={materials}>{children}</MaterialContext.Provider>
}

export default MaterialProvider
