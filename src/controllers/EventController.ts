import { Request, Response } from 'express';
import {
  createEventModel,
  getAllEventsModel,
  getEventByIdModel,
  updateEventModel,
} from '../models/EventModel.js';
import { getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateEventSchema, EditEventSchema } from '../validators/EventValidator.js';

async function createEvent(req: Request, res: Response): Promise<void> {
  const result = CreateEventSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { text, eventDate } = result.data;
  const { email } = req.session.authenticatedUser;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const newEvent = await createEventModel(text, new Date(eventDate), user);
    console.log(newEvent);
    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getEvents(req: Request, res: Response): Promise<void> {
  const { userId } = req.session.authenticatedUser;

  try {
    const events = await getAllEventsModel(userId);
    res.status(200).json(events);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateEvent(req: Request, res: Response): Promise<void> {
  const { eventId } = req.params as { eventId: string };

  const result = EditEventSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const event = await getEventByIdModel(eventId);
    if (!event) {
      res.sendStatus(404);
      return;
    }

    // check if user owns the event before updating it
    if (event.user.userId !== req.session.authenticatedUser.userId) {
      res.sendStatus(403);
      return;
    }

    const updates = {
      ...result.data,
      ...(result.data.eventDate && { eventDate: new Date(result.data.eventDate) }),
    };

    // reminder: updateEventModel returns the updated event
    const updatedEvent = await updateEventModel(eventId, updates);
    res.status(200).json(updatedEvent);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createEvent, getEvents, updateEvent };
