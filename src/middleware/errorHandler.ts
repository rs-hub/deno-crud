import { Context, Status } from "https://deno.land/x/oak/mod.ts";

export default async (ctx: Context, next: Function) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { msg: err.message };
  }
};
