<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";
  import TodoItem from "./TodoItem.svelte";
  
  let todoState = useTodoState();
</script>

{#if todoState.todos.length === 0}
  <p class="text-center text-surface-500 py-4">No todos yet. Add one above!</p>
{:else}
  <ul class="list space-y-2">
    {#each todoState.todos as todo}
      <li>
        <TodoItem {todo} />
      </li>
    {/each}
  </ul>
{/if}
