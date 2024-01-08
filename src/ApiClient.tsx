import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:7001/api',
  timeout: 3000,
  headers: {
    'Content-type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('todoApiAccessToken')
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const allTodos = async () => {
  const response = await apiClient.get<Todo[]>('/v1/todo/')
  return response.data
}

const addTodo = async (text: string) => {
  const response = await apiClient.post('/v1/todo', { text: text })
  return response.data
}

const toggleStatus = async (todo: Todo) => {
  const response = await apiClient.patch('/v1/todo/' + todo.id, {
    done: !todo.done,
  })
  return response.data
}

const removeTodo = async (todo: Todo) => {
  const response = await apiClient.delete('/v1/todo/' + todo.id)
  return response.data
}

const ApiClient = { allTodos, addTodo, toggleStatus, removeTodo }

export default ApiClient
