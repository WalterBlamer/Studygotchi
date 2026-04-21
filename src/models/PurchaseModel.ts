import { AppDataSource } from '../dataSource.js';
import { Purchase } from '../entities/Purchase.js';
import { ShopItem } from '../entities/ShopItem.js';
import { User } from '../entities/User.js';

const purchaseRepository = AppDataSource.getRepository(Purchase);
const userRepository = AppDataSource.getRepository(User);

async function getPurchasesByUserIdModel(userId: string): Promise<Purchase[]> {
  return await purchaseRepository.find({
    where: { user: { userId } },
    relations: ['shopItem'], // get item details too
  });
}

async function createPurchaseModel(user: User, shopItem: ShopItem): Promise<Purchase> {
  // deduct points from user
  await userRepository.update(
    { userId: user.userId },
    { points: user.points - shopItem.pointCost },
  );

  // record the purchase
  const newPurchase = new Purchase();
  newPurchase.user = user;
  newPurchase.shopItem = shopItem;
  return await purchaseRepository.save(newPurchase);
}

export { createPurchaseModel, getPurchasesByUserIdModel };
