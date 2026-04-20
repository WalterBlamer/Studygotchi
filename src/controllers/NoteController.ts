import { Request, Response } from 'express';
import {
  createNoteModel,
  getNoteByIdModel,
  getNotesModel,
  updateNoteModel,
} from '../models/NoteModel.js';
import { getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateNoteSchema, EditNoteSchema } from '../validators/NoteValidator.js';

async function createNote(req: Request, res: Response): Promise<void> {
  const result = CreateNoteSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { title, text } = result.data;
  const { email } = req.session.authenticatedUser;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const newNote = await createNoteModel(title, text, user);
    console.log(newNote);
    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getNotes(req: Request, res: Response): Promise<void> {
  const { userId } = req.session.authenticatedUser;

  try {
    const notes = await getNotesModel(userId);
    res.status(200).json(notes);
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

    // check if user owns the note before updating it
    if (note.user.userId !== req.session.authenticatedUser.userId) {
      res.sendStatus(403);
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

export { createNote, getNotes, updateNote };
