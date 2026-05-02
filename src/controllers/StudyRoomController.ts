import { Request, Response } from 'express';
import {
  createStudyRoomModel,
  getAllStudyRoomsModel,
  getStudyRoomByIdModel,
  joinStudyRoomModel,
} from '../models/StudyRoomModel.js';
import { getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateStudyRoomSchema, JoinStudyRoomSchema } from '../validators/StudyRoomValidator.js';

async function createStudyRoom(req: Request, res: Response): Promise<void> {
  const result = CreateStudyRoomSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { roomName } = result.data;
  const { email } = req.session.authenticatedUser;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const newStudyRoom = await createStudyRoomModel(roomName, user);
    console.log(newStudyRoom);
    res.status(201).json(newStudyRoom);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getAllStudyRooms(req: Request, res: Response): Promise<void> {
  const { userId } = req.session.authenticatedUser;

  try {
    const studyRooms = await getAllStudyRoomsModel(userId);
    res.status(200).json(studyRooms);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getStudyRoomById(req: Request, res: Response): Promise<void> {
  const { studyRoomId } = req.params as { studyRoomId: string };

  try {
    const studyRoom = await getStudyRoomByIdModel(studyRoomId);
    if (!studyRoom) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(studyRoom);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function joinStudyRoom(req: Request, res: Response): Promise<void> {
  const result = JoinStudyRoomSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { joinCode } = result.data;
  const { email } = req.session.authenticatedUser;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const studyRoom = await joinStudyRoomModel(joinCode, user);
    if (!studyRoom) {
      res.status(404).json({ error: 'Invalid code' });
      return;
    }

    res.status(200).json(studyRoom);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createStudyRoom, getAllStudyRooms, getStudyRoomById, joinStudyRoom };
