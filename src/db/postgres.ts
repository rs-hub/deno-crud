import { Client, Pool } from "https://deno.land/x/postgres/mod.ts";

async function createTables(client: Pool) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS accounts
    (
        id          SERIAL NOT NULL PRIMARY KEY,
        login       TEXT NOT NULL,
        name        TEXT NOT NULL,
        pass        TEXT NOT NULL,
        "createdAt" DATE NOT NULL,
        "updatedAt" DATE,

        UNIQUE (login)
    );`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS items
    (
        id            SERIAL NOT NULL PRIMARY KEY,
        title         TEXT NOT NULL,
        description   TEXT NOT NULL,
        "createdAt"   DATE NOT NULL,
        "updatedAt"   DATE
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS orders
    (
        id            SERIAL NOT NULL PRIMARY KEY,
        account_id    INTEGER NOT NULL REFERENCES accounts (id),
        item_id       INTEGER NOT NULL REFERENCES items (id),
        comment       TEXT,
        "createdAt"   DATE NOT NULL,
        "updatedAt"   DATE,
    
        UNIQUE (account_id, item_id)
    );
  `);
}

class Database {
  pool: Pool;
  constructor() {
    this.pool = new Pool({
      user: "deno_crud",
      database: "deno_crud",
      hostname: "localhost",
      password: "12345678",
      port: 5432,
    }, 20);
    this.connect().then(() => createTables(this.pool));
  }

  async connect() {
    await this.pool.connect();
  }
}

export default new Database().pool;
