import { Job } from "../db";
import { JobModel } from "../db/models/job";
import { Task, TaskModel } from "../db/models/task";
import { ErrorWithStatus } from "../shared/utils/errorWithStatus";

export class JobManagerService {
  async initiateJob(username: string, jobTitle: string, jobDetails?: string) {
    try {
      const job = await Job.create({
        ownerUid: username,
        jobTitle,
        jobDetails: jobDetails || "",
      });
      return job;
    } catch (err: any) {
      throw new ErrorWithStatus(
        `There was an error initiating a job: ${err.message}`,
        500
      );
    }
  }

  async getJobsInitatedByUser(username: string) {
    try {
      const job = await Job.findAll({
        where: { ownerUid: username },
        include: [Task],
      });

      return job.map((jb) => jb.dataValues);
    } catch (err: any) {
      throw new ErrorWithStatus(
        `There was an error initiating a job: ${err.message}`,
        500
      );
    }
  }

  async assignTasks(titles: string[], jobId: JobModel["jobId"]) {
    const tasks = titles.map((tit) => {
      return { taskTitle: tit, parentJobId: jobId };
    });
    const result = await Task.bulkCreate(tasks);
    return result.map((res) => res.dataValues);
  }

  async getTasksInJob(jobId: JobModel["jobId"]) {
    const result = await Task.findAll({
      where: { parentJobId: jobId },
    });
    return result.map((res) => {
      const obj: any = res.dataValues;
      delete obj.parentJobId;
      return obj as Omit<TaskModel["dataValues"], "parentJobId">;
    });
  }

  async getTask(taskId: TaskModel["taskId"]) {
    const result = await Task.findAll({ where: { taskId } });
    return result;
  }

  async updateTaskStatus(
    taskId: TaskModel["taskId"],
    status: TaskModel["status"],
    reason?: TaskModel["failureReason"]
  ) {
    const obj: any = { status };
    if (reason) obj.failureReason = reason;
    return await Task.update(obj, { where: { taskId } });
  }
}
