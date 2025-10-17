<script>
  import '../app.css';
  import { userState } from '$lib/states/userState.svelte.js';
  
  let { data, children } = $props();
  
  $effect(() => {
    userState.user = data.user;
  });
</script>

<div class="min-h-screen flex flex-col">
  <header class="bg-surface-200-700-token border-b border-surface-300-600-token">
    <nav class="container mx-auto px-4 py-4">
      <ul class="flex gap-6 items-center">
        <li>
          <a href="/" class="anchor font-semibold hover:text-primary-500 transition-colors">
            Home
          </a>
        </li>
        {#if userState.user}
          <li>
            <a href="/notes" class="anchor font-semibold hover:text-primary-500 transition-colors">
              Notes
            </a>
          </li>
          <li class="ml-auto">
            <span class="text-sm">Welcome, {userState.user.email}</span>
          </li>
        {:else}
          <li class="ml-auto">
            <a href="/auth/login" class="anchor font-semibold hover:text-primary-500 transition-colors">
              Login
            </a>
          </li>
          <li>
            <a href="/auth/register" class="anchor font-semibold hover:text-primary-500 transition-colors">
              Register
            </a>
          </li>
        {/if}
      </ul>
    </nav>
  </header>

  <main class="flex-1">
    {@render children()}
  </main>

  <footer class="bg-surface-100-800-token border-t border-surface-300-600-token py-4">
    <div class="container mx-auto px-4 text-center text-sm text-surface-600-300-token">
      <p>Personal Notes Application</p>
    </div>
  </footer>
</div>
