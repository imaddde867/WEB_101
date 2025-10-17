<script>
  import { page } from '$app/stores';
  
  let { data, form } = $props();
  
  let action = $derived(data.action);
  let isLogin = $derived(action === 'login');
</script>

<div class="container mx-auto px-4 py-8 max-w-md">
  <h1 class="text-3xl font-bold mb-6">
    {isLogin ? 'Login' : 'Register'}
  </h1>
  
  {#if form?.error}
    <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {form.error}
    </div>
  {/if}
  
  <form method="POST" class="space-y-4">
    <div>
      <label for="email" class="block text-sm font-medium mb-2">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <div>
      <label for="password" class="block text-sm font-medium mb-2">
        Password
      </label>
      <input
        type="password"
        id="password"
        name="password"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
    >
      {isLogin ? 'Login' : 'Register'}
    </button>
  </form>
  
  <p class="mt-4 text-center text-sm">
    {#if isLogin}
      Don't have an account?
      <a href="/auth/register" class="text-blue-600 hover:underline">Register</a>
    {:else}
      Already have an account?
      <a href="/auth/login" class="text-blue-600 hover:underline">Login</a>
    {/if}
  </p>
</div>
