import { Application } from "https://deno.land/x/oak/mod.ts";
import accountAction from "./src/action/account.ts";
import { HOST, PORT } from "./config/config.ts";
import errorHandler from "./src/middleware/errorHandler.ts";
import Database from "./src/db/postgres.ts";

const app = new Application();
app.use(errorHandler);
app.use(accountAction.routes());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
