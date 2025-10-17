<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";
  
  let { todo } = $props();
  let todoState = useTodoState();
</script>

<div class="flex items-center justify-between p-3 bg-surface-100-800-token rounded-lg hover:bg-surface-200-700-token transition-colors">
  <label class="flex items-center space-x-3 flex-1 cursor-pointer" for={todo.id}>
    <input
      class="checkbox"
      type="checkbox"
      checked={todo.done}
      onchange={() => todoState.changeDone(todo.id)}
      id={todo.id}
    />
    <span class:line-through={todo.done} class:text-surface-500={todo.done}>
      {todo.name}
    </span>
    <span class="badge variant-soft-{todo.done ? 'success' : 'warning'} text-xs">
      {todo.done ? 'done' : 'pending'}
    </span>
  </label>
  <button 
    class="btn btn-sm variant-filled-error"
    onclick={() => todoState.remove(todo.id)}
  >
    Remove
  </button>
</div>
