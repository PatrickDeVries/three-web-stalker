import React, { InputHTMLAttributes } from 'react'
import { Error, StyledInput, StyledLabel } from './style'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string | null
}

const Input: React.FC<Props> = ({ label, error, ...props }) => {
  return (
    <StyledLabel>
      {label && label}
      <StyledInput error={!!error} {...props} />
      {error && <Error>{error}</Error>}
    </StyledLabel>
  )
}

export default Input
