import { CookiesAccounts, CookiesAccountsModel } from "./cookies_accounts";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { sequelize } from "../connection";

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare username: string;
  declare password: string;
  declare cookies_accounts?: NonAttribute<CookiesAccountsModel[]>;
}
export const User = UserModel.init(
  {
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: { type: DataTypes.STRING },
  },
  { tableName: "user", sequelize: sequelize }
);
