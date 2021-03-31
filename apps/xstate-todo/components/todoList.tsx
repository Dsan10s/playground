import { useMachine } from '@xstate/react'
import React, { useRef } from 'react'
import styled from 'styled-components'

import { LayoutGrid } from './style/LayoutGrid'
import { TodoItem } from './todoItem'
import { todoListMachine } from '../machines/todoListMachine'

export const TodoList: React.FC = () => {
  const addTodoBtnRef = useRef<HTMLButtonElement | null>(null)
  const [todoListState, sendToTodoListMachine] = useMachine(todoListMachine)

  const onNewTodoKeyPress: React.ComponentProps<'input'>['onKeyPress'] = (
    e
  ) => {
    const addTodoBtn = addTodoBtnRef.current
    if (e.key === 'Enter' && addTodoBtn) {
      addTodoBtn.click()
    }
  }

  return (
    <TodoListContainer>
      <LayoutGrid rows={['auto', '1fr']}>
        <LayoutGrid columns={['auto', '1fr']}>
          <button
            ref={addTodoBtnRef}
            onClick={() => sendToTodoListMachine('ADD_TODO')}
            disabled={!todoListState.context.newTodo.description}
          >
            Add Todo
          </button>
          <input
            value={todoListState.context.newTodo.description}
            onKeyPress={onNewTodoKeyPress}
            onChange={(e) =>
              sendToTodoListMachine({
                type: 'UPDATE_NEW_TODO',
                description: e.target.value,
              })
            }
          />
        </LayoutGrid>
        <br />
        <div>
          <button onClick={() => sendToTodoListMachine('SHOW_ALL')}>All</button>
          <button onClick={() => sendToTodoListMachine('SHOW_PENDING')}>
            Pending
          </button>
          <button onClick={() => sendToTodoListMachine('SHOW_COMPLETED')}>
            Complete
          </button>
        </div>
        <div>
          {todoListState.context.todoItems
            .filter(({ checked }) =>
              todoListState.matches('pending')
                ? !checked
                : todoListState.matches('completed')
                ? checked
                : true
            )
            .map(({ checked, description, id }) => (
              <TodoItem
                key={id}
                id={id}
                checked={checked}
                description={description}
                onToggleCheck={(id) =>
                  sendToTodoListMachine({ type: 'TOGGLE_TODO', id })
                }
              />
            ))}
        </div>
      </LayoutGrid>
    </TodoListContainer>
  )
}

const TodoListContainer = styled.div`
  max-height: 500px;
`
