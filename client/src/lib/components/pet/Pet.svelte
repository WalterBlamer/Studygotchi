<script lang="ts">
  export let pet;
</script>

<div class="pet-container">
  <img class="pet-image" src={`/pets/species-${pet.speciesId}.png`} alt={pet.petName} />
  <p>{pet.petName}</p>
</div>

<style>
  .pet-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pet-image {
    width: 120px;
    height: 120px;
    image-rendering: pixelated;
  }
</style>
