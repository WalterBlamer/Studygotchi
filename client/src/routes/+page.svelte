<script lang="ts">
  import { auth } from '$lib/auth.svelte';
  const user = $derived(auth.user);
</script>

{#if auth.loading}
  <p aria-busy="true">Checking session…</p>
{:else if user}
  <p>Welcome back, <strong>{user.displayName}</strong>!</p>
{:else}
  <h1>PawModoro</h1>
  <p>A digital space to get more done.</p>
  <a href="/register" role="button">Create Account</a>
  <a href="/login" role="button" class="secondary">Sign In</a>
{/if}
