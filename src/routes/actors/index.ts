import Joi from "joi";
import { CookiesAccountsService } from "./../../services/cookies_account";
import { Router } from "express";
import { actorsSchema } from "../../schemas/actors";
import { authenticate } from "../../middlewares/authenticate";
import { ErrorWithStatus } from "../../shared/utils/errorWithStatus";
import multer from "multer";
export const actorRouter = Router();

actorRouter.get("/getall", authenticate, async (req, res) => {
  try {
    if (!req.authUser) throw new Error();
    const service = new CookiesAccountsService();
    const cookies = await service.getCookies(req.authUser.username);
    res.apiSuccess(cookies);
  } catch (err: any) {
    res.apiError(err.message, err.statusCode);
  }
});

actorRouter.post(
  "/cookiesPayload",
  authenticate,
  multer({ limits: { fieldSize: 10 * 1024 * 1024 } }).none(),
  async (req, res) => {
    try {
      const parsedData = JSON.parse(req.body.data);
      let data = parsedData;
      try {
        data = { cookies: data?.cookies?.filter((d: string) => d.length > 0) };
      } catch (err) {}
      const { value, error } = actorsSchema.validate(data);
      if (error) return res.apiError(error.details[0].message, 400);
      if (!req.authUser) throw new Error();
      const cookieService = new CookiesAccountsService();
      const resp = await cookieService.registerCookies(
        req.authUser.username,
        value.cookies
      );
      res.apiSuccess(resp);
    } catch (err: any) {
      res.apiError(err.message, err.statusCode);
    }
  }
);

actorRouter.post("/", authenticate, async (req, res) => {
  try {
    const { value, error } = actorsSchema.validate(req.body);
    if (error) return res.apiError(error.details[0].message, 400);
    if (!req.authUser) throw new Error();
    const cookieService = new CookiesAccountsService();
    const resp = await cookieService.registerCookies(
      req.authUser.username,
      value.cookies
    );
    res.apiSuccess(resp);
  } catch (err: any) {
    res.apiError(err.message, err.statusCode);
  }
});

actorRouter.delete("/", authenticate, async (req, res) => {
  try {
    const { value, error } = Joi.object<{ cookieId: number }>({
      cookieId: Joi.number().required(),
    }).validate(req.query);
    if (error) throw new ErrorWithStatus(error.details[0].message, 400);
    if (!req.authUser) throw new Error();
    const cookieService = new CookiesAccountsService();
    await cookieService.deleteCookie(req.authUser.username, value.cookieId);
    return res.apiSuccess("deleted");
  } catch (err: any) {
    res.apiError(err.message, err.statusCode);
  }
});

actorRouter.delete("/deleteall", authenticate, async (req, res) => {
  try {
    if (!req.authUser) throw new Error();
    const cookieService = new CookiesAccountsService();
    await cookieService.deleteAllUserCookies(req.authUser.username);
    return res.apiSuccess("deleted");
  } catch (err: any) {
    res.apiError(err.message, err.statusCode);
  }
});
