import _ from "lodash";
import { User } from "../db";
import { UserModel } from "../db/models/user";
import { ErrorWithStatus } from "../shared/utils/errorWithStatus";

export class UserService {
  async createUser(username: string, password: string) {
    if (await this.isUserExists(username))
      throw new ErrorWithStatus(`User: ${username} already exists`, 400);
    const user = await User.create({ username, password });
    return UserService.filterPasswordFromUser(user);
  }

  async isUserExists(username: string) {
    const user = await this.getUserByUsername(username, false);
    return user ? true : false;
  }

  static filterPasswordFromUser(user: UserModel) {
    const userWithoutPassword: any = user.dataValues;
    delete userWithoutPassword.password;
    return userWithoutPassword as Omit<UserModel["dataValues"], "password">;
  }

  async getUserByUsername(username: string, doThrow = true) {
    const user = await User.findByPk(username);
    if (!user)
      if (doThrow)
        throw new ErrorWithStatus(`User [${username}] not exists`, 404);
      else return;
    return user;
  }

  async deleteUser(username: string) {
    const user = await this.getUserByUsername(username);

    await user?.destroy();
  }
}
