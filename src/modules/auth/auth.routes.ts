import { Router } from "express";
import * as authController from "./auth.controller";
import { validate } from "../../middleware/validate";
import {
  sendOtpSchema,
  verifyOtpSchema,
  signupSchema,
  loginSchema,
} from "./auth.validation";
import { authenticate } from "../../middleware/authmiddleware"; 

const router = Router();

router.post("/send-otp", validate(sendOtpSchema), authController.sendOtp);
router.post("/verify-otp", validate(verifyOtpSchema), authController.verifyOtp);
router.post("/signup", validate(signupSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);
router.get("/me", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});
export default router;
