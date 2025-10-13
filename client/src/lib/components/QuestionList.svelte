<script>
  import QuestionItem from "./QuestionItem.svelte";
  
  let { questions, onUpvote, onDelete } = $props();
</script>

{#if questions.length === 0}
  <p>No questions yet.</p>
{:else}
  <div>
    {#each questions as question (question.id)}
      <QuestionItem {question} {onUpvote} {onDelete} />
    {/each}
  </div>
{/if}
