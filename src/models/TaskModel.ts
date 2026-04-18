import { AppDataSource } from '../dataSource.js';
import { Task } from '../entities/Task.js';

const taskRepository = AppDataSource.getRepository(Task);

async function createTaskModel(title: string, text: string): Promise<Task> {
  const newTask = new Task();
  newTask.title = title;
  newTask.text = text;
  return await taskRepository.save(newTask);
}

async function getAllTasksModel(): Promise<Task[]> {
  return await taskRepository.find();
}

export { createTaskModel, getAllTasksModel };
