<script>
  import { PUBLIC_API_URL } from "$env/static/public";
  import QuestionForm from "$lib/components/QuestionForm.svelte";
  import QuestionList from "$lib/components/QuestionList.svelte";

  let { data } = $props();
  let questions = $state(data.questions || []);
  let course = $state(data.course);
  let courseId = data.courseId;

  async function fetchQuestions() {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions`);
      if (response.ok) {
        questions = await response.json();
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  async function handleUpvote(questionId) {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${questionId}/upvote`, {
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
      const response = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions/${questionId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        await fetchQuestions();
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }
</script>

<div class="container mx-auto p-8 max-w-4xl">
  {#if course}
    <div class="mb-8 text-center">
      <h1 class="h1 mb-2">{course.name}</h1>
      <p class="text-surface-600-300-token">Course ID: {courseId}</p>
    </div>

    <div class="card p-6 mb-8 bg-primary-50 dark:bg-primary-900/20">
      <h2 class="h3 mb-4">Add New Question</h2>
      <QuestionForm {courseId} onQuestionAdded={fetchQuestions} />
    </div>

    <div class="card p-6">
      <h2 class="h3 mb-6">Questions</h2>
      <QuestionList {questions} onUpvote={handleUpvote} onDelete={handleDelete} />
    </div>
  {:else}
    <div class="card p-8 text-center">
      <p class="text-error-500 text-xl">Course not found</p>
      <a href="/courses" class="btn variant-filled-primary mt-4">
        Back to Courses
      </a>
    </div>
  {/if}
</div>
