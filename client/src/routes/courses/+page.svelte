<script>
  import { onMount } from "svelte";
  import CourseList from "../../lib/components/CourseList.svelte";

  let courses = [];

  onMount(async () => {
    const response = await fetch("/api/courses");
    courses = await response.json();
  });
</script>

<div class="container mx-auto px-4">
  <h1 class="text-2xl font-bold my-4">Courses</h1>
  <CourseList {courses} />
</div>