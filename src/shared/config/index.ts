import * as dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  PORT: process.env.PORT || 3000,
  DB_URL: process.env.DB_URL,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  MASTER_KEY: process.env.MASTER_KEY,
  JWT_SECRET: process.env.JWT_SECRET || "defaultjwtsecret",
  CONCURRENT_BATCH_SIZE: 150,
  DEVELOPMENT: process.env.NODE_ENV === "development",
  STORAGE: process.env.SQLITE_STORAGE || "./storage/db",
};
