import styled from 'styled-components'

export const Button = styled.button`
  flex: 1;
  padding: 0.5em 1em;

  display: flex;
  justify-content: center;
  align-items: center;

  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.background};

  border: 1px solid ${({ theme }) => theme.color.text};
  border-radius: 3px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
