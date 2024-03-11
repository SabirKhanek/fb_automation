import { Router } from "express";
import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ErrorWithStatus } from "../../shared/utils/errorWithStatus";
import { JobManagerService } from "../../services/job";
import { commentOnPost } from "../../shared/utils/comment_bot";
import {
  Operation,
  OperationFunction,
  executeInBatches,
} from "../../shared/utils/batchExecutor";
import { voteOnPoll } from "../../shared/utils/vote_bot";

export const toolsRouter = Router();

// Define common functions for commenting and voting
const commentOperationFunction = async (
  operation: Operation,
  url: string,
  comment_text: string
) => {
  await commentOnPost(url, operation.account.cookies, comment_text);
};

const voteOperationFunction = async (
  operation: Operation,
  qid: string,
  oid: string,
  post_url: string
) => {
  await voteOnPoll(qid, oid, operation.account.cookies, post_url);
};

// Define common schemas for commenting and voting
const commentSchema = Joi.object({
  url: Joi.string()
    .regex(/facebook.com/)
    .max(4000)
    .required(),
});

const voteSchema = Joi.object({
  question_id: Joi.string().required(),
  option_id: Joi.string().required(),
  post_url: Joi.string().required(),
});

const performAutoOperation = async (
  req: Request,
  res: Response,
  next: NextFunction,
  operationName: string,
  schema: Joi.ObjectSchema,
  jobTitle: string,
  operationFunction: OperationFunction<void>,
  operationParams: any[]
) => {
  try {
    const { value, error } = schema.validate(req.body);
    if (error) throw new ErrorWithStatus(error.details[0].message, 400);
    if (!req.authUserCookieAccounts)
      throw new ErrorWithStatus("Cookies are not fetched", 500);
    const jobService = new JobManagerService();
    if (!req.authUser) throw new ErrorWithStatus("Auth user not set", 401);
    const job = await jobService.initiateJob(
      req.authUser.username,
      jobTitle,
      JSON.stringify(value)
    );
    const titles = req.authUserCookieAccounts.map(
      (acc) => `${operationName} by cookieId: ${acc.cookieId}`
    );
    const tasks = await jobService.assignTasks(titles, job.jobId);
    res.apiSuccess({ ...job.dataValues, TaskModels: tasks });
    const operationsMap = tasks.map((task, index) => {
      return {
        task: task,
        // @ ts-ignore
        account: (req.authUserCookieAccounts &&
          req.authUserCookieAccounts[index]) as any,
      };
    });
    try {
      executeInBatches(operationsMap, operationFunction, ...operationParams);
    } catch (err) {
      // Handle batch execution error
    }
  } catch (err: any) {
    console.log(err);
    res.apiError(
      `Error occurred while performing auto operation: ${err.message}`
    );
  }
};

// Define route handlers using the generic function
toolsRouter.post(
  "/comment_bot",
  async (req: Request, res: Response, next: NextFunction) => {
    performAutoOperation(
      req,
      res,
      next,
      "Comment",
      commentSchema,
      "Auto Commenter",
      commentOperationFunction,
      [req.body.url, "Comment by auto tool"]
    );
  }
);

toolsRouter.post(
  "/vote_bot",
  async (req: Request, res: Response, next: NextFunction) => {
    performAutoOperation(
      req,
      res,
      next,
      "Vote",
      voteSchema,
      "Auto Voter",
      voteOperationFunction,
      [req.body.question_id, req.body.option_id, req.body.post_url]
    );
  }
);
