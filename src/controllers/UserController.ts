import argon2 from 'argon2';
import { Request, Response } from 'express';
import { addUser, getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { RegistrationSchema } from '../validators/UserValidator.js';

async function createUser(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password, displayName } = result.data;

  try {
    const passwordHash = await argon2.hash(password);
    const newUser = await addUser(email, passwordHash, displayName);
    console.log(newUser);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function logIn(req: Request, res: Response): Promise<void> {
  const result = RegistrationSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { email, password } = result.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(403);
      return;
    }

    const { passwordHash } = user;
    if (!(await argon2.verify(passwordHash, password))) {
      res.sendStatus(403);
      return;
    }

    await req.session.clearSession();

    req.session.authenticatedUser = {
      userId: user.userId,
      email: user.email,
      displayName: user.displayName,
    };
    req.session.isLoggedIn = true;

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function getUser(req: Request, res: Response): Promise<void> {
  const { email } = req.params as { email: string }; // make sure it's a string
  const user = await getUserByEmail(email);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({ user });
}

// For viewing your own profile
async function getUserProfile(req: Request, res: Response): Promise<void> {
  if (!req.session.isLoggedIn) {
    res.sendStatus(401);
    return;
  }

  const { email } = req.session.authenticatedUser;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

async function logOut(req: Request, res: Response): Promise<void> {
  await req.session.clearSession();
  res.sendStatus(204);
}

export { createUser, getUser, logIn, logOut, getUserProfile };
