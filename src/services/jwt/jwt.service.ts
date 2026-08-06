import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/env";

type JwtPayload = {
  userId: string;
  email: string;
};

export const generateAccessToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwt.accessSecret, {
    expiresIn: "15m",
  } as SignOptions);
};

export const generateRefreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.jwt.refreshSecret, {
    expiresIn: "7d",
  } as SignOptions);
};

export const generateSignupToken = (email: string): string => {
  return jwt.sign({ email }, env.jwt.signupSecret, {
    expiresIn: "10m",
  } as SignOptions);
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwt.accessSecret) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwt.refreshSecret) as JwtPayload;
};

export const verifySignupToken = (
  token: string
): { email: string } => {
  return jwt.verify(token, env.jwt.signupSecret) as {
    email: string;
  };
};