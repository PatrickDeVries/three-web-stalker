import styled from 'styled-components'

export const Button = styled.button`
  flex: 1;
  padding: 0.5em 1em;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.background};

  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 3px;

  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`
