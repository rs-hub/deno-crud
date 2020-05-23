import { QueryResult } from "https://deno.land/x/postgres/query.ts";
import { Item } from '../domain/item.ts'
import client from "../db/postgres.ts";
import { buildUpdateQuery } from "../utils/repositories/index.ts";

export interface IItemRepository extends Item {
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IItemRepositoryMethods {
    getAll(where: object): Promise<any>;
    create(item: IItemRepository): Promise<QueryResult>;
    updateById(id: number, obj: object): Promise<void>;
}

class OrderRepository implements IItemRepositoryMethods {
    async getAll(where?: object) {
        const items = await client.query({
            text: `SELECT id, title, description, "createdAt", "updatedAt" FROM items`,
            args: [],
          });
      
          return items.rowsOfObjects()
    }

    async create(item: IItemRepository) {
        return client.query({
            text: `
              INSERT INTO items (title, description, "createdAt", "updatedAt")
              VALUES ($1, $2, $3, $4)
              `,
            args: [item.title, item.description, new Date(), new Date()],
          });
    }

    async updateById(id: number, obj: object) {
      const { text, args } = buildUpdateQuery({
        tableName: 'items',
        where: { id },
        data: obj
      })
  
      await client.query({ text, args });
    }
}

export default new OrderRepository()