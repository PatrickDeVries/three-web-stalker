import styled from 'styled-components'

export const Wrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 0.25em;
`

export const Pill = styled.label`
  flex: 1;
  padding: 0.5em 1em;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.primary};

  &[data-active='true'] {
    border-color: ${({ theme }) => theme.color.secondary};
    color: ${({ theme }) => theme.color.secondary};
  }

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const Pillbox = styled.fieldset`
  all: unset;
  flex: 1;

  display: flex;

  ${Pill}:not(:first-child) {
    border-left: 1px solid ${({ theme }) => theme.color.primary};
  }

  ${Pill}[data-active='true'] {
    border-left: 1px solid ${({ theme }) => theme.color.secondary};
  }

  ${Pill}:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  ${Pill}:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`

export const HiddenRadio = styled.input`
  display: none;
`
