import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import accountRepository from "../repositories/account.ts";
import { Sha256 } from "https://deno.land/std/hash/sha256.ts";
import { SALT } from "../../config/config.ts";

async function getById(ctx: any) {
  const id = ctx.params.id;

  const account = await accountRepository.getById(id);
  if (!account) {
    ctx.response.status = Status.NotFound;
    ctx.response.body = { message: "no found" };
    return;
  }

  ctx.response.status = Status.OK;
  ctx.response.body = account;
}

async function create(ctx: Context) {
  const body = await ctx.request.body();
  const hash = new Sha256().update(body.value.pass + SALT)["hex"]();
  body.value.pass = hash;

  await accountRepository.create(body.value);
  ctx.response.status = Status.Created;
  ctx.response.body = { message: "ok" };
}

async function update(ctx: Context) {
  const body = await ctx.request.body();

  await accountRepository.updateById(body.value.id, body.value);
  ctx.response.status = Status.OK;
  ctx.response.body = { message: "ok" };
}

export default {
  getById,
  create,
  update,
};
