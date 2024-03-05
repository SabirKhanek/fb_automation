import express from "express";
import { AuthService } from "../../services/auth";
import { authRequestSchema } from "../../schemas/authRequest";
import { authenticate } from "../../middlewares/authenticate";

export const authRouter = express.Router();

authRouter.post("/", async (req, res, next) => {
  try {
    const { value, error } = authRequestSchema.validate(req.body);
    if (error) return res.apiError(error.details[0].message, 400);
    const authService = new AuthService();
    const token = await authService.authenticate(
      value.username,
      value.password
    );
    return res.apiSuccess({ token }, "authentication was successful");
  } catch (err: any) {
    console.log(err);
    return res.apiError(err.message, err.statusCode);
  }
});

authRouter.get("/validate", authenticate, (req, res) => {
  res
    .status(req.authUser ? 200 : 400)
    .send({ success: req.authUser ? true : false, data: req.authUser });
});
