import React from 'react'
import styled from 'styled-components'

import { TodoItem as TodoItemType } from '../machines/todoListMachine'

import { LayoutGrid } from './style/LayoutGrid'

interface TodoItemProps extends TodoItemType {
  onToggleCheck: (id: number) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({
  id,
  checked,
  description,
  onToggleCheck,
}) => {
  return (
    <div>
      <LayoutGrid columns={['auto', '1fr']}>
        <div>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggleCheck(id)}
          />
        </div>
        <DescriptionText checked={checked}>{description}</DescriptionText>
      </LayoutGrid>
    </div>
  )
}

interface DescriptionText {
  checked: boolean
}

const DescriptionText = styled.div<DescriptionText>`
  ${({ checked }) => {
    if (checked) {
      return 'text-decoration: line-through;'
    }
  }}
`
