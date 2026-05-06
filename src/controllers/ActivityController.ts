import { Request, Response } from 'express';
import {
  createActivityModel,
  getActivitiesModel,
  getActivityByIdModel,
  updateActivityModel,
} from '../models/ActivityModel.js';
import { getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreateActivitySchema, EditActivitySchema } from '../validators/ActivityValidator.js';

async function createActivity(req: Request, res: Response): Promise<void> {
  const result = CreateActivitySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ errors: result.error });
    return;
  }

  const { title, text, hours, activityDate } = result.data;
  const { email } = req.session.authenticatedUser;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const newActivity = await createActivityModel(title, text, hours, new Date(activityDate), user);
    console.log(newActivity);
    res.status(201).json(newActivity);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getActivities(req: Request, res: Response): Promise<void> {
  const { userId } = req.session.authenticatedUser;

  try {
    const activities = await getActivitiesModel(userId);
    res.status(200).json(activities);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function updateActivity(req: Request, res: Response): Promise<void> {
  const { activityId } = req.params as { activityId: string };

  const result = EditActivitySchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  try {
    const activity = await getActivityByIdModel(activityId);
    if (!activity) {
      res.sendStatus(404);
      return;
    }

    // check if user owns activity before updating it
    if (activity.user.userId !== req.session.authenticatedUser.userId) {
      res.sendStatus(403);
      return;
    }

    const updates = {
      ...result.data,
      ...(result.data.activityDate && {
        activityDate: new Date(result.data.activityDate),
      }),
    };

    // updateActivityModel returns the updated activity
    const updatedActivity = await updateActivityModel(activityId, updates);
    res.status(200).json(updatedActivity);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createActivity, getActivities, updateActivity };
