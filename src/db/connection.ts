import { Sequelize } from "sequelize";
import { CONFIG } from "../shared/config";

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = CONFIG;
if (!(DB_NAME && DB_USER && DB_PASSWORD && DB_HOST))
  throw new Error("DB Config is required");

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // You might need to adjust this based on your SSL configuration
    },
  },
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
