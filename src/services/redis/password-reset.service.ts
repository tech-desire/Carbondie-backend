import crypto from "crypto";
import { redisClient } from "../../config/redis";
import { env } from "../../config/env";

const PASSWORD_RESET_EXPIRES_IN = 15 * 60;

const createHashedToken = (token: string): string => {
  return crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
};

const getRedisKey = (hashedToken: string): string => {
  return `passwordReset:${hashedToken}`;
};

export const resetPasswordToken = async (
  userId: string,
): Promise<string> => {
  // Generate a new token every time
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Store only the hashed token in Redis
  const hashedToken = createHashedToken(resetToken);

  const redisKey = getRedisKey(hashedToken);

  await redisClient.set(
    redisKey,
    JSON.stringify({
      userId,
    }),
    {
      EX: PASSWORD_RESET_EXPIRES_IN,
    },
  );

  // Send the raw token to the user
  return `${env.frontendUrl}/reset-password?token=${resetToken}`;
};

export const getResetPasswordToken = async (
  token: string,
): Promise<{ userId: string } | null> => {
  const hashedToken = createHashedToken(token);

  const redisKey = getRedisKey(hashedToken);

  const data = await redisClient.get(redisKey);

  if (!data) {
    return null;
  }

  return JSON.parse(data) as { userId: string };
};

export const deleteResetPasswordToken = async (
  token: string,
): Promise<void> => {
  const hashedToken = createHashedToken(token);

  const redisKey = getRedisKey(hashedToken);

  await redisClient.del(redisKey);
};