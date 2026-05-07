<script lang="ts">
  import Pet from '$lib/components/pet/Pet.svelte';

  let petName = '';
  let speciesId = 1;
  let outfitId = 0;

  async function handleSubmit() {
    const response = await fetch('/api/pets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        petName,
        speciesId,
        outfitId,
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  $: pet = {
    petName,
    speciesId,
    outfitId,
  };
</script>

<h1>Create Pet</h1>

<input bind:value={petName} placeholder="Pet name" />

<select bind:value={speciesId}>
  <option value={1}>Dog</option>
  <option value={2}>Llama</option>
</select>

<select bind:value={outfitId}>
  <option value={0}>No Outfit</option>
  <option value={1}>Wizard Hat</option>
  <option value={2}>Headphones</option>
</select>

<h2>Preview</h2>

<Pet {pet} />

<button on:click={handleSubmit}> Create Pet </button>
