<script lang="ts">
  import { fade } from 'svelte/transition';

  type View = 'lobby' | 'room';
  let view: View = 'lobby';
  let joinCode = '';
  let generatedCode = '';
  let error = '';
  let copied = false;
  let members = [{ id: 1, name: 'You', avatar: '🐻' }];

  function createRoom() {
    generatedCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    members = [{ id: 1, name: 'You', avatar: '🐻' }];
    view = 'room'; error = '';
  }
  function joinRoom() {
    if (joinCode.trim().length < 4) { error = 'Enter a valid code.'; return; }
    generatedCode = joinCode.toUpperCase();
    members = [{ id: 1, name: 'You', avatar: '🐻' }, { id: 2, name: 'Alex', avatar: '🦊' }];
    view = 'room'; error = '';
  }
  function leaveRoom() { view = 'lobby'; joinCode = ''; generatedCode = ''; }
  async function copyCode() {
    await navigator.clipboard.writeText(generatedCode);
    copied = true; setTimeout(() => (copied = false), 1800);
  }
</script>

<div class="page">
  {#if view === 'lobby'}
    <button class="back" on:click={() => history.back()}>← Back</button>
    <h1>Study Room</h1>
    <button class="btn btn-primary full" on:click={createRoom}>Create Room</button>
    <p class="or">or</p>
    <div class="row">
      <input bind:value={joinCode} placeholder="Room code" maxlength="8"
        on:input={() => (error = '')} style="text-transform:uppercase" />
      <button class="btn" on:click={joinRoom}>Join</button>
    </div>
    {#if error}<p class="error" transition:fade>{error}</p>{/if}

  {:else}
    <div class="room-top">
      <button class="back" style="color:var(--danger);margin:0" on:click={leaveRoom}>Leave</button>
      <button class="code-btn" on:click={copyCode}>{copied ? 'Copied!' : generatedCode}</button>
    </div>
    <p class="label" style="margin:1.5rem 0 0.5rem">In this room</p>
    <div class="members">
      {#each members as m (m.id)}
        <span class="member">{m.avatar} {m.name}</span>
      {/each}
    </div>
    <div class="tools">
      <button class="btn">🗒 Notes</button>
      <button class="btn">✅ To-Do</button>
      <button class="btn">📋 Activity</button>
    </div>
  {/if}
</div>

<style>
  h1 { font-size: 1.6rem; font-weight: 400; margin: 0 0 1.5rem; }
  .full { width: 100%; }
  .or { text-align: center; color: var(--muted); font-size: 0.8rem; margin: 0.5rem 0; }
  .row { display: flex; gap: 0.5rem; }
  .room-top { display: flex; justify-content: space-between; align-items: center; }
  .code-btn { background: none; border: none; font-family: monospace; font-size: 0.8rem; color: var(--muted); cursor: pointer; }
  .code-btn:hover { color: var(--text); }
  .members { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .member { background: var(--surface); padding: 0.4rem 0.75rem; border-radius: var(--radius); font-size: 0.85rem; }
  .tools { display: flex; gap: 0.5rem; margin-top: 2rem; }
  .tools .btn { flex: 1; font-size: 0.78rem; }
</style>
