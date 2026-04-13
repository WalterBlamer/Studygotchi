import { Request, Response } from 'express';
import { createNoteModel, getAllNotesModel, getNoteByTitleModel } from '../models/NoteModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateNoteSchema } from '../validators/NoteValidator.js';

async function createNote(req: Request, res: Response): Promise<void> {
  const result = CreateNoteSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { title, text } = result.data;

  try {
    const newNote = await createNoteModel(title, text);
    console.log(newNote);
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getAllNotes(req: Request, res: Response): Promise<void> {
  try {
    const notes = await getAllNotesModel();
    res.status(201).json(notes);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getNoteByTitle(req: Request, res: Response): Promise<void> {
  const { title } = req.params as { title: string };

  if (!title) {
    res.status(400).json({ errors: 'Note title required.' });
    return;
  }

  try {
    const note = await getNoteByTitleModel(title);
    if (!note) {
      res.status(404).json({ errors: 'Note not found.' });
      return;
    }
    res.status(200).json(note);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createNote, getAllNotes, getNoteByTitle };
