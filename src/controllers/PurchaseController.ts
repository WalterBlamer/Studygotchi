import { Request, Response } from 'express';
import { createPurchaseModel, getPurchasesByUserIdModel } from '../models/PurchaseModel.js';
import { getShopItemByIdModel } from '../models/ShopItemModel.js';
import { getUserByEmail } from '../models/UserModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';
import { CreatePurchaseSchema } from '../validators/PurchaseValidator.js';

async function createPurchase(req: Request, res: Response): Promise<void> {
  const result = CreatePurchaseSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json(result.error.flatten());
    return;
  }

  const { itemId } = result.data;
  const { email } = req.session.authenticatedUser;

  try {
    // get user to access their points
    const user = await getUserByEmail(email);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    const item = await getShopItemByIdModel(itemId);
    if (!item) {
      res.sendStatus(404);
      return;
    }

    // check if user has enough points
    if (user.points < item.pointCost) {
      res.status(400).json({ error: 'Not enough points' });
      return;
    }

    const newPurchase = await createPurchaseModel(user, item);
    res.status(201).json(newPurchase);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

async function getPurchases(req: Request, res: Response): Promise<void> {
  const { userId } = req.session.authenticatedUser;

  try {
    const purchases = await getPurchasesByUserIdModel(userId);
    res.status(200).json(purchases);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { createPurchase, getPurchases };
