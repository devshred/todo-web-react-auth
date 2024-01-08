import React, { useContext } from 'react'
import classNames from 'classnames'
import TodoContext from '../context/TodoContext'

interface TodoListItemProps {
  todo: Todo
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo }) => {
  const { toggleStatus, removeTodo } = useContext(TodoContext)

  const textClass = classNames({
    text: !todo.done,
    'text text-done': todo.done,
  })

  return (
    <div className='list'>
      <label className='material-checkbox'>
        <input
          type='checkbox'
          checked={todo.done}
          onChange={() => toggleStatus(todo)}
        />
        <span></span>
      </label>
      <div className={textClass}>{todo.text}</div>
      <button
        type='submit'
        className='todo-button'
        onClick={() => removeTodo(todo)}
      >
        X
      </button>
    </div>
  )
}
