import { AppDataSource } from '../dataSource.js';
import { Event } from '../entities/Event.js';
import { User } from '../entities/User.js';

const eventRepository = AppDataSource.getRepository(Event);

async function getAllEventsModel(userId: string): Promise<Event[]> {
  return await eventRepository.find({ where: { user: { userId } } });
}

//proper way to do time??
async function createEventModel(text: string, date: Date, user: User): Promise<Event> {
  const newEvent = new Event();
  newEvent.text = text;
  newEvent.user = user;
  newEvent.date = date;
  return await eventRepository.save(newEvent);
}

async function getEventByIdModel(eventId: string): Promise<Event | null> {
  return await eventRepository.findOne({ where: { eventId } });
}

async function updateEventModel(
  eventId: string,
  updates: Partial<Pick<Event, 'text' | 'date'>>,
): Promise<Event | null> {
  await eventRepository.update({ eventId }, { ...updates, updatedAt: new Date() });
  return getEventByIdModel(eventId);
}

export { createEventModel, getAllEventsModel, getEventByIdModel, updateEventModel };
