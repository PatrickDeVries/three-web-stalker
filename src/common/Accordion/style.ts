import styled, { css } from 'styled-components'
import Button from '../Button'

export const Wrapper = styled.div`
  width: 100%;
`
export const Title = styled(Button)<{ isOpen: boolean }>`
  width: 100%;

  display: flex;
  justify-content: space-between;
  gap: 1rem;

  color: ${({ theme }) => theme.color.primary};

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.color.primary90};
    text-decoration: underline;
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    `}

  svg {
    transition: transform 100ms ease-in-out;
  }
`

export const Content = styled.div<{
  $maxHeight: string
  isOpen: boolean
}>`
  max-height: ${({ $maxHeight }) => $maxHeight};
  overflow: hidden;
  transition: max-height 100ms ease-out;

  ${({ isOpen }) =>
    isOpen &&
    css`
      border-radius: 3px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;

      border: 1px solid ${({ theme }) => theme.color.primary};
      border-top: none;
    `}
`
