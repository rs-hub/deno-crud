import { Application } from "https://deno.land/x/oak/mod.ts";
import accountAction from "./src/action/accounts.ts";
import items from "./src/action/items.ts";
import orders from "./src/action/orders.ts";
import { HOST, PORT } from "./config/config.ts";
import errorHandler from "./src/middleware/errorHandler.ts";

const app = new Application();
app.use(errorHandler);
app.use(accountAction.routes());
app.use(items.routes());
app.use(orders.routes());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
