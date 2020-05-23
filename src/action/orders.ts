import { Route, Router } from "https://deno.land/x/oak/mod.ts";
import order from "../controllers/order.ts";

const router = new Router();
router
  .get("/orders", order.getAll)
  .post("/orders", order.create)
  .put("/orders", order.update);

export default router;
