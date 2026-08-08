import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/jwt/jwt.service";
import { User } from "../models/user.model";
import { AppError } from "../utils/AppError";


export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const token = req.cookies.accessToken;


  if (!token) {
    throw new AppError(
      401,
      "Unauthorized"
    );
  }


  const payload = verifyAccessToken(
    token
  );


  const user = await User.findById(
    payload.userId
  );


  if (!user) {
    throw new AppError(
      401,
      "User not found"
    );
  }


  req.user = user;


  next();
};