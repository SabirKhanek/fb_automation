import { UserService } from "./user";
import { CONFIG } from "../shared/config";
import _ from "lodash";
import * as jwt from "jsonwebtoken";
import util from "util";
import { ErrorWithStatus } from "../shared/utils/errorWithStatus";
import { UserModel } from "../db/models/user";

const { JWT_SECRET } = CONFIG;

export type JWT_PAYLOAD = Omit<UserModel["dataValues"], "password">;

export class AuthService {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }
  async authenticate(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username);
    if (!user) throw new ErrorWithStatus("User not found", 401);

    const passwordInDb = user.password;
    if (password !== passwordInDb)
      throw new ErrorWithStatus("Password incorrect", 401);

    if (!JWT_SECRET) throw new ErrorWithStatus("Private key not set", 500);
    const obj = UserService.filterPasswordFromUser(user);
    const token = this.signJwt(JSON.stringify(obj));

    return token;
  }

  signJwt(payload: string) {
    return jwt.sign(payload, JWT_SECRET);
  }

  validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded as JWT_PAYLOAD;
    } catch (err) {
      console.log(err);
      throw new ErrorWithStatus("Failed to authenticate the token", 403);
    }
  }
}
