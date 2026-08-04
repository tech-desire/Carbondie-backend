export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  phone: String;
  role: UserRole;
  isEmailVerified?: Boolean;
  twoFactorEnabled?: Boolean;
  twoFactorSecret?: Boolean;
  tokenVersion?: Number;
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
  avatar?: string;
  refreshToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
