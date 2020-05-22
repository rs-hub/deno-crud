import { Account } from "../domain/account.ts";

export interface IAccountRepository extends Account {
  pass?: string;
  createdAt: Date;
  updatedAt?: Date;
}

async function getById(id: number): Promise<IAccountRepository> {
  return {
    id: 1,
    login: "rs-hub",
    createdAt: new Date(),
  };
}

async function create(account: Account): Promise<Account> {
    return {
        id: 1,
        login: "rs-hub",
    };
}

async function update(): Promise<void> {}

export default {
  getById,
  create,
  update
};
