// services/emailService.js
import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";
configDotenv();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send OTP email
 * @param {string} to - recipient email
 * @param {string} otp - one time password
 */
export const sendEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
  from: `"AI Study Portal" <${process.env.EMAIL_USER}>`,
  to,
  subject: "🔑 Your AI Study Portal OTP Code",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px; background: #f9f9f9;">
      <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #ddd;">
        <h2 style="color: #4A90E2; margin: 0;">AI Study Portal</h2>
        <p style="color: #555; font-size: 14px; margin: 5px 0;">Secure One-Time Password (OTP)</p>
      </div>

      <div style="padding: 20px; text-align: center;">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          Hello 👋, <br/> Use the OTP below to complete your verification:
        </p>

        <div style="display: inline-block; padding: 15px 25px; background: #4A90E2; color: white; font-size: 24px; font-weight: bold; border-radius: 8px; letter-spacing: 3px;">
          ${otp}
        </div>

        <p style="margin-top: 20px; font-size: 14px; color: #666;">
          This OTP is valid for <b>5 minutes</b>. Please do not share it with anyone.  
        </p>
      </div>

      <div style="text-align: center; padding-top: 15px; border-top: 1px solid #ddd; font-size: 12px; color: #888;">
        <p>© ${new Date().getFullYear()} AI Study Portal. All rights reserved.</p>
      </div>
    </div>
  `,
});

    console.log("OTP Email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send OTP email");
  }
};