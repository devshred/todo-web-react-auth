import { useContext } from 'react'
import { TodoListItem } from './TodoListItem'
import TodoContext from '../context/TodoContext'

interface TodoListProps {}

export const TodoList: React.FC<TodoListProps> = () => {
  const { filteredTodos } = useContext(TodoContext)

  return (
    <div className='todo-list'>
      <div>
        {filteredTodos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  )
}

export default TodoList
