import { AppDataSource } from '../dataSource.js';
import { Achievement } from '../entities/Achievement.js';
import { User } from '../entities/User.js';
import { UserAchievement } from '../entities/UserAchievement.js';

const achievementRepository = AppDataSource.getRepository(Achievement);
const userAchievementRepository = AppDataSource.getRepository(UserAchievement);

async function getAllAchievements(): Promise<Achievement[]> {
  return achievementRepository.find();
}

async function getUserAchievements(userId: string): Promise<UserAchievement[]> {
  return userAchievementRepository.find({
    where: { user: { userId } },
    relations: ['achievement'],
  });
}

async function checkAndAwardAchievements(user: User, loginStreak: number): Promise<number> {
  const achievements = await getAllAchievements();
  let pointsEarned = 0;

  for (const achievement of achievements) {
    // Find existing UserAchievement
    let userAchievement = await userAchievementRepository.findOne({
      where: {
        user: { userId: user.userId },
        achievement: { achievementId: achievement.achievementId },
      },
      relations: ['achievement'],
    });

    // Or create a new one
    if (!userAchievement) {
      userAchievement = new UserAchievement();
      userAchievement.user = user;
      userAchievement.achievement = achievement;
      userAchievement.progress = 0;
      userAchievement.completed = false;
    }

    // Skip if already completed
    if (userAchievement.completed) continue;

    // Update progress
    userAchievement.progress = loginStreak;

    // Award if necessary
    if (userAchievement.progress >= achievement.targetProgess) {
      userAchievement.completed = true;
      pointsEarned += achievement.pointValue;
    }

    await userAchievementRepository.save(userAchievement);
  }

  return pointsEarned;
}

export { checkAndAwardAchievements, getAllAchievements, getUserAchievements };
