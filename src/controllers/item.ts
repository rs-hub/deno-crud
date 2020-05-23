import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import ItemService from "../services/item.ts";

interface IItemController {
  getAll(ctx: any): Promise<void>;
  create(ctx: Context): Promise<void>;
  update(ctx: Context): Promise<void>;
}

class ItemController implements IItemController {
  async getAll(ctx: any) {
    const id = ctx.params.id;

    const items = await ItemService.getItemsList(id);
    ctx.response.status = Status.OK;
    ctx.response.body = items;
  }

  async create(ctx: Context) {
    const { title, description } = (await ctx.request.body()).value;

    await ItemService.createItem({ title, description });
    ctx.response.status = Status.Created;
    ctx.response.body = { message: "ok" };
  }

  async update(ctx: Context) {
    const body = await ctx.request.body();

    await ItemService.updatItem(body.value.id, body.value);
    ctx.response.status = Status.OK;
    ctx.response.body = { message: "ok" };
  }
}

export default new ItemController();
