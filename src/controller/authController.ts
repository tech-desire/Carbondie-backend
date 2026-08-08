import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { IStatuscode_Json_Message } from "../interfaces/jsonmessages";
import { User } from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";
import { registerSchema } from "./auth.schema";

export const signup = async (req: Request, res: Response) => {
  try {
    const SignupData = registerSchema.safeParse(req.body);
    if (!SignupData.success) {
      return res.status(400).json({
        success: false,
        message: SignupData.error,
      } as IStatuscode_Json_Message);
    }
    const { name,email, phone, password } = SignupData.data;
    const normalizedEmail = email.toLowerCase().trim(); 
    let user = await User.findOne({email: normalizedEmail });

    if (user) {
      return res.status(500).json({
        success: true,
        message: "email already exist",
        data: null,
      } as IStatuscode_Json_Message);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email:normalizedEmail,
      phone,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: user,
    } as IStatuscode_Json_Message);
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
    } as IStatuscode_Json_Message);
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password, phone } = req.body;

  try {
    if ((!email && !phone) || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email ",
      } as IStatuscode_Json_Message);
    }

    let finduser = email ? { email } : { phone };
    let user = await User.findOne(finduser).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "You don't have an account",
        data: null,
      } as IStatuscode_Json_Message);
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: `Invalid ${email ? "email" : "phone"} or password`,
        data: null,
      } as IStatuscode_Json_Message);
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as Secret,
      { expiresIn: "7d" },
    );

    return res
      .status(200)
      .cookie("token", token)
      .json({
        success: true,
        message: "Login successful",
      } as IStatuscode_Json_Message);
  } catch (error: any) {
    return res.status(404).json({
      success: false,
      message: error.message,
      data: null,
    } as IStatuscode_Json_Message);
  }
};
