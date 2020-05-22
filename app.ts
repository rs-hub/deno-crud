import { Application } from "https://deno.land/x/oak/mod.ts";
import accountAction from "./src/action/account.ts";

const env = Deno.env.toObject();
const HOST = env.HOST || "127.0.0.1";
const PORT = env.PORT || 3000;

const app = new Application();
app.use(accountAction.routes());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
