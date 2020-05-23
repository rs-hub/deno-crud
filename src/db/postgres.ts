import { Client, Pool } from "https://deno.land/x/postgres/mod.ts";

async function createTables(client: Pool) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS accounts
    (
        id          SERIAL NOT NULL PRIMARY KEY,
        login       TEXT,
        name        TEXT,
        pass        TEXT,
        "createdAt" DATE,
        "updatedAt" DATE,

        UNIQUE (login)
    );`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS items
    (
        id          SERIAL NOT NULL PRIMARY KEY,
        title       TEXT,
        description TEXT,
        "createdAt"   DATE,
        "updatedAt"   DATE
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS orders
    (
        id         SERIAL NOT NULL PRIMARY KEY,
        account_id INTEGER REFERENCES accounts (id),
        items_id   INTEGER REFERENCES items (id),
        "createdAt"  DATE,
        "updatedAt"  DATE,
    
        UNIQUE (account_id, items_id)
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
