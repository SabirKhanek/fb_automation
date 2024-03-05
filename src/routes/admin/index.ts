import { Router } from "express";
import Joi from "joi";
import { ErrorWithStatus } from "../../shared/utils/errorWithStatus";
import { CONFIG } from "../../shared/config";
import { UserService } from "../../services/user";

export const adminRouter = Router();

const addUserSchema = Joi.object<{
  username: string;
  password: string;
  key: string;
}>({
  username: Joi.string().lowercase().required(),
  password: Joi.string().required(),
  key: Joi.string().required(),
});

adminRouter.post("/addUser", async (req, res) => {
  try {
    const { value, error } = addUserSchema.validate(req.body);
    if (error) throw new ErrorWithStatus(error.details[0].message, 400);
    if (value.key !== CONFIG.MASTER_KEY)
      throw new ErrorWithStatus("Key is invalid", 400);
    const userService = new UserService();
    const user = await userService.createUser(value.username, value.password);
    res.send({ success: true });
  } catch (err: any) {
    res
      .status(err.statusCode || 500)
      .send({ success: false, reason: err?.message || "Server Error" });
  }
});

adminRouter.delete("/removeUser", async (req, res) => {
  // TODO: Implement this controller
});
