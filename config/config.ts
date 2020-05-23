const env = Deno.env.toObject();

export const HOST: any = env.HOST || "127.0.0.1";
export const PORT: any = env.PORT || 3000;
export const SALT: any = env.SALT || "salt";

export const DATABASE_USERNAME: any = env.DATABASE_USERNAME || "deno_crud";
export const DATABASE_NAME: any = env.DATABASE_NAME || "deno_crud";
export const DATABASE_HOSTNAME: any = env.DATABASE_HOSTNAME || "localhost";
export const DATABASE_PASSWORD: any = env.DATABASE_PASSWORD || "12345678";
export const DATABASE_PORT: any = env.DATABASE_PORT || 5432;
