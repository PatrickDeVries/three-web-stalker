import styled from 'styled-components'

export const Main = styled.main`
  margin: 0 auto;
  padding: 2rem;

  width: 100%;
  max-width: 60rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

export const Configuration = styled.div`
  width: 100%;

  display: flex;
  align-items: flex-start;
  gap: 1rem;

  > *:last-child,
  > *:first-child {
    flex: 0 1 auto;
  }
`
