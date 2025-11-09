import { Router } from "express";
import { register, login,verifyOtp } from "../controllers/authController.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/register", register);
router.post("/login",login);
router.post("/verify-otp", verifyOtp);


export default router;
