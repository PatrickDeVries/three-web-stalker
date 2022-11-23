import styled from 'styled-components'

export const StyledLabel = styled.label`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 0.25em;
`

export const StyledInput = styled.input<{ error: boolean }>`
  outline: none;
  padding: 0.5em 1em;

  border: 1px solid ${({ theme, error }) => (error ? theme.color.error : theme.color.text)};
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.background};

  &:focus {
    border-color: ${({ theme }) => theme.color.focus};
  }
`

export const Error = styled.span`
  color: ${({ theme }) => theme.color.error};
`
