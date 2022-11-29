import React, { SVGProps } from 'react'
import ChevronDown from './icons/ChevronDown'

const ICONS = {
  'chevron-down': ChevronDown,
}

interface Props extends SVGProps<SVGSVGElement> {
  name: keyof typeof ICONS
}

const Icon: React.FC<Props> = ({ name, color, ...props }) =>
  React.createElement(ICONS[name], {
    height: '1em',
    preserveAspectRatio: 'xMidYMid meet',
    name: name,
    color: 'currentColor',
    ...props,
  })

export default Icon
