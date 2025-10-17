<script>
  import { goto } from '$app/navigation';
  
  let { data } = $props();
  
  async function deleteNote() {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }
    
    const response = await fetch(`http://localhost:3000/api/notes/${data.note.id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    
    if (response.ok) {
      goto('/notes');
    }
  }
</script>

<div class="container mx-auto px-4 py-8">
  <div class="mb-6">
    <a href="/notes" class="text-blue-600 hover:underline">
      ← Back to notes
    </a>
  </div>
  
  <div class="bg-white shadow-md rounded-lg p-6">
    <div class="flex justify-between items-start mb-4">
      <h1 class="text-2xl font-bold">Note</h1>
      <button
        onclick={deleteNote}
        class="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
      >
        Delete
      </button>
    </div>
    
    <p class="text-gray-800 whitespace-pre-wrap mb-4">{data.note.content}</p>
    
    <p class="text-sm text-gray-500">
      Created: {new Date(data.note.created_at).toLocaleString()}
    </p>
  </div>
</div>
