import { Router } from "express";
import { adminRouter } from "./admin";
import { authRouter } from "./auth";
import { actorRouter } from "./actors";
import { toolsRouter } from "./tools";
import { authenticate } from "../middlewares/authenticate";
import { fetchUserCookies } from "../middlewares/fetchUserCookies";
import { jobRouter } from "./job";

export const apiRouter = Router();
apiRouter.use("/actor", actorRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/job", jobRouter);
apiRouter.use("/tools", authenticate, fetchUserCookies, toolsRouter);
