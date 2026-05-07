<script lang="ts">
  import { onMount } from 'svelte';
  import { api } from '$lib/api';

  const species = [
    { id: 1, label: 'Dog' },
    { id: 2, label: 'Llama' },
  ];

  const outfits = [
    { id: 0, label: 'None' },
    { id: 1, label: 'Mustache' },
    { id: 2, label: 'Sunglasses' },
    { id: 3, label: 'Hat' },
  ];

  let petId = '';
  let petName = '';
  let speciesId = 1;
  let outfitId = 0;
  let saved = false;
  let loading = true;

  $: previewSrc = `/pets/outfits/species-${speciesId}-outfit-${outfitId}.png`;

  onMount(async () => {
    try {
      // GET /api/pets/mine
      const res = await api.get<{ petId: string; petName: string; speciesId: number; outfitId: number }>('/pets/mine');
      petId     = res.data.petId;
      petName   = res.data.petName;
      speciesId = res.data.speciesId;
      outfitId  = res.data.outfitId;
    } catch {
      // no pet yet — defaults are fine
    } finally {
      loading = false;
    }
  });

  async function save() {
    // PATCH /api/pets/:id { petName, speciesId, outfitId }
    await api.patch(`/pets/${petId}`, { petName, speciesId, outfitId });
    saved = true;
    setTimeout(() => (saved = false), 2000);
  }
</script>

<div class="page">
  <button class="back" on:click={() => history.back()}>← Back</button>

  {#if loading}
    <p style="color:var(--muted)">Loading…</p>
  {:else}
    <div class="preview">
      <img src={previewSrc} alt="Pet preview" />
    </div>

    <input bind:value={petName} placeholder="Name your pet…" style="margin-bottom:1.25rem" />

    <p class="label">Species</p>
    <div class="grid2">
      {#each species as s}
        <button class="opt" class:sel={speciesId === s.id} on:click={() => speciesId = s.id}>
          <img src={`/pets/outfits/species-${s.id}-outfit-0.png`} alt={s.label} />
          <span>{s.label}</span>
        </button>
      {/each}
    </div>

    <p class="label">Outfit</p>
    <div class="grid4">
      {#each outfits as o}
        <button class="opt" class:sel={outfitId === o.id} on:click={() => outfitId = o.id}>
          <img src={`/pets/outfits/species-${speciesId}-outfit-${o.id}.png`} alt={o.label} />
          <span>{o.label}</span>
        </button>
      {/each}
    </div>

    <button class="btn btn-primary" style="width:100%;margin-top:1.25rem" on:click={save}>
      {saved ? '✓ Saved' : 'Save'}
    </button>
  {/if}
</div>

<style>
  .preview { text-align: center; margin: 0.75rem 0 1.25rem; }
  .preview img { width: 400px; height: 400px; }
  .grid2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem; margin-bottom: 1rem; }
  .grid4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.4rem; margin-bottom: 1rem; }
  .opt { background: var(--surface); border: 1.5px solid transparent; border-radius: var(--radius); padding: 0.5rem; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; transition: border-color 0.15s; }
  .opt img { width: 100px; height: 100px; }
  .opt span { font-size: 0.68rem; color: var(--muted); }
  .opt.sel { border-color: var(--accent); }
  .opt.sel span { color: var(--text); }
</style>
