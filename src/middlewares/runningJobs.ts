import { NextFunction, Request, Response } from "express";
import { ErrorWithStatus } from "../shared/utils/errorWithStatus";

export async function runningJobs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.authUser) throw new ErrorWithStatus("Unauthorized", 401);
  } catch (err) {}
}
