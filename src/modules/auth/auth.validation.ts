import { z } from "zod";

export const sendOtpSchema = z.object({
  email: z.email().trim().toLowerCase(),
});

export const verifyOtpSchema = z.object({
  email: z.string().email().trim().toLowerCase(),

  otp: z.string().length(6),
});

export const signupSchema = z.object({
  name: z.string().min(2).max(100),

  email: z.string().email().trim().toLowerCase(),

  phone: z.string().min(10).max(10),

  password: z.string().min(8),

  signupToken: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().email().trim().toLowerCase(),

  password: z.string().min(1),
});


export const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });