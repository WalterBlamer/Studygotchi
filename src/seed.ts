import { AppDataSource } from './dataSource.js';
import { Achievement } from './entities/Achievement.js';

// Function to insert achievements into the database.
// Why? Otherwise, would have to hardcode into logIn function, which would check
// if the achievements have been added to the db or not, every time a user logs in
async function seed(): Promise<void> {
  await AppDataSource.initialize();

  const achievementRepository = AppDataSource.getRepository(Achievement);

  // add more achievements later?
  const achievements = [
    {
      name: 'First Login',
      description: 'Log in for the first time',
      pointValue: 5,
      targetProgress: 1,
    },
    {
      name: '3 Day Streak',
      description: 'Log in 3 days in a row',
      pointValue: 10,
      targetProgress: 3,
    },
    {
      name: '7 Day Streak',
      description: 'Log in 7 days in a row',
      pointValue: 25,
      targetProgress: 7,
    },
    {
      name: '14 Day Streak',
      description: 'Log in 14 days in a row',
      pointValue: 50,
      targetProgress: 14,
    },
  ];

  for (const achievement of achievements) {
    const exists = await achievementRepository.findOne({ where: { name: achievement.name } });
    if (!exists) {
      const newAchievement = achievementRepository.create(achievement);
      await achievementRepository.save(newAchievement);
      console.log(`Created achievement: ${achievement.name}`);
    } else {
      console.log(`Achievement already exists: ${achievement.name}`);
    }
  }

  await AppDataSource.destroy();
  console.log('Seeding complete!');
}

seed().catch(console.error);
