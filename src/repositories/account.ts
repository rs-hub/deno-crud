import { Account } from "../domain/account.ts";
import client from "../db/postgres.ts";
import { QueryResult } from "https://deno.land/x/postgres/query.ts";

const tableName = "Accounts";
export interface IAccountRepository extends Account {
  pass?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAccountRepositoryMethods {
  getById(id: number): Promise<any>;
  create(account: IAccountRepository): Promise<QueryResult>;
  updateById(id: number, obj: object): Promise<void>;
}

class AccountRepository implements IAccountRepositoryMethods {
  async getById(id: number) {
    const accounts = await client.query({
      text: `
      SELECT id, login, name, "createdAt"
        FROM accounts
      WHERE id = $1
    `,
      args: [id],
    });

    return accounts.rowsOfObjects()[0];
  }

  async create(account: IAccountRepository) {
    return client.query(
      `INSERT INTO Accounts (login, name, pass, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5)`,
      account.login,
      account.name,
      account.pass,
      new Date(),
      new Date(),
    );
  }

  async updateById(id: number, obj: any): Promise<void> {
    const set = [];
    const values = [];
    for (const [key, v] of Object.entries(obj)) {
      if (key !== "id") {
        set.push(`${key} = $${set.length + 1}`);
        values.push(v);
      }
    }

    values.push(id);

    const sql = `
    UPDATE accounts
      SET ${set.join(", ")}
    WHERE id = $${values.length};
    `;

    client.query({
      text: sql,
      args: values,
    });
  }
}

export default new AccountRepository();
