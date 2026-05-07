<script lang="ts">
  import { createPet } from '$lib/services/petService';

  let petName = '';
  let speciesId = 1;

  async function handleSubmit() {
    await createPet({
      petName,
      speciesId,
    });
  }
</script>

<input bind:value={petName} placeholder="Pet name" />

<select bind:value={speciesId}>
  <option value={1}>Dog</option>
  <option value={2}>Llama</option>
</select>

<button on:click={handleSubmit}> Create Pet </button>
