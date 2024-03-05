import { User, UserModel } from "./user";

import {
  CreationOptional,
  ForeignKey,
} from "./../../../node_modules/sequelize/types/model.d";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../connection";

export class CookiesAccountsModel extends Model<
  InferAttributes<CookiesAccountsModel>,
  InferCreationAttributes<CookiesAccountsModel>
> {
  declare cookies: string;
  declare cookieId?: CreationOptional<number>;
  declare status?: CreationOptional<"HEALTHY" | "INVALID" | "PENDING">;
  declare ownerUid: ForeignKey<UserModel["username"]>;
}
export const CookiesAccounts = CookiesAccountsModel.init(
  {
    cookies: {
      type: DataTypes.STRING(5000),
      unique: true,
    },
    cookieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["HEALTHY", "INVALID", "PENDING"],
      defaultValue: "PENDING",
    },
  },
  { tableName: "cookies_accounts", sequelize: sequelize }
);
