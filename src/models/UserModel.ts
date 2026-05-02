import { AppDataSource } from '../dataSource.js';
import { User } from '../entities/User.js';

const userRepository = AppDataSource.getRepository(User);

async function addUser(email: string, passwordHash: string, displayName: string): Promise<User> {
  const newUser = new User();
  newUser.email = email;
  newUser.passwordHash = passwordHash;
  newUser.displayName = displayName;
  // userId is generated automatically by @BeforeInsert

  return userRepository.save(newUser);
}

async function getAllUsers(): Promise<User[]> {
  return userRepository.find();
}

async function getUserByEmail(email: string): Promise<User | null> {
  return userRepository.findOne({ where: { email } });
}

async function updateLastLogin(userId: string): Promise<void> {
  await userRepository.update({ userId }, { lastLoginAt: new Date() });
}

// Returns updated streak value (promise that resolves to number)
async function updateLoginStreak(user: User): Promise<number> {
  // Get current time and last time user logged in, (in milliseconds)
  const now = new Date();
  const last = new Date(user.lastLoginAt);

  const msSinceLastLogin = now.getTime() - last.getTime();
  // ms*1000 = s, s*60 = min, min*60 = hr, hr*24 = day
  // Use Math.floor to round down
  const daysSinceLastLogin = Math.floor(msSinceLastLogin / (1000 * 60 * 60 * 24));

  let newStreak: number;
  if (daysSinceLastLogin === 1) {
    newStreak = user.loginStreak + 1;
  } else if (daysSinceLastLogin === 0) {
    // No change, but still need to return newStreak later
    // Probably a better way to do this?
    newStreak = user.loginStreak;
  } else {
    newStreak = 1;
  }

  await userRepository.update({ userId: user.userId }, { loginStreak: newStreak });
  return newStreak;
}

async function addPointsToUser(userId: string, pointsToAdd: number): Promise<void> {
  await userRepository.increment({ userId }, 'points', pointsToAdd);
}

export {
  addPointsToUser,
  addUser,
  getAllUsers,
  getUserByEmail,
  updateLastLogin,
  updateLoginStreak,
};
