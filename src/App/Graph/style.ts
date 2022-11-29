import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  min-height: 80vh;

  border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.background50};
`
