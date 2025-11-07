<script>
  import { onMount } from "svelte";
  import QuestionList from "../../lib/components/QuestionList.svelte";

  let questions = [];

  onMount(async () => {
    const response = await fetch("/api/questions");
    questions = await response.json();
  });
</script>

<div class="container mx-auto px-4">
  <h1 class="text-2xl font-bold my-4">Questions and Answers</h1>
  <QuestionList {questions} />
</div>
