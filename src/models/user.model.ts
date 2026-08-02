import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  phone: String;
  role: UserRole;
  avatar?: string;
  refreshToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 4,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    avatar: {
      type: String,
      default: null,
    },
    refreshToken: {
      type: String,
      select: false,
    },

    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("User", userSchema);
