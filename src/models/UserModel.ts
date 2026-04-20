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

export { addUser, getAllUsers, getUserByEmail };
