<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import { auth } from '$lib/auth.svelte';
  import { toast } from '$lib/toast.svelte';

  let email = $state('');
  let password = $state('');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await api.post('/login', { email, password });
    submitting = false;

    if (result.status === 403) {
      toast.error('Invalid email or password.');
      return;
    }
    if (!result.ok) {
      toast.error('Something went wrong. Please try again.');
      return;
    }

    // Login sets a session cookie. Call auth.refresh() so the store
    // fetches the user from GET /api/me
    await auth.refresh();
    goto('/');
  }
</script>

<h1>Log In</h1>

<form onsubmit={handleSubmit}>
  <label>
    Email
    <input type="email" bind:value={email} required autocomplete="email" />
  </label>
  <label>
    Password
    <input type="password" bind:value={password} required autocomplete="current-password" />
  </label>
  <button type="submit" disabled={submitting}>
    {submitting ? 'Logging in...' : 'Log In'}
  </button>
</form>

<p>Don't have an account? <a href="/register">Register</a></p>