<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  import QuestionForm from "./QuestionForm.svelte";
  import QuestionList from "./QuestionList.svelte";

  let questions = $state([]);

  async function fetchQuestions() {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/courses/1/questions`);
      if (response.ok) {
        questions = await response.json();
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  async function handleUpvote(questionId) {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/courses/1/questions/${questionId}/upvote`, {
        method: "POST"
      });
      if (response.ok) {
        await fetchQuestions();
      }
    } catch (error) {
      console.error("Error upvoting question:", error);
    }
  }

  async function handleDelete(questionId) {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/courses/1/questions/${questionId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        await fetchQuestions();
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }

  $effect(() => {
    fetchQuestions();
  });
</script>

<h1>Questions</h1>

<h2>Add Question</h2>

<QuestionForm onQuestionAdded={fetchQuestions} />

<h2>Existing Questions</h2>

<QuestionList {questions} onUpvote={handleUpvote} onDelete={handleDelete} />
