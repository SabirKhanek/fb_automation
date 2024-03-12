import { Sequelize } from "sequelize";
import { CONFIG } from "../shared/config";
import { existsSync, mkdirSync } from "fs";
import path from "path";

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = CONFIG;
if (!(DB_NAME && DB_USER && DB_PASSWORD && DB_HOST))
  throw new Error("DB Config is required");

if (!existsSync(CONFIG.STORAGE)) {
  mkdirSync(CONFIG.STORAGE, { recursive: true });
}

const storagePath = path.join(CONFIG.STORAGE, "db.sqlite");

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  storage: storagePath,
  dialect: "sqlite",
  logging: false,
  sync: { alter: true },
});

(async () => {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log("Database connected successfully..");
    await sequelize.sync();
    return sequelize;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Error connecting database", error);
    return null;
  }
})();
