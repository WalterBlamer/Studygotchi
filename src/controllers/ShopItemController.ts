import { Request, Response } from 'express';
import { getAllShopItemsModel, getShopItemByIdModel } from '../models/ShopItemModel.js';
import { parseDatabaseError } from '../utils/db-utils.js';

// when a user opens the shop page and sees all items
async function getAllShopItems(req: Request, res: Response): Promise<void> {
  try {
    const items = await getAllShopItemsModel();
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

// when a user clicks on a specific item to see details? maybe unnecessary
async function getShopItem(req: Request, res: Response): Promise<void> {
  const { itemId } = req.params as { itemId: string };

  try {
    const item = await getShopItemByIdModel(itemId);
    if (!item) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
    const databaseErrorMessage = parseDatabaseError(err);
    res.status(500).json(databaseErrorMessage);
  }
}

export { getAllShopItems, getShopItem };
