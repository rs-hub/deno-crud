import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import ItemService from "../services/item.ts";

interface IItemController {
  getAll(ctx: any): Promise<void>;
  create(ctx: Context): Promise<void>;
  update(ctx: Context): Promise<void>;
}

class ItemController implements IItemController {
  async getAll(ctx: any) {
    const items = await ItemService.getItemsList();
    ctx.response.status = Status.OK;
    ctx.response.body = items;
  }

  async create(ctx: Context) {
    const { title, description } = (await ctx.request.body()).value;

    await ItemService.createItem({ title, description });
    ctx.response.status = Status.Created;
    ctx.response.body = { message: "ok" };
  }

  async update(ctx: any) {
    const body = await ctx.request.body();
    const item_id = ctx.params.id;

    await ItemService.updatItem(item_id, body.value);
    ctx.response.status = Status.OK;
    ctx.response.body = { message: "ok" };
  }
}

export default new ItemController();
