import { AppDataSource } from '../dataSource.js';
import { Pet } from '../entities/Pet.js';

const petRepository = AppDataSource.getRepository(Pet);

async function addPet(
  petName: string,
  outfitId: number,
  colorSchemeId: number,
  speciesId: number,
): Promise<Pet> {
  const newPet = new Pet();
  newPet.petName = petName;
  newPet.outfitId = outfitId;
  newPet.colorSchemeId = colorSchemeId;
  newPet.speciesId = speciesId;
  // petId generated automatically by @BeforeInsert
  // happiness defaults to 50
  // createdAt defaults to timestamptz

  return petRepository.save(newPet);
}

async function getPetById(petId: string): Promise<Pet | null> {
  return petRepository.findOne({ where: { petId } });
}

export { addPet, getPetById };
