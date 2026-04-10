import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils";
import { StatusCodes } from "http-status-codes";
import { envConfig } from "../config";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
      return next(new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized"));
    }
    const payload = jwt.verify(token, envConfig.jwtSecret) as any;
    // attach user to request; use `any` to avoid type errors here
    (req as any).user = { userId: payload.userId };
    return next();
  } catch (error) {
    return next(new ApiError(StatusCodes.UNAUTHORIZED, "Invalid token"));
  }
};

export default authMiddleware;
