type Todo = {
  id: string;
  text: string;
  done: boolean;
};

type AddTodo = (newTodo: string) => void;
type ToggleStatus = (selectedTodo: Todo) => void;
type RemoveTodo = (todoToRemove: Todo) => void;
