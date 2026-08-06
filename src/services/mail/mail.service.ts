import nodemailer from "nodemailer";
import { env } from "../../config/env";

const transporter = nodemailer.createTransport({
  host: env.mail.host,

  port: env.mail.port,

  secure: false,

  auth: {
    user: env.mail.user,
    pass: env.mail.password,
  },
});


export const sendMail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {

  await transporter.sendMail({
    from: env.mail.from,
    to,
    subject,
    text,
  });

};