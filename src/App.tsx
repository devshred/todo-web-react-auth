import React from 'react'
import Header from './components/Header'
import TodoList from './components/TodoList'
import TodoForm from './components/TodoForm'
import TodoSummary from './components/TodoSummary'
import { TodoProvider } from './context/TodoContext'
import { useAuth } from 'react-oidc-context'

const App: React.FC = () => {
  const auth = useAuth()

  switch (auth.activeNavigator) {
    case 'signinSilent':
      return <div>Signing you in...</div>
    case 'signoutRedirect':
      return <div>Signing you out...</div>
  }

  if (auth.isLoading) {
    return <div>Loading...</div>
  }

  if (auth.error) {
    return (
      <>
        <div>Oops... {auth.error.message}</div>
        <div>
          <a href='/'>back to homepage</a>
        </div>
      </>
    )
  }

  if (auth.isAuthenticated) {
    if (auth.user != undefined) {
      console.log('set token to localStorage')
      localStorage.setItem('todoApiAccessToken', auth.user.access_token)
    }

    console.log(auth.user)
    return (
      <>
        <div>
          Hello {auth.user?.profile.preferred_username}{' '}
          <button onClick={() => void auth.removeUser()}>Log out</button>
        </div>
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
      </>
    )
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>
}

export default App
