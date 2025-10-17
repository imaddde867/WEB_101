<script>
  import TodoForm from "./TodoForm.svelte";
  import TodoList from "./TodoList.svelte";
</script>

<div class="container mx-auto p-8 max-w-3xl">
  <h1 class="h1 mb-8 text-center">Todos</h1>

  <div class="card p-6 mb-8">
    <h2 class="h2 mb-4">Add Todo</h2>
    <TodoForm />
  </div>

  <div class="card p-6">
    <h2 class="h2 mb-4">Existing todos</h2>
    <TodoList />
  </div>
</div>
