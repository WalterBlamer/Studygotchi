import { Request, Response } from 'express';
import {
  createNoteModel,
  getNoteByIdModel,
  getNoteByTitleModel,
  getNotesModel,
  updateNoteModel,
} from '../models/NoteModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateNoteSchema, EditNoteSchema } from '../validators/NoteValidator.js';

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

async function getNotes(req: Request, res: Response): Promise<void> {
  try {
    const notes = await getNotesModel();
    res.status(200).json(notes);
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

async function updateNote(req: Request, res: Response): Promise<void> {
  const { noteId } = req.params as { noteId: string };

  const result = EditNoteSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const note = await getNoteByIdModel(noteId);
    if (!note) {
      res.sendStatus(404);
      return;
    }

    // reminder: updateNoteModel returns the updated note
    const updatedNote = await updateNoteModel(noteId, result.data);
    res.status(200).json(updatedNote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createNote, getNoteByTitle, getNotes, updateNote };
