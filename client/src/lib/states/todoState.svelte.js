import { browser } from "$app/environment";

const TODOS_KEY = "todos";
let initialTodos = [];
if (browser && localStorage.hasOwnProperty(TODOS_KEY)) {
  initialTodos = JSON.parse(localStorage.getItem(TODOS_KEY));
}

let todoState = $state(initialTodos);

const saveTodos = () => {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoState));
};

const useTodoState = () => {
  return {
    get todos() {
      return todoState;
    },
    add: (todo) => {
      todoState.push(todo);
      saveTodos();
    },
    changeDone: (id) => {
      const todo = todoState.find((todo) => todo.id === id);
      todo.done = !todo.done;
      saveTodos();
    },
    remove: (id) => {
      todoState = todoState.filter((todo) => todo.id !== id);
      saveTodos();
    },
  };
};

export { useTodoState };
