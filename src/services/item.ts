import ItemsRepository, {
  IItemRepository,
} from "../repositories/item.ts";

interface IItemService {
  getItemsList(): Promise<any>;
  createItem(item: IItemRepository): Promise<void>;
  updatItem(id: number, value: {}): Promise<void>;
}

class ItemService implements IItemService {
  async getItemsList() {
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
