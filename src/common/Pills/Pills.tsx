import React from 'react'
import { HiddenRadio, Pill, Pillbox, Wrapper } from './style'

interface Props<T> {
  options: { label: string; value: T }[]
  value: T
  onChange: (value: T) => void
  label?: string
}

const Pills = <T,>({ options, value, onChange, label }: Props<T>): ReturnType<React.FC> => {
  return (
    <Wrapper>
      {label && <span>{label}</span>}
      <Pillbox>
        {options.map(({ label, value: val }) => (
          <Pill key={label} data-active={val === value}>
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
      </Pillbox>
    </Wrapper>
  )
}

export default Pills
