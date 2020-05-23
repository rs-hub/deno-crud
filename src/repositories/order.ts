import { QueryResult } from "https://deno.land/x/postgres/query.ts";
import { Order } from '../domain/order.ts'
import client from "../db/postgres.ts";
import { buildUpdateQuery } from "../utils/repositories/index.ts";

export interface IOrderRepository extends Order {
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IOrderRepositoryMethods {
    getAll(): Promise<any>;
    create(order: IOrderRepository): Promise<QueryResult>;
    updateById(id: number, obj: object): Promise<void>;
}

class OrderRepository implements IOrderRepositoryMethods {
    async getAll() {
        const orders = await client.query({
            text: `
            SELECT id, account_id, items_id, description, "createdAt", "updatedAt" FROM orders
          `,
          });
      
          return orders.rowsOfObjects()[0]
    }

    async create(order: IOrderRepository) {
        return client.query({
            text: `
              INSERT INTO orders (account_id, items_id, description, "createdAt", "updatedAt")
              VALUES ($1, $2, $3, $4, $5)
              `,
            args: [order.account_id, order.items_id, order.description, new Date(), new Date()],
          });
    }

    async updateById(id: number, obj: object) {
      const { text, args } = buildUpdateQuery({
        tableName: 'orders',
        where: { id },
        data: obj
      })
  
      await client.query({ text, args });
    }
}

export default new OrderRepository()