<script>
  import QuestionItem from "./QuestionItem.svelte";
  
  let { questions, onUpvote, onDelete } = $props();
</script>

{#if questions.length === 0}
  <p class="text-center text-surface-500 py-4">No questions yet. Add one above!</p>
{:else}
  <ul class="list space-y-4">
    {#each questions as question (question.id)}
      <li>
        <QuestionItem {question} {onUpvote} {onDelete} />
      </li>
    {/each}
  </ul>
{/if}
