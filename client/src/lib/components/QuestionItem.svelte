<script>
  let { question, onUpvote, onDelete } = $props();
</script>

<div class="card p-4 bg-surface-100-800-token">
  <h3 class="h3 mb-2">{question.title}</h3>
  <p class="mb-4 text-surface-600-300-token">{question.text}</p>
  
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <span class="badge variant-soft-primary">
        Upvotes: {question.upvotes || 0}
      </span>
    </div>
    
    <div class="flex gap-2">
      <button 
        class="btn btn-sm variant-filled-primary"
        onclick={() => onUpvote(question.id)}
      >
        Upvote
      </button>
      <button 
        class="btn btn-sm variant-filled-error"
        onclick={() => onDelete(question.id)}
      >
        Delete
      </button>
    </div>
  </div>
</div>
