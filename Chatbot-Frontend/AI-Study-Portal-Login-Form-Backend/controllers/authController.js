import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { generateOtp } from "../utils/generateOTP.js";
import { sendEmail } from "../services/emailService.js "; // Assuming you have a utility to send emails

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await User.create({ name, email, password });

    // Generate OTP
    const { otp, expiresAt } = generateOtp();

    // Save OTP temporarily (in DB or in-memory store)
    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await user.save({ validateBeforeSave: false });

    // Here, you would send OTP via email/SMS
    console.log(`OTP for ${email} is: ${otp}`);

    const token = signToken(user._id, user.name, user.email);

    await sendEmail(email, otp);

    res.status(201).json({
      message: "OTP sent to email",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.isVerified === false) {
      return res
        .status(403)
        .json({ message: "User not verified. Please verify your account." });
    }

    const token = signToken(user._id);

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // OTP mismatch
    if (user.otp !== Number(otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP expired
    if (user.otpExpiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ OTP is correct → mark verified
    user.isVerified = true;
    user.otp = undefined; // clear OTP
    user.otpExpiresAt = undefined; // clear expiry
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json({ message: "User verified successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
