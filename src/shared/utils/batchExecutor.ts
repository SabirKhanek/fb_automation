import { InferAttributes } from "sequelize";
import { TaskModel } from "../../db/models/task";
import { CookiesAccountsModel } from "../../db/models/cookies_accounts";
import { CONFIG } from "../config";
import { JobManagerService } from "../../services/job";

export type Operation = {
  task: InferAttributes<
    TaskModel,
    {
      omit: never;
    }
  >;
  account: InferAttributes<
    CookiesAccountsModel,
    {
      omit: never;
    }
  >;
};

export type OperationFunction<T> = (
  operation: Operation,
  ...params: any[]
) => Promise<T>;

// Function to execute a batch of requests concurrently
async function executeBatch<T>(
  batch: Operation[],
  operationFunction: OperationFunction<T>,
  ...params: any[]
): Promise<void> {
  await Promise.all(
    batch.map(async (operation) => {
      // Execute the operation function with parameters here
      const jobService = new JobManagerService();

      try {
        await operationFunction(operation, ...params);
        await jobService.updateTaskStatus(operation.task.taskId, "SUCCESS");
      } catch (err: any) {
        try {
          const jobService = new JobManagerService();
          await jobService.updateTaskStatus(
            operation.task.taskId,
            "FAILED",
            err.message
          );
        } catch (err) {}
      }
    })
  );
}

// Function to execute the operations in batches
export async function executeInBatches<T>(
  operations: Operation[],
  operationFunction: OperationFunction<T>,
  ...params: any[]
): Promise<void> {
  for (let i = 0; i < operations.length; i += CONFIG.CONCURRENT_BATCH_SIZE) {
    const batch = operations.slice(i, i + CONFIG.CONCURRENT_BATCH_SIZE);
    await executeBatch(batch, operationFunction, ...params);
  }
}
