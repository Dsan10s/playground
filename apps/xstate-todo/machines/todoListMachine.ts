import { Machine, assign } from 'xstate'

export interface TodoItem {
  id: number
  checked: boolean
  description: string
}

interface TodoListContext {
  todoItems: TodoItem[]
  newTodo: TodoItem
}

interface TodoListStates {
  states: {
    all: Record<string, unknown>
    pending: Record<string, unknown>
    completed: Record<string, unknown>
  }
}

type TodoListEvents =
  | { type: 'ADD_TODO' }
  | { type: 'UPDATE_NEW_TODO'; description: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'SHOW_PENDING' }
  | { type: 'SHOW_COMPLETED' }
  | { type: 'SHOW_ALL' }

export const todoListMachine = Machine<
  TodoListContext,
  TodoListStates,
  TodoListEvents
>(
  {
    id: 'todoList',
    initial: 'all',
    context: {
      todoItems: [],
      newTodo: {
        checked: false,
        description: '',
        id: new Date().getTime(),
      },
    },
    on: {
      ADD_TODO: { actions: ['addTodo'] },
      UPDATE_NEW_TODO: { actions: ['updateNewTodo'] },
      TOGGLE_TODO: { actions: ['toggleTodo'] },
    },
    states: {
      all: {
        on: {
          SHOW_PENDING: 'pending',
          SHOW_COMPLETED: 'completed',
        },
      },
      pending: {
        on: {
          SHOW_ALL: 'all',
          SHOW_COMPLETED: 'completed',
        },
      },
      completed: {
        on: {
          SHOW_ALL: 'all',
          SHOW_PENDING: 'pending',
        },
      },
    },
  },
  {
    actions: {
      addTodo: assign((ctx, event) =>
        event.type === 'ADD_TODO'
          ? {
              ...ctx,
              todoItems: [
                ...ctx.todoItems,
                { ...ctx.newTodo, id: new Date().getTime() },
              ],
              newTodo: {
                checked: false,
                description: '',
                id: new Date().getTime(),
              },
            }
          : ctx
      ),
      updateNewTodo: assign((ctx, event) =>
        event.type === 'UPDATE_NEW_TODO'
          ? {
              ...ctx,
              newTodo: {
                ...ctx.newTodo,
                description: event.description,
              },
            }
          : ctx
      ),
      toggleTodo: assign((ctx, event) =>
        event.type === 'TOGGLE_TODO'
          ? {
              ...ctx,
              todoItems: ctx.todoItems.map((todoItem) =>
                todoItem.id === event.id
                  ? { ...todoItem, checked: !todoItem.checked }
                  : todoItem
              ),
            }
          : ctx
      ),
    },
  }
)
