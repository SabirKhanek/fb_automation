import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import { JobManagerService } from "../../services/job";
import Joi from "joi";
import { ErrorWithStatus } from "../../shared/utils/errorWithStatus";

export const jobRouter = Router();
const jobService = new JobManagerService();

jobRouter.get("/getAll", authenticate, async (req, res) => {
  try {
    if (!req.authUser?.username) return res.apiError("Unauthorized", 401);
    const jobs = await jobService.getJobsInitatedByUser(req.authUser?.username);
    return res.apiSuccess(jobs);
  } catch (err) {}
});

jobRouter.get("/getTasks/:jobId", authenticate, async (req, res, next) => {
  try {
    const { value, error } = Joi.number()
      .required()
      .validate(req.params["jobId"]);
    if (error) throw new ErrorWithStatus(error.details[0].message, 400);
    const tasks = await jobService.getTasksInJob(value);

    res.apiSuccess(tasks);
  } catch (err: any) {
    res.apiError(err.message, err.statusCode);
  }
});
