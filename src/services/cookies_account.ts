import { CookiesAccounts } from "../db";
import { CookiesAccountsModel } from "../db/models/cookies_accounts";
import { ErrorWithStatus } from "../shared/utils/errorWithStatus";

export class CookiesAccountsService {
  async registerCookies(user: string, cookies: string[]) {
    const cookieObjs: CookiesAccountsModel["dataValues"][] = cookies.map(
      (ck) => {
        return { ownerUid: user, cookies: ck };
      }
    );
    const createdCookies = await CookiesAccounts.bulkCreate(cookieObjs, {
      updateOnDuplicate: ["cookies"],
    });
    return createdCookies.map((ck) => ck.dataValues);
  }

  async getCookies(user: string) {
    const cookies = await CookiesAccounts.findAll({
      where: { ownerUid: user },
    });
    return cookies.map((ck) => ck.dataValues);
  }

  async getCookieWithId(user: string, cookieId: number) {
    const cookie = await CookiesAccounts.findOne({
      where: { ownerUid: user, cookieId },
    });
    return cookie ? cookie : undefined;
  }

  async updateStatus(
    user: string,
    cookieId: number,
    status: CookiesAccountsModel["status"]
  ) {
    const cookieToUpdate = await this.getCookieWithId(user, cookieId);
    if (!cookieToUpdate)
      throw new ErrorWithStatus("Such cookie do not exist", 404);
    cookieToUpdate.set("status", status);
    return (await cookieToUpdate.save()).dataValues;
  }

  async deleteCookie(user: string, cookieId: number) {
    const cookieToUpdate = await this.getCookieWithId(user, cookieId);
    if (!cookieToUpdate)
      throw new ErrorWithStatus("Such cookie do not exist", 404);
    await cookieToUpdate.destroy({ force: true });
  }
}
