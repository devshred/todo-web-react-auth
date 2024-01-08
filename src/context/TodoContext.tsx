import {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
  useMemo,
} from 'react'
import ApiClient from '../ApiClient'

export type TodoContextType = {
  todos: Array<Todo>
  filteredTodos: Array<Todo>
  addTodo: AddTodo
  toggleStatus: ToggleStatus
  removeTodo: RemoveTodo
  deleteCompleted: () => void
  hideCompleted: boolean
  toggleHideCompleted: () => void
  remaining: number
}

const TodoContext = createContext<TodoContextType>(null!)

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Array<Todo>>([])

  useEffect(() => {
    const fetchData = async () => {
      const todosFromDb = await ApiClient.allTodos()

      setTodos(todosFromDb)
    }

    fetchData()
  }, [])

  const [hideCompleted, setHideCompleted] = useState<boolean>(false)

  const [remaining, filteredTodos] = useMemo(() => {
    return [
      todos.filter((todo) => !todo.done).length,
      hideCompleted ? todos.filter((todo) => !todo.done) : todos,
    ]
  }, [todos, hideCompleted])

  const addTodo: AddTodo = async (newTodo) => {
    if (newTodo !== '') {
      const createdTodo = await ApiClient.addTodo(newTodo)
      setTodos([...todos, createdTodo])
    }
  }

  const toggleStatus: ToggleStatus = (selectedTodo) => {
    ApiClient.toggleStatus(selectedTodo)
    const updatedTodos = todos.map((todo) => {
      if (todo === selectedTodo) {
        return { ...todo, done: !todo.done }
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  const toggleHideCompleted = () => setHideCompleted(!hideCompleted)

  const executeRemoveTodo: RemoveTodo = async (todoToRemove) => {
    await ApiClient.removeTodo(todoToRemove)
  }

  const removeTodo: RemoveTodo = (todoToRemove) => {
    executeRemoveTodo(todoToRemove)
    const remainingTodos = todos.filter((todo) => todo !== todoToRemove)
    setTodos(remainingTodos)
  }

  const deleteCompleted = () => {
    todos.filter((todo) => todo.done).forEach((d) => executeRemoveTodo(d))
    const remainingTodos = todos.filter((todo) => !todo.done)
    setTodos(remainingTodos)
  }

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        addTodo,
        toggleStatus,
        removeTodo,
        deleteCompleted,
        hideCompleted,
        toggleHideCompleted,
        remaining,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}

export default TodoContext
