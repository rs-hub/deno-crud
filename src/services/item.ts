import { Sha256 } from "https://deno.land/std/hash/sha256.ts";
import ItemsRepository, {
  IItemRepository,
} from "../repositories/item.ts";

interface IItemService {
  getItemsList(id: number): Promise<any>;
  createItem(account: IItemRepository): Promise<void>;
  updatItem(id: number, value: {}): Promise<void>;
}

class ItemService implements IItemService {
  async getItemsList(id: number) {
    return await ItemsRepository.getAll();
  }
  async createItem(item: IItemRepository) {
    await ItemsRepository.create(item);
  }
  async updatItem(id: number, value: {}) {
    await ItemsRepository.updateById(id, value);
  }
}

export default new ItemService();
