<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import { activePanel, openPanel, closePanel, type PanelType } from '$lib/stores/panel';
  import ProfilePanel from '$lib/panels/ProfilePanel.svelte';

  let { children } = $props();

  const nav = [
    { id: 'notes',        icon: '🗒',  label: 'Notes'    },
    { id: 'todo',         icon: '✅',  label: 'To-Do'    },
    { id: 'activity',     icon: '📋',  label: 'Activity' },
    { id: 'achievements', icon: '🏆',  label: 'Achieve'  },
    { id: 'profile',      icon: '👤',  label: 'Profile'  },
  ] as const;

  const panels: Record<string, any> = { profile: ProfilePanel };

  function toggle(id: PanelType) { $activePanel === id ? closePanel() : openPanel(id); }
  let Panel = $derived($activePanel ? panels[$activePanel] : null);
</script>

<div class:dimmed={!!$activePanel} class="content">{@render children()}</div>

{#if $activePanel}
  <div class="backdrop" transition:fade={{ duration: 180 }} on:click={closePanel} role="presentation"></div>
  <div class="drawer" transition:fly={{ y: '100%', duration: 300, easing: cubicOut }}>
    <div class="handle"></div>
    {#if Panel}
      <Panel />
    {/if}
  </div>
{/if}

<nav class="bottom-nav">
  {#each nav as item}
    <button class="nav-btn" class:active={$activePanel === item.id} on:click={() => toggle(item.id)}>
      <span>{item.icon}</span>
      <span class="nav-label">{item.label}</span>
    </button>
  {/each}
</nav>

<style>
  .content { padding-bottom: 64px; transition: filter 0.2s; }
  .content.dimmed { filter: brightness(0.5); pointer-events: none; }
  .backdrop { position: fixed; inset: 0; bottom: 64px; background: rgba(0,0,0,0.4); z-index: 40; }
  .drawer { 
  position: fixed; 
  bottom: 64px; 
  left: 0; 
  right: 0; 
  height: 70vh; 
  background: #d0ceca;
  border-radius: 14px 14px 0 0; 
  border-top: 1px solid #bbb;
  z-index: 50; 
  display: flex; 
  flex-direction: column; 
  overflow: hidden; 
}
  .handle { width: 32px; height: 3px; background: rgba(255,255,255,0.12); border-radius: 999px; margin: 0.6rem auto; flex-shrink: 0; }
  .bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; height: 64px; background: var(--surface); border-top: 1px solid rgba(255,255,255,0.06); display: flex; z-index: 60; }
  .nav-btn { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem; background: none; border: none; color: var(--muted); cursor: pointer; transition: color 0.15s; font-size: 1.2rem; }
  .nav-btn:hover, .nav-btn.active { color: var(--accent); }
  .nav-label { font-family: var(--font); font-size: 0.58rem; letter-spacing: 0.04em; }
</style>
