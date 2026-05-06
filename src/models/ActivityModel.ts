import { AppDataSource } from '../dataSource.js';
import { Activity } from '../entities/Activity.js';
import { User } from '../entities/User.js';

const activityRepository = AppDataSource.getRepository(Activity);

async function getActivitiesModel(userId: string): Promise<Activity[]> {
  //RETURN activies user owns
  return await activityRepository.find({ where: { user: { userId } } });
}

async function createActivityModel(
  title: string,
  text: string,
  hours: number,
  activityDate: Date,
  user: User,
): Promise<Activity> {
  const newActivity = new Activity();
  newActivity.title = title;
  newActivity.text = text;
  newActivity.hours = hours;
  newActivity.activityDate = activityDate;
  newActivity.user = user;
  return await activityRepository.save(newActivity);
}

async function getActivityByIdModel(activityId: string): Promise<Activity | null> {
  return await activityRepository.findOne({ where: { activityId }, relations: ['user'] });
}

async function updateActivityModel(
  activityId: string,
  updates: Partial<Pick<Activity, 'title' | 'text' | 'hours' | 'activityDate'>>,
): Promise<Activity | null> {
  await activityRepository.update({ activityId }, { ...updates, updatedAt: new Date() }); // ... spread op
  return getActivityByIdModel(activityId);
}

export { createActivityModel, getActivitiesModel, getActivityByIdModel, updateActivityModel };
