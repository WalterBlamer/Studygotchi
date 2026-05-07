<script lang="ts">
  import { auth } from '$lib/auth.svelte';
</script>

<div class="page">
  <p>Welcome back, <strong>{auth.user?.displayName}</strong>!</p>

  <nav class="home-nav">
    <a href="/shop">🛒 Shop</a>
    <a href="/studyroom">📚 Study Room</a>
    <a href="/petCustomization">🐾 Pet</a>
  </nav>
</div>

<style>
  .home-nav { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1.5rem; }
  .home-nav a { background: var(--surface); border-radius: var(--radius); padding: 0.75rem 1rem; text-decoration: none; color: var(--text); font-size: 0.95rem; }
  .home-nav a:hover { border-left: 3px solid var(--accent); }
</style>
