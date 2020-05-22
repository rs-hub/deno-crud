import { Account } from "../domain/account.ts";
import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import accountRepository from "../repository/account.ts";

async function getById(ctx: Context) {
  const id: Account["id"] = 1;
  const account = await accountRepository.getById(id);
  if (!account) throw new Error("no found");
  ctx.response.body = account;
}

async function create(ctx: Context) {
  const account: Account = {
    id: 1,
    login: "rs-hub",
  }

  await accountRepository.create(account);
  ctx.response.status = Status.Created;
}

async function update(ctx: Context) {
  const id: Account["id"] = 1;

  await accountRepository.update();
  ctx.response.status = Status.OK;
}

export default { 
    getById, 
    create, 
    update
 };
