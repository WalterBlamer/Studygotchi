<script lang="ts">
  import '../app.css';
  import Toast from '$lib/components/Toast.svelte';
  import { auth } from '$lib/auth.svelte';
  import { api } from '$lib/api';
  import { goto } from '$app/navigation';
  import { toast } from '$lib/toast.svelte';

  let { children } = $props();

  async function handleLogout(): Promise<void> {
    await api.del('/sessions');
    auth.setUser(null);
    toast.info('Logged out');
    goto('/');
  }
</script>

<nav class="container">
  <ul>
    <li><a href="/"><strong>PawModoro</strong></a></li>
  </ul>
  <ul>
    {#if auth.user}
      <li>{auth.user.displayName}</li>
      <li><button onclick={handleLogout}>Log Out</button></li>
    {:else}
      <li><a href="/login">Log In</a></li>
      <li><a href="/register">Register</a></li>
    {/if}
  </ul>
</nav>

<main class="container">
  {@render children()}
</main>
<Toast />