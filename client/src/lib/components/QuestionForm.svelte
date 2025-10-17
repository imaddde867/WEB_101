<script>
  import { PUBLIC_API_URL } from "$env/static/public";

  let { courseId, onQuestionAdded } = $props();

  const addQuestion = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const question = {
      title: formData.get("title"),
      text: formData.get("text")
    };

    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${courseId}/questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(question)
    });

    if (response.ok) {
      e.target.reset();
      onQuestionAdded();
    }
  };
</script>

<form onsubmit={addQuestion} class="space-y-4">
  <label class="label" for="title">
    <span>Title</span>
    <input 
      class="input" 
      id="title" 
      name="title" 
      type="text" 
      placeholder="Enter question title" 
      required 
    />
  </label>
  
  <label class="label" for="text">
    <span>Text</span>
    <textarea 
      class="textarea" 
      id="text" 
      name="text" 
      placeholder="Enter question text" 
      required
      rows="4"
    ></textarea>
  </label>
  
  <button type="submit" class="btn variant-filled-primary w-full">
    Add Question
  </button>
</form>
