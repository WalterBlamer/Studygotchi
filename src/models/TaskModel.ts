import { AppDataSource } from '../dataSource.js';
import { Task } from '../entities/Task.js';
import { User } from '../entities/User.js';

const taskRepository = AppDataSource.getRepository(Task);

async function getAllTasksModel(userId: string): Promise<Task[]> {
  //only return tasks that the user owns
  return await taskRepository.find({ where: { user: { userId } } });
}

async function createTaskModel(
  title: string,
  text: string,
  completed: boolean,
  user: User,
): Promise<Task> {
  const newTask = new Task();
  newTask.title = title;
  newTask.text = text;
  newTask.user = user;
  newTask.completed = completed;
  return await taskRepository.save(newTask);
}

async function getTaskByIdModel(taskId: string): Promise<Task | null> {
  return await taskRepository.findOne({ where: { taskId } });
}

async function updateTaskModel(
  taskId: string, // updates: title, text, completed are optional
): Promise<Task | null> {
  const task = await getTaskByIdModel(taskId);
  await taskRepository.update({ taskId }, { completed: !task.completed, updatedAt: new Date() });
  return getTaskByIdModel(taskId); // return the now updated Task to send as response
}

export { createTaskModel, getAllTasksModel, getTaskByIdModel, updateTaskModel };
