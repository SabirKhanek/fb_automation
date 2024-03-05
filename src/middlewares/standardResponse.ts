import { NextFunction, Request, Response } from "express";
export const standardResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.apiSuccess = (data: any, message = "success", statusCode = 200) => {
    res.status(statusCode).send({ success: true, data, message, statusCode });
  };
  res.apiError = (message = "Internal Server Error", statusCode = 500) => {
    res.status(statusCode).send({ success: false, message, statusCode });
  };
  next();
};
