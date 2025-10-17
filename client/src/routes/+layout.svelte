<script>
  import '../app.css';
</script>

<div class="min-h-screen flex flex-col">
  <header class="bg-surface-200-700-token border-b border-surface-300-600-token">
    <nav class="container mx-auto px-4 py-4">
      <ul class="flex gap-6">
        <li>
          <a href="/" class="anchor font-semibold hover:text-primary-500 transition-colors">
            Home
          </a>
        </li>
        <li>
          <a href="/courses" class="anchor font-semibold hover:text-primary-500 transition-colors">
            Courses
          </a>
        </li>
      </ul>
    </nav>
  </header>

  <main class="flex-1">
    <slot />
  </main>

  <footer class="bg-surface-100-800-token border-t border-surface-300-600-token py-4">
    <div class="container mx-auto px-4 text-center text-sm text-surface-600-300-token">
      <p>Course Management System</p>
    </div>
  </footer>
</div>
