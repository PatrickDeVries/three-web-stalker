import styled from 'styled-components'

export const Main = styled.main`
  height: 100vh;
  width: 100vw;

  overflow: hidden;
`

export const Content = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: auto;
`

export const Wrapper = styled.div`
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

export const SiteHeading = styled.div`
  display: flex;
  gap: 0.25rem;
  align-items: baseline;

  white-space: nowrap;
  > a {
    width: 100%;

    display: block;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }
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

export const List = styled.div`
  max-height: 10rem;
  min-height: 10rem;

  padding: 0.5rem 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  border: 1px solid ${({ theme }) => theme.color.primary};
  overflow-y: auto;
`

export const GraphButtons = styled.div`
  display: flex;
  gap: 1rem;
`
