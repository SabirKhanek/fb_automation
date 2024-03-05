import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { JobModel } from "./job";
import { sequelize } from "../connection";

export class TaskModel extends Model<
  InferAttributes<TaskModel>,
  InferCreationAttributes<TaskModel>
> {
  declare taskId: CreationOptional<number>;
  declare taskTitle: string;
  declare status: CreationOptional<"SUCCESS" | "FAILED" | "QUEUED">;
  declare failureReason?: CreationOptional<string>;
  declare parentJobId: ForeignKey<JobModel["jobId"]>;
}

export const Task = TaskModel.init(
  {
    taskId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    status: {
      type: DataTypes.ENUM,
      values: ["SUCCESS", "FAILED", "QUEUED"],
      defaultValue: "QUEUED",
    },
    taskTitle: { type: DataTypes.STRING },
    failureReason: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  { tableName: "task", sequelize: sequelize }
);
