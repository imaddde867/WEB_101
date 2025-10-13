<script>
  import { PUBLIC_API_URL } from "$env/static/public";

  let { onQuestionAdded } = $props();

  const addQuestion = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const question = {
      title: formData.get("title"),
      text: formData.get("text")
    };

    const response = await fetch(`${PUBLIC_API_URL}/courses/1/questions`, {
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

<form onsubmit={addQuestion}>
  <div>
    <label for="title">Title</label>
    <input id="title" name="title" type="text" placeholder="Enter question title" required />
  </div>
  <div>
    <label for="text">Text</label>
    <textarea id="text" name="text" placeholder="Enter question text" required></textarea>
  </div>
  <input type="submit" value="Add Question" />
</form>
