import React from 'react'
import { HiddenRadio, Pill, Wrapper } from './style'

interface Props<T> {
  options: { label: string; value: T }[]
  value: T
  onChange: (value: T) => void
}

const Pills = <T,>({ options, value, onChange }: Props<T>): ReturnType<React.FC> => {
  return (
    <Wrapper>
      {options.map(({ label, value: val }) => (
        <Pill key={label} active={val === value}>
          {label}
          <HiddenRadio
            type="radio"
            checked={val === value}
            onChange={e => {
              if (e.target.checked) onChange(val)
            }}
          />
        </Pill>
      ))}
    </Wrapper>
  )
}

export default Pills
