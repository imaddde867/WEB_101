<script>
  let { question, onUpvote, onDelete } = $props();
</script>

<div>
  <h3>{question.title}</h3>
  <p>{question.text}</p>
  <p>Upvotes: {question.upvotes || 0}</p>
  <button onclick={() => onUpvote(question.id)}>Upvote</button>
  <button onclick={() => onDelete(question.id)}>Delete</button>
</div>
