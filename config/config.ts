const env = Deno.env.toObject();

export const HOST = env.HOST || "127.0.0.1";
export const PORT = env.PORT || 3000;
export const SALT = env.SALT || "salt";
