<script>
  import { invalidateAll } from '$app/navigation';
  
  let { data, form } = $props();
  
  let content = $state('');
  
  async function handleSubmit() {
    // Form will be handled by the server action
    content = '';
    await invalidateAll();
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-3xl font-bold">My Notes</h1>
    <form method="POST" action="?/logout">
      <button
        type="submit"
        class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </form>
  </div>
  
  {#if form?.error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {form.error}
    </div>
  {/if}
  
  {#if form?.success}
    <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      Note created successfully!
    </div>
  {/if}
  
  <div class="mb-8 bg-white shadow-md rounded-lg p-6">
    <h2 class="text-xl font-semibold mb-4">Create a new note</h2>
    <form method="POST" action="?/create" onsubmit={handleSubmit}>
      <textarea
        name="content"
        bind:value={content}
        placeholder="Enter your note content..."
        rows="4"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      ></textarea>
      <button
        type="submit"
        class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Create Note
      </button>
    </form>
  </div>
  
  <div class="space-y-4">
    <h2 class="text-2xl font-semibold mb-4">Your Notes</h2>
    {#if data.notes.length === 0}
      <p class="text-gray-600">No notes yet. Create your first note above!</p>
    {:else}
      {#each data.notes as note}
        <div class="bg-white shadow-md rounded-lg p-6">
          <a href="/notes/{note.id}" class="block hover:bg-gray-50 transition-colors">
            <p class="text-gray-800 whitespace-pre-wrap">{note.content}</p>
            <p class="text-sm text-gray-500 mt-2">
              {new Date(note.created_at).toLocaleString()}
            </p>
          </a>
        </div>
      {/each}
    {/if}
  </div>
</div>
