import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from 'react-oidc-context'

const queryClient = new QueryClient()

const oidcConfig = {
  authority: 'http://localhost:7000/realms/TodoApp',
  client_id: 'todo-app-client',
  redirect_uri: 'http://localhost:3000/',
}

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
