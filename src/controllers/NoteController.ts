import { Request, Response } from "express";
import { CreateNoteSchema } from "../validators/NoteValidator.js";
import { NoteModel } from "../models/NoteModel.js";
import { parseDatabaseError } from "../utils/db-utils.js";

async function createNote(req: Request, res: Response): Promise<void> {
  const result = CreateNoteSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { title, text } = result.data;

  try {
    const newNote = await addNote(title, text);
    console.log(newNote);
    res.sendStatus(201).json(newNote);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getNotes(req: Request, res: Response): Promise<void> {
  try {
    const notes = await getNotes();
    res.sendStatus(201).json(notes);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getNotesByTitle(req: Request, res: Response): Promise<void> {
  const title = req.params.title;

  if (!title) {
    res.status(400).json({ errors: "Note title required." });
    return;
  }

  try {
    const note = await getNotesByTitle(title);
    if (!note) {
      res.status(404).json({ errors: "Note not found." });
      return;
    }
    res.sendStatus(200).json(note);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createNote, getNotes, getNotesByTitle };
