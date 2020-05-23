import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import OrderService from "../services/order.ts";

interface IOrderController {
  getAll(ctx: any): Promise<void>;
  create(ctx: Context): Promise<void>;
  update(ctx: Context): Promise<void>;
}

class ItemController implements IOrderController {
  async getAll(ctx: any) {
    const items = await OrderService.getOrdersList();
    ctx.response.status = Status.OK;
    ctx.response.body = items;
  }

  async create(ctx: Context) {
    const { account_id, item_id, comment } = (await ctx.request.body()).value;

    await OrderService.createOrder({ account_id, item_id, comment });
    ctx.response.status = Status.Created;
    ctx.response.body = { message: "ok" };
  }

  async update(ctx: Context) {
    const body = await ctx.request.body();

    await OrderService.updatOrder(body.value.id, body.value);
    ctx.response.status = Status.OK;
    ctx.response.body = { message: "ok" };
  }
}

export default new ItemController();
