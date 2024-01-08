import { useContext } from 'react'
import TodoContext from '../context/TodoContext'

interface TodoSummaryProps {}

export const TodoSummary: React.FC<TodoSummaryProps> = () => {
  const { remaining, deleteCompleted, hideCompleted, toggleHideCompleted } =
    useContext(TodoContext)

  return (
    <footer>
      <span className='text'>{remaining} remaining items left.</span>
      <button
        className='summaryButton'
        onClick={deleteCompleted}
        style={{ float: 'right' }}
      >
        Delete completed
      </button>
      <button
        type='submit'
        className='summaryButton'
        onClick={toggleHideCompleted}
      >
        {hideCompleted ? 'Show all' : 'Hide completed'}
      </button>
    </footer>
  )
}

export default TodoSummary
