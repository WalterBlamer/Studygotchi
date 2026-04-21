import { AppDataSource } from '../dataSource.js';
import { ShopItem } from '../entities/ShopItem.js';

const shopItemRepository = AppDataSource.getRepository(ShopItem);

async function getAllShopItemsModel(): Promise<ShopItem[]> {
  return await shopItemRepository.find();
}

async function getShopItemByIdModel(itemId: string): Promise<ShopItem | null> {
  return await shopItemRepository.findOne({ where: { itemId } });
}

export { getAllShopItemsModel, getShopItemByIdModel };
