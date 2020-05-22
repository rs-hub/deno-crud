import { Route, Router } from "https://deno.land/x/oak/mod.ts";
import account from "../controllers/account.ts";

const router = new Router();
router
  .get("/accounts/:id", account.getById)
  .post("/accounts", account.create)
  .post("/accounts/:id", account.update);

export default router;
