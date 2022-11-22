import styled from 'styled-components'

export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const StyledInput = styled.input`
  outline: none;
  padding: 0.5em 1em;

  border: 1px solid ${({ theme }) => theme.color.text};
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.background};

  &:focus {
    border-color: ${({ theme }) => theme.color.focus};
  }
`
