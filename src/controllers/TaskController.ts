import { Request, Response } from 'express';
import {
  createTaskModel,
  getAllTasksModel,
  getTaskByIdModel,
  updateTaskModel,
} from '../models/TaskModel.js';
import { getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateTaskSchema, EditTaskSchema } from '../validators/TaskValidator.js';

async function createTask(req: Request, res: Response): Promise<void> {
  const result = CreateTaskSchema.safeParse(req.body);

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

    const newTask = await createTaskModel(title, text, false, user);
    console.log(newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getTasks(req: Request, res: Response): Promise<void> {
  const { userId } = req.session.authenticatedUser;

  try {
    const tasks = await getAllTasksModel(userId);
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateTask(req: Request, res: Response): Promise<void> {
  const { taskId } = req.params as { taskId: string };

  const result = EditTaskSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const task = await getTaskByIdModel(taskId);
    if (!task) {
      res.sendStatus(404);
      return;
    }

    // check if user owns the task before updating it
    if (task.user.userId !== req.session.authenticatedUser.userId) {
      res.sendStatus(403);
      return;
    }

    // reminder: updateTaskModel returns the updated note
    const updatedTask = await updateTaskModel(taskId, result.data);
    res.status(200).json(updatedTask);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createTask, getTaskByIdModel, getTasks, updateTask };
