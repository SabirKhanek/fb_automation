import { sequelize } from "./connection";
import { CookiesAccounts } from "./models/cookies_accounts";
import { Job } from "./models/job";
import { Task } from "./models/task";
import { User } from "./models/user";

User.hasMany(CookiesAccounts, {
  foreignKey: "ownerUid",
  foreignKeyConstraint: true,
  onDelete: "CASCADE",
});

Job.hasMany(Task, { foreignKey: "parentJobId" });
Job.belongsTo(User, { foreignKey: "ownerUid" });
// User.create({ username: "sabir", password: "dev" });

export { User, CookiesAccounts, Job, Task, sequelize };
