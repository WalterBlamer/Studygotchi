import { AppDataSource } from '../dataSource.js';
import { Note } from '../entities/Note.js';

const noteRepository = AppDataSource.getRepository(Note);

async function getNotesModel(): Promise<Note[]> {
  return await noteRepository.find();
}

async function getNoteByIdModel(noteId: string): Promise<Note | null> {
  return await noteRepository.findOne({ where: { noteId } });
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

async function updateNoteModel(
  noteId: string,
  updates: Partial<Pick<Note, 'title' | 'text'>>, // updates: title and text are optional
): Promise<Note | null> {
  await noteRepository.update({ noteId }, { ...updates, updatedAt: new Date() }); // ... spread op
  return getNoteByIdModel(noteId); // return the now updated Note to send as response
}

export { createNoteModel, getNoteByIdModel, getNoteByTitleModel, getNotesModel, updateNoteModel };
