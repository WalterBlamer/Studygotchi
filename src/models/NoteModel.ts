import { AppDataSource } from '../dataSource.js';
import { Note } from '../entities/Note.js';

const noteRepository = AppDataSource.getRepository(Note);

async function getAllNotesModel(): Promise<Note[]> {
  return await noteRepository.find();
}

async function getNoteByTitleModel(title: string): Promise<Note | null> {
  return await noteRepository.findOne({ where: { title } });
}

async function createNoteModel(title: string, text: string): Promise<Note> {
  const newNote = new Note();
  newNote.title = title;
  newNote.text = text;
  return await noteRepository.save(newNote);
}

export { createNoteModel, getAllNotesModel, getNoteByTitleModel };
