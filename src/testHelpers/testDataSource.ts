import { DataSource } from 'typeorm';
import { Achievement } from '../entities/Achievement.js';
import { Activity } from '../entities/Activity.js';
import { Event } from '../entities/Event.js';
import { Note } from '../entities/Note.js';
import { Pet } from '../entities/Pet.js';
import { Purchase } from '../entities/Purchase.js';
import { ShopItem } from '../entities/ShopItem.js';
import { StudyRoom } from '../entities/StudyRoom.js';
import { Task } from '../entities/Task.js';
import { User } from '../entities/User.js';
import { UserAchievement } from '../entities/UserAchievement.js';

export const TestDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  dropSchema: true,
  entities: [
    User,
    User,
    Pet,
    Note,
    Task,
    Purchase,
    ShopItem,
    Achievement,
    UserAchievement,
    Activity,
    Event,
    StudyRoom,
  ],
});
