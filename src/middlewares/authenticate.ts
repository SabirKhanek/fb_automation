import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth";
import { UserService } from "../services/user";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization;
    if (!token) return res.apiError("Unauthorized: no token provided", 401);
    const authService = new AuthService();
    const payload = authService.validateToken(token);

    const userService = new UserService();
    if (!(await userService.isUserExists(payload.username))) {
      return res.apiError("Unauthorized: token no longer valid", 403);
    }

    req.authUser = payload;
    next();
  } catch (err: any) {
    res.apiError(err.message, err.statusCode);
  }
}
