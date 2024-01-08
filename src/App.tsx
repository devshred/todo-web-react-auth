import React from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import TodoSummary from './components/TodoSummary'
import { TodoProvider } from './context/TodoContext'

const App: React.FC = () => {
  return (
    <TodoProvider>
      <div className='App'>
        <Header />
        <div className='container'>
          <div style={{ flex: 1 }}>
            <TodoForm />
            <TodoList />
            <TodoSummary />
          </div>
        </div>
      </div>
    </TodoProvider>
  )
}

export default App
