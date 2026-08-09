import crypto from "crypto";
import { redisClient } from "../../config/redis";
import { env } from "../../config/env";



export const resetPasswordToken = async (user_id: string) => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const redisKey = `passwordReset:${hashedToken}`;
  await redisClient.set(
    redisKey,
    JSON.stringify({
      userId: user_id,
    }),
    {
      EX: 15 * 60,
    },
  );
  return `${env.frontendUrl}/reset-password?token=${resetToken}`;
};


export const getResetPasswordToken = async(token:string)=>{
 const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const redisKey = `passwordReset:${hashedToken}`;

  return await redisClient.get(redisKey);


}