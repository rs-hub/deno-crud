import { Account } from "../domain/account.ts";
import client from "../db/postgres.ts";
import { QueryResult } from "https://deno.land/x/postgres/query.ts";
import { buildUpdateQuery } from "../utils/repositories/index.ts";

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

    const row = accounts.rowsOfObjects()[0];
    if (!row) throw new Error("no found");

    const account: IAccountRepository = {
      id: row.id,
      login: row.login,
      name: row.name,
      createdAt: row.createdAt,
    };
    return account;
  }

  async create(account: IAccountRepository) {
    return client.query({
      text: `
        INSERT INTO Accounts (login, name, pass, "createdAt", "updatedAt")
        VALUES ($1, $2, $3, $4, $5)
        `,
      args: [account.login, account.name, account.pass, new Date(), new Date()],
    });
  }

  async updateById(id: number, obj: any): Promise<void> {
    const { text, args } = buildUpdateQuery({
      tableName: "accounts",
      where: { id },
      data: obj,
    });

    await client.query({ text, args });
  }
}

export default new AccountRepository();
