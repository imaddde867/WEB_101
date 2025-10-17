<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";
  let todoState = useTodoState();

  const addTodo = (e) => {
    const todo = Object.fromEntries(new FormData(e.target));
    todo.id = crypto.randomUUID();
    todoState.add(todo);
    e.target.reset();
    e.preventDefault();
  };
</script>

<form onsubmit={addTodo} class="space-y-4">
  <label class="label" for="name">
    <span>Todo</span>
    <input 
      class="input" 
      id="name" 
      name="name" 
      type="text" 
      placeholder="Enter a new todo"
      required
    />
  </label>
  
  <label class="flex items-center space-x-2">
    <input 
      class="checkbox" 
      id="done" 
      name="done" 
      type="checkbox" 
    />
    <span>Done</span>
  </label>
  
  <button type="submit" class="btn variant-filled-primary w-full">
    Add Todo
  </button>
</form>
