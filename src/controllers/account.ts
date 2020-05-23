import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import AccountService from "../services/account.ts";

interface IAccountController {
  getById(ctx: any): Promise<void>;
  create(ctx: Context): Promise<void>;
  update(ctx: Context): Promise<void>;
}

class AccountController implements IAccountController {
  async getById(ctx: any) {
    const id = ctx.params.id;

    const account = await AccountService.getAccountById(id);
    ctx.response.status = Status.OK;
    ctx.response.body = account;
  }

  async create(ctx: Context) {
    const { login, name, pass } = (await ctx.request.body()).value;

    await AccountService.createAccount({ login, name, pass });
    ctx.response.status = Status.Created;
    ctx.response.body = { message: "ok" };
  }

  async update(ctx: any) {
    const body = await ctx.request.body();
    const account_id = ctx.params.id;

    await AccountService.updateAccount(account_id, body.value);
    ctx.response.status = Status.OK;
    ctx.response.body = { message: "ok" };
  }
}

export default new AccountController();
