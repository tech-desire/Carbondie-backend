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

export const sendPasswordResetEmail = async (email:string,resetUrl:string)=>{

  await transporter.sendMail(
    {
      from:env.mail.from,
      to:email,
      subject:`Reset your password`,
      html:`
      <h2>Reset your password<h2>

         <p>
        We received a request to reset your password.
      </p>

      <p>
        Click the button below to choose a new password.
      </p>

      <p>
        <a href="${resetUrl}">
          Reset Password
        </a>
      </p>

      <p>
        This link expires in 15 minutes.
      </p>

      <p>
        If you didn't request a password reset,
        you can safely ignore this email.
      </p>
      `
    }
  )


}