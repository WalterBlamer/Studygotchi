<script lang="ts">
  import { closePanel } from '../stores/panel';

  let name = 'Placeholder name', email = 'abc@example.com', password = '', confirm = '';
  let status: 'idle' | 'saving' | 'saved' | 'error' = 'idle';
  let msg = '';
  let confirmDelete = false;

  async function save() {
    if (password && password !== confirm) { msg = 'Passwords do not match.'; status = 'error'; return; }
    status = 'saving'; msg = '';
    // PATCH /api/users/me { name, email, password? }
    await new Promise(r => setTimeout(r, 600));
    password = ''; confirm = '';
    status = 'saved'; setTimeout(() => (status = 'idle'), 2000);
  }

  async function deleteAccount() {
    // DELETE /api/users/me
    alert('Account deleted.');
    confirmDelete = false;
  }
</script>

<div class="panel">
  <div class="header">
    <span class="title">Profile</span>
    <button class="ghost" on:click={closePanel}>✕</button>
  </div>

  <div class="form">
    <label class="label" for="p-name">Name</label>
    <input id="p-name" bind:value={name} />
    <label class="label" for="p-email">Email</label>
    <input id="p-email" type="email" bind:value={email} />
    <label class="label" for="p-password">New Password</label>
    <input id="p-password" type="password" bind:value={password} placeholder="Leave blank to keep current" />
    <label class="label" for="p-confirm">Confirm</label>
    <input id="p-confirm" type="password" bind:value={confirm} />

    {#if status === 'error'}<p class="err">{msg}</p>{/if}

    <button class="btn btn-primary" on:click={save} disabled={status === 'saving'}>
      {status === 'saving' ? 'Saving…' : status === 'saved' ? '✓ Saved' : 'Save'}
    </button>

    <div class="danger">
      {#if !confirmDelete}
        <button class="ghost danger-link" on:click={() => confirmDelete = true}>Delete account</button>
      {:else}
        <p class="err">This is permanent.</p>
        <div class="drow">
          <button class="ghost danger-link" on:click={deleteAccount}>Yes, delete</button>
          <button class="ghost" on:click={() => confirmDelete = false}>Cancel</button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style>
  .panel { display: flex; flex-direction: column; height: 100%; overflow: hidden; }
  .header { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 1rem; border-bottom: 1px solid rgba(255,255,255,0.06); flex-shrink: 0; }
  .title { font-size: 0.95rem; font-weight: 600; }
  .ghost { background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.88rem; padding: 0.2rem 0.4rem; }
  .ghost:hover { color: var(--text); }
  .form { flex: 1; overflow-y: auto; padding: 0.75rem 1rem; display: flex; flex-direction: column; gap: 0.4rem; }
  .label { font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--muted); margin-top: 0.4rem; }
  .err { color: var(--danger); font-size: 0.8rem; margin: 0; }
  .danger { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(224,112,112,0.15); }
  .danger-link { color: var(--danger); font-size: 0.85rem; }
  .drow { display: flex; gap: 1rem; align-items: center; margin-top: 0.5rem; }
</style>
