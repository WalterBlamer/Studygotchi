import { Request, Response } from 'express';
import { addPet, getPetById } from '../models/PetModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreatePetSchema } from '../validators/PetValidator.js';

async function createPet(req: Request, res: Response): Promise<void> {
  const result = CreatePetSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { petName, outfitId, colorSchemeId, speciesId } = result.data;

  try {
    const newPet = await addPet(petName, outfitId, colorSchemeId, speciesId);
    console.log(newPet);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getPet(req: Request, res: Response): Promise<void> {
  const { petId } = req.params as { petId: string };

  try {
    const pet = await getPetById(petId);
    if (!pet) {
      res.sendStatus(404);
      return;
    }
    res.json({ pet });
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createPet, getPet };
