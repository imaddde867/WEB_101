<script>
  export let courses;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each courses as course}
    <div class="border p-4 rounded-lg">
      <h2 class="text-lg font-bold">{course.name}</h2>
    </div>
  {/each}
</div>
