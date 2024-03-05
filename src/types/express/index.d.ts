import { Request, Response } from "express";
import { JWT_PAYLOAD } from "../../services/auth";
import { CookiesAccountsModel } from "../../db/models/cookies_accounts";

export interface StandardResponse extends Response {
  apiSuccess: (data: any, message?: string, statusCode?: number) => void;
  apiError: (
    message: string = "Interval Server Error",
    statusCode?: number
  ) => void;
}
export interface StandardRequest extends Request {
  authUser?: JWT_PAYLOAD;
}

declare global {
  namespace Express {
    interface Response {
      apiSuccess: (data: any, message?: string, statusCode?: number) => void;
      apiError: (
        message: string = "Interval Server Error",
        statusCode?: number
      ) => void;
    }
    interface Request {
      authUser?: JWT_PAYLOAD;
      authUserCookieAccounts?: CookiesAccountsModel["dataValues"][];
    }
  }
}
