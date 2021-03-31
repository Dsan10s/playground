import { Machine } from 'xstate'

interface TodoStates {
  states: {
    unchecked: Record<string, unknown>
    checked: Record<string, unknown>
  }
}

type TodoEvents = { type: 'TOGGLE' }

type TodoContext = never

export const todoMachine = Machine<TodoContext, TodoStates, TodoEvents>({
  id: 'todo',
  initial: 'unchecked',
  states: {
    unchecked: {
      on: {
        TOGGLE: 'checked',
      },
    },
    checked: {
      on: {
        TOGGLE: 'unchecked',
      },
    },
  },
})
