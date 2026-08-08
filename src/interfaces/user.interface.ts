import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;

  password: string;

  role: "user" | "admin";

  isEmailVerified: boolean;

  isTwoFactorEnabled: boolean;
  twoFactorSecret?: string;

  lastLoginAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}