import OrderRepository, {
  IOrderRepository,
} from "../repositories/order.ts";

interface IOrderService {
  getOrdersList(): Promise<any>;
  createOrder(account: IOrderRepository): Promise<void>;
  updatOrder(id: number, value: {}): Promise<void>;
}

class OrderService implements IOrderService {
  async getOrdersList() {
    return await OrderRepository.getAll();
  }
  async createOrder(order: IOrderRepository) {
    await OrderRepository.create(order);
  }
  async updatOrder(id: number, value: {}) {
    await OrderRepository.updateById(id, value);
  }
}

export default new OrderService();
