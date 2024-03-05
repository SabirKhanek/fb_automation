import { NextFunction, Request, Response } from "express";
import { CookiesAccountsService } from "../services/cookies_account";
import { ErrorWithStatus } from "../shared/utils/errorWithStatus";

export async function fetchUserCookies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.authUser) throw new ErrorWithStatus("Unauthorized", 401);
    const cookieService = new CookiesAccountsService();
    req.authUserCookieAccounts = await cookieService.getCookies(
      req.authUser?.username
    );
    next();
  } catch (err: any) {
    res.apiError(`Error fetching user cookies: ${err.message}`, err.statusCode);
  }
}
