import React, { InputHTMLAttributes } from 'react'
import { StyledInput, StyledLabel } from './style'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input: React.FC<Props> = ({ label, ...props }) => {
  return (
    <StyledLabel>
      {label && label}
      <StyledInput {...props} />
    </StyledLabel>
  )
}

export default Input
