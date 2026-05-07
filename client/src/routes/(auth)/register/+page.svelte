<script lang="ts">
  import { goto } from '$app/navigation';
  import { api } from '$lib/api';
  import { toast } from '$lib/toast.svelte';

  let email = $state('');
  let password = $state('');
  let displayName = $state('');
  let submitting = $state(false);

  async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();
    submitting = true;

    const result = await api.post('/users', { email, password, displayName });
    submitting = false;

    if (!result.ok) {
      toast.error('Registration failed. Try a different email.');
      return;
    }

    toast.success('Account created! Please log in.');
    goto('/login');
  }
</script>

<h1>Create Your Account</h1>

<form onsubmit={handleSubmit}>
  <label>
    Display Name
    <input type="text" bind:value={displayName} required minlength="4" maxlength="15" />
  </label>
  <label>
    Email
    <input type="email" bind:value={email} required autocomplete="email" />
  </label>
  <label>
    Password
    <input type="password" bind:value={password} required minlength="8" maxlength="64" autocomplete="new-password" />
  </label>
  <button type="submit" disabled={submitting}>
    {submitting ? 'Creating account...' : 'Register'}
  </button>
</form>

<p>Already have an account? <a href="/login">Log in</a></p>