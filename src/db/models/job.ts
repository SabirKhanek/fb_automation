import {
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { UserModel } from "./user";
import { DataType } from "sequelize-typescript";
import { sequelize } from "../connection";
import { TaskModel } from "./task";

export class JobModel extends Model<
  InferAttributes<JobModel>,
  InferCreationAttributes<JobModel>
> {
  declare jobId: CreationOptional<number>;
  declare ownerUid: ForeignKey<UserModel["username"]>;
  declare jobTitle: string;
  declare tasks?: NonAttribute<TaskModel[]>;
  declare jobDetails?: CreationOptional<string>;
}

export const Job = JobModel.init(
  {
    jobId: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    jobTitle: { type: DataType.STRING(1000) },
    jobDetails: { type: DataType.STRING(5000) },
  },
  { tableName: "job", sequelize: sequelize }
);
