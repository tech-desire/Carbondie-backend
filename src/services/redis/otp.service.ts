import bcrypt from "bcrypt";
import { redisClient } from "../../config/redis";

const OTP_TTL = 60 * 5;

const getOtpKey = (email: string) => `emailOtp:${email}`;

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const storeOtp = async (
  email: string,
  otp: string
): Promise<void> => {
  const hashedOtp = await bcrypt.hash(otp, 10);

  await redisClient.set(getOtpKey(email), hashedOtp, {
    EX: OTP_TTL,
  });
};

export const verifyOtp = async (
  email: string,
  otp: string
): Promise<boolean> => {
  const storedOtp = await redisClient.get(getOtpKey(email));

  if (!storedOtp) {
    return false;
  }

  const isValid = await bcrypt.compare(otp, storedOtp);

  if (isValid) {
    await redisClient.del(getOtpKey(email));
  }

  return isValid;
};