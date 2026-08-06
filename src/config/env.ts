import dotenv from 'dotenv'

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 5000,
  mongodbUri: process.env.MONGO_URI!,
  redisUrl: process.env.REDIS_URL!,
  clientUrl: process.env.CLIENT_URL!,
  mail: {
    host: process.env.MAIL_HOST!,
    port: Number(process.env.MAIL_PORT) || 587,
    user: process.env.MAIL_USER!,
    password: process.env.MAIL_PASSWORD!,
    from: process.env.MAIL_FROM!,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    signupSecret: process.env.JWT_SIGNUP_SECRET!,
  },
  nodeEnv: process.env.NODE_ENV || "development",
};