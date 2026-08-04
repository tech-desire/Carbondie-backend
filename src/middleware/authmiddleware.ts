import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IStatuscode_Json_Message } from "../interfaces/jsonmessages";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cookie = req.headers.cookie;
    const token = cookie?.split("=")[1];
    // console.log(token,"\n" , cookie?.split('='),"\n",cookie);
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Please login",
      } as IStatuscode_Json_Message);
    }
    jwt.verify(token, process.env.JWT_SECRET as Secret, (err, data) => {
      if (err) {
        return res
          .status(401)
          .json({
            success: false,
            message: "Invalid token",
          } as IStatuscode_Json_Message);
      }
    
    });

    next();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    } as IStatuscode_Json_Message);
  }
};
