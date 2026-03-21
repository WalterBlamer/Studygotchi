import { AppDataSource } from "../dataSource.js";
import { Notes } from "../entities/Note.js";

const noteRepository = AppDataSource.getRepository(Note);

async function getAllNotes(): Promise<Note[]> {
  return await noteRepository.find();
}

async function getNoteByTitle(title: string): Promise<Note | null> {
  return await noteRepository.findOne({ where: { title } });
}

async function createNote(title: string, text: string): Promise<Note> {
  const newNote = new Notes();
  newNote.title = title;
  newNote.text = text;
  return await noteRepository.save(note);
}

export { getAllNotes, getNoteByTitle, createNote };
