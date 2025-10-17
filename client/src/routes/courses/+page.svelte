<script>
  import { PUBLIC_API_URL } from "$env/static/public";

  let courses = $state([]);

  async function fetchCourses() {
    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/courses`);
      if (response.ok) {
        courses = await response.json();
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  }

  async function addCourse(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const course = {
      name: formData.get("name")
    };

    try {
      const response = await fetch(`${PUBLIC_API_URL}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
      });

      if (response.ok) {
        e.target.reset();
        await fetchCourses();
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  }

  $effect(() => {
    fetchCourses();
  });
</script>

<div class="container mx-auto p-8 max-w-3xl">
  <h1 class="h1 mb-8">Courses</h1>

  <div class="card p-6 mb-8">
    <h2 class="h2 mb-4">Add Course</h2>
    <form onsubmit={addCourse} class="space-y-4">
      <label class="label" for="name">
        <span>Course Name</span>
        <input 
          class="input" 
          id="name" 
          name="name" 
          type="text" 
          placeholder="Enter course name"
          required
        />
      </label>
      <button type="submit" class="btn variant-filled-primary w-full">
        Add Course
      </button>
    </form>
  </div>

  <div class="card p-6">
    <h2 class="h2 mb-4">All Courses</h2>
    {#if courses.length === 0}
      <p class="text-center text-surface-500 py-4">No courses yet. Add one above!</p>
    {:else}
      <ul class="list space-y-2">
        {#each courses as course (course.id)}
          <li>
            <a href="/courses/{course.id}" class="anchor">
              {course.name}
            </a>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</div>
