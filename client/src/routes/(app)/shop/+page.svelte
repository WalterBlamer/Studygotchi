<script lang="ts">
  import { fade } from 'svelte/transition';

  type Item = { id: number; name: string; desc: string; price: number; emoji: string; category: string; owned: boolean };

  // GET /api/shop-items
  let items: Item[] = [
    { id: 1, name: 'Top Hat',     desc: 'nice hat.',          price: 20,  emoji: '🎩', category: 'accessory',  owned: false },
    { id: 2, name: 'Glasses',     desc: 'so smart',         price: 15,  emoji: '👓', category: 'accessory',  owned: true  },
    { id: 3, name: 'Scarf',       desc: 'For when its cold.',               price: 10,  emoji: '🧣', category: 'accessory',  owned: false },
    { id: 4, name: 'Star Badge',  desc: 'Wow.',                   price: 25,  emoji: '⭐', category: 'accessory',  owned: false },
    { id: 5, name: 'Forest Room', desc: 'Cozy.',    price: 50,  emoji: '🌲', category: 'background', owned: false },
    { id: 6, name: 'Night Sky',   desc: 'Light pollution sucks.',           price: 60,  emoji: '🌌', category: 'background', owned: true  },
    { id: 7, name: 'Fox',         desc: 'The quick brown fox jumps or something.',                price: 100, emoji: '🦊', category: 'pet',        owned: false },
  ];

  let points = 120;
  let filter = 'all';
  let preview: Item | null = null;
  let buying = false;
  let buyDone = false;
  let currentPet = '🐻';
  let currentAcc: string | null = null;

  $: shown = filter === 'all' ? items : items.filter(i => i.category === filter);
  $: previewAcc = preview?.category === 'accessory' ? preview.emoji : currentAcc;
  $: previewPet = preview?.category === 'pet' ? preview.emoji : currentPet;

  function open(item: Item) { if (item.owned) return; preview = item; buying = false; buyDone = false; }
  function close() { preview = null; }

  async function buy(item: Item) {
    if (points < item.price) return;
    buying = true;
    // POST /api/purchases { shopItemId: item.id }
    await new Promise(r => setTimeout(r, 700));
    points -= item.price;
    items = items.map(i => i.id === item.id ? { ...i, owned: true } : i);
    preview = { ...item, owned: true };
    if (item.category === 'accessory') currentAcc = item.emoji;
    if (item.category === 'pet') currentPet = item.emoji;
    buying = false; buyDone = true;
  }
</script>

<div class="page">
  <div class="top">
    <button class="back" on:click={() => history.back()}>← Back</button>
    <span class="pts">🪙 {points}</span>
  </div>
  <h1>Shop</h1>

  <div class="filters">
    {#each ['all','accessory','background','pet'] as f}
      <button class="ftag" class:active={filter === f} on:click={() => filter = f}>
        {f === 'all' ? 'All' : f[0].toUpperCase() + f.slice(1)}
      </button>
    {/each}
  </div>

  <div class="grid">
    {#each shown as item (item.id)}
      <button class="card" class:owned={item.owned} on:click={() => open(item)}>
        <span class="emoji">{item.emoji}</span>
        <span class="name">{item.name}</span>
        <span class="tag" class:green={item.owned}>{item.owned ? 'Owned' : `🪙 ${item.price}`}</span>
      </button>
    {/each}
  </div>
</div>

{#if preview}
  <div class="backdrop" transition:fade={{ duration: 150 }} on:click={close} role="presentation"></div>
  <div class="modal" transition:fade={{ duration: 180 }}>
    {#if preview.category === 'accessory' || preview.category === 'pet'}
      <div class="pet-prev">
        {#if previewAcc}<span class="p-acc">{previewAcc}</span>{/if}
        <span class="p-pet">{previewPet}</span>
      </div>
    {:else}
      <p style="text-align:center;font-size:3rem;margin:0.5rem 0">{preview.emoji}</p>
    {/if}
    <p class="mname">{preview.name}</p>
    <p class="mdesc">{preview.desc}</p>
    {#if preview.owned}
      <p style="color:var(--green);text-align:center;margin:0">✓ Owned</p>
    {:else if buyDone}
      <p style="color:var(--green);text-align:center;margin:0">🎉 Added to inventory!</p>
    {:else}
      <button class="btn btn-primary" style="width:100%"
        disabled={buying || points < preview.price}
        on:click={() => buy(preview!)}>
        {buying ? 'Buying…' : points < preview.price ? 'Not enough points' : `Buy · 🪙 ${preview.price}`}
      </button>
    {/if}
    <button class="close-btn" on:click={close}>✕</button>
  </div>
{/if}

<style>
  .top { display: flex; justify-content: space-between; align-items: center; }
  .pts { font-size: 0.88rem; color: var(--accent); }
  h1 { font-size: 1.6rem; font-weight: 400; margin: 0.25rem 0 1rem; }
  .filters { display: flex; gap: 0.4rem; margin-bottom: 1rem; flex-wrap: wrap; }
  .ftag { background: var(--surface); border: 1px solid transparent; border-radius: 999px; padding: 0.28rem 0.75rem; font-size: 0.76rem; color: var(--muted); cursor: pointer; }
  .ftag.active { border-color: var(--accent); color: var(--accent); }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.55rem; }
  .card { background: var(--surface); border: 1.5px solid transparent; border-radius: var(--radius); padding: 0.75rem 0.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.28rem; cursor: pointer; transition: border-color 0.15s; }
  .card:hover:not(.owned) { border-color: var(--accent); }
  .card.owned { opacity: 0.45; cursor: default; }
  .emoji { font-size: 1.8rem; }
  .name { font-size: 0.7rem; font-weight: 600; text-align: center; }
  .tag { font-size: 0.67rem; color: var(--accent); }
  .tag.green { color: var(--green); }
  .backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 40; }
  .modal { position: fixed; bottom: 0; left: 0; right: 0; max-width: 420px; margin: 0 auto; background: var(--surface); border-radius: 14px 14px 0 0; padding: 1.5rem; z-index: 50; }
  .pet-prev { position: relative; text-align: center; height: 90px; display: flex; align-items: center; justify-content: center; margin-bottom: 0.5rem; }
  .p-pet { font-size: 4rem; }
  .p-acc { position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-size: 1.8rem; }
  .mname { font-size: 1.05rem; font-weight: 600; margin: 0 0 0.2rem; }
  .mdesc { color: var(--muted); font-size: 0.82rem; margin: 0 0 0.9rem; font-style: italic; }
  .close-btn { position: absolute; top: 0.9rem; right: 1rem; background: none; border: none; color: var(--muted); cursor: pointer; font-size: 0.88rem; }
</style>
