import styled, { css } from 'styled-components'

export const Pill = styled.label<{ active: boolean }>`
  flex: 1;
  padding: 1rem;

  display: flex;
  justify-content: center;

  font-size: calc(4rem / 3);

  background-color: ${({ theme }) => theme.color.background};
  border: 1px solid ${({ theme }) => theme.color.text};

  ${({ theme, active }) =>
    active &&
    css`
      border-color: ${theme.color.focus};
      color: ${theme.color.focus};
    `}

  cursor: pointer;
`
export const HiddenRadio = styled.input`
  display: none;
`

export const Wrapper = styled.fieldset`
  all: unset;

  display: flex;

  ${Pill}:not(:first-child) {
    border-left: 1px solid ${({ theme }) => theme.color.text};
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
