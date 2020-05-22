import { Sha256 } from "https://deno.land/std/hash/sha256.ts";
import accountRepository, {
  IAccountRepository,
} from "../repositories/account.ts";
import { Account } from "../domain/account.ts";
import { SALT } from "../../config/config.ts";

interface IAccountService {
  getAccountById(id: number): Promise<IAccountRepository>;
  createAccount(account: IAccountRepository): Promise<void>;
  updateAccount(id: number, value: {}): Promise<void>;
}

class AccountService implements IAccountService {
  async getAccountById(id: number) {
    return await accountRepository.getById(id);
  }
  async createAccount(account: IAccountRepository) {
    const hash = new Sha256().update(account.pass + SALT)["hex"]();
    account.pass = hash;
    await accountRepository.create(account);
  }
  async updateAccount(id: number, value: {}) {
    await accountRepository.updateById(id, value);
  }
}

export default new AccountService();
