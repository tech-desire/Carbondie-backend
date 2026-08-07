import { User } from "../../models/user.model";
import { generateOtp, storeOtp } from "../../services/redis/otp.service";
import { sendMail } from "../../services/mail/mail.service";
import { AppError } from "../../utils/AppError";
import { verifyOtp } from "../../services/redis/otp.service";
import { generateSignupToken } from "../../services/jwt/jwt.service";
import bcrypt from "bcrypt";
import { verifySignupToken } from "../../services/jwt/jwt.service";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../services/jwt/jwt.service";

export const sendOtp = async (email: string): Promise<void> => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(409, "Email is already registered");
  }

  const otp = generateOtp();

  await storeOtp(email, otp);

  await sendMail(
    email,
    "Verify your email",
    `Your OTP is ${otp}. It is valid for 5 minutes.`,
  );
};

export const verifyEmailOtp = async (
  email: string,
  otp: string,
): Promise<string> => {
  const isValid = await verifyOtp(email, otp);

  if (!isValid) {
    throw new AppError(400, "Invalid or expired OTP");
  }

  const signupToken = generateSignupToken(email);

  return signupToken;
};
export const signup = async (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  signupToken: string;
}) => {
  const decoded = verifySignupToken(data.signupToken);

  if (decoded.email !== data.email) {
    throw new AppError(400, "Invalid signup token");
  }

  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new AppError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 12);

  const user = await User.create({
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: hashedPassword,
    isEmailVerified: true,
  });

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id.toString(),
    email: user.email,
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(401, "Invalid email or password");
  }
  await User.updateOne(
    { _id: user._id },
    {
      lastLoginAt: new Date(),
    },
  );

  const accessToken = generateAccessToken({
    userId: user._id.toString(),
    email: user.email,
  });

  // I have not implemented refresh token functionality , may be in future things
  // const refreshToken = generateRefreshToken({
  //   userId: user._id.toString(),
  //   email: user.email,
  // });

  return {
    user,
    accessToken,
    // refreshToken,
  };
};
