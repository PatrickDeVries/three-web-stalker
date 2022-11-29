import { useRef, useState } from 'react'
import Icon from '../Icon'
import { Content, Title, Wrapper } from './style'

interface Props {
  title?: string | ((isOpen: boolean) => string)
  children: React.ReactNode
}

const Accordion: React.FC<Props> = ({
  title = (isOpen: boolean) => (isOpen ? 'Hide' : 'Show'),
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  return (
    <Wrapper>
      <Title onClick={() => setIsOpen(curr => !curr)} isOpen={isOpen}>
        {typeof title === 'function' ? title(isOpen) : title}
        <Icon name={'chevron-down'} transform={isOpen ? 'rotate(180 0 0)' : ''} />
      </Title>
      <Content
        ref={contentRef}
        $maxHeight={isOpen && contentRef.current ? `${contentRef.current.scrollHeight}px` : '0'}
        isOpen={isOpen}
      >
        {children}
      </Content>
    </Wrapper>
  )
}

export default Accordion
