import { Request, Response } from "express";
import * as authService from "./auth.service";
import { env } from "../../config/env";


const cookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax" as const,
  maxAge: 14 * 24 * 60 * 60 * 1000,
};


export const sendOtp = async (
  req: Request,
  res: Response
) => {

  const { email } = req.body;

  await authService.sendOtp(email);

  res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });

};



export const verifyOtp = async (
  req: Request,
  res: Response
) => {

  const { email, otp } = req.body;

  const signupToken =
    await authService.verifyEmailOtp(
      email,
      otp
    );

  res.status(200).json({
    success: true,
    message: "OTP verified successfully",
    signupToken,
  });

};



export const signup = async (
  req: Request,
  res: Response
) => {

  const {
    user,
    accessToken,
  } = await authService.signup(
    req.body
  );


  res.cookie(
    "accessToken",
    accessToken,
    cookieOptions
  );


  res.status(201).json({
    success: true,
    message: "Account created successfully",
    user,
  });

};



export const login = async (
  req: Request,
  res: Response
) => {

  const { email, password } = req.body;


  const {
    user,
    accessToken,
  } = await authService.login(
    email,
    password
  );


  res.cookie(
    "accessToken",
    accessToken,
    cookieOptions
  );


  res.status(200).json({
    success: true,
    message: "Login successful",
    user,
  });

};