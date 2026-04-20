import { AppDataSource } from '../dataSource.js';
import { Note } from '../entities/Note.js';
import { User } from '../entities/User.js';

const noteRepository = AppDataSource.getRepository(Note);

async function getNotesModel(userId: string): Promise<Note[]> {
  // only return notes that the user owns
  return await noteRepository.find({ where: { user: { userId } } });
}

async function createNoteModel(title: string, text: string, user: User): Promise<Note> {
  const newNote = new Note();
  newNote.title = title;
  newNote.text = text;
  newNote.user = user;
  return await noteRepository.save(newNote);
}

// Used for updating a note
async function getNoteByIdModel(noteId: string): Promise<Note | null> {
  return await noteRepository.findOne({ where: { noteId } });
}

async function updateNoteModel(
  noteId: string,
  updates: Partial<Pick<Note, 'title' | 'text'>>, // updates: title and text are optional
): Promise<Note | null> {
  await noteRepository.update({ noteId }, { ...updates, updatedAt: new Date() }); // ... spread op
  return getNoteByIdModel(noteId); // return the now updated Note to send as response
}

export { createNoteModel, getNoteByIdModel, getNotesModel, updateNoteModel };
