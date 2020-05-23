import { Route, Router } from "https://deno.land/x/oak/mod.ts";
import item from "../controllers/item.ts";

const router = new Router();
router
  .get("/items", item.getAll)
  .post("/items", item.create)
  .put("/items/:id", item.update);

export default router;
