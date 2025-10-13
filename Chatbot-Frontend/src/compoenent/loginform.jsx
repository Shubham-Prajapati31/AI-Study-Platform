"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AuthSystem() {
  const [currentView, setCurrentView] = useState("login"); // 'login', 'signup', 'emailOTP', 'resetOTP'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const otpRefs = useRef([]);
  const router = useRouter();

  // Email validation function
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Password validation function
  const validatePassword = (password) => password.length >= 6;

  // Form validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (currentView === "signup" && !formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        otpRefs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() && currentView !== "emailOTP" && currentView !== "resetOTP") {
      return;
    }

    setIsLoading(true);

    if (currentView === "login") {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();
        console.log("Login response:", data);

        if (response.ok && data.token) {
          toast.success("Login successful ✅");

          localStorage.setItem("authToken", data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({ name: data.user?.name || formData.email })
          );

          setTimeout(() => {
            router.push("/home");
          }, 1000);
        } else {
          if (
            data.message &&
            data.message.toLowerCase().includes("password")
          ) {
            toast.error("Incorrect password. Please try again.");
          } else if (
            data.message &&
            (data.message.toLowerCase().includes("user") ||
              data.message.toLowerCase().includes("not found") ||
              data.message.toLowerCase().includes("exist"))
          ) {
            toast.error("Email not found. Please sign up.");
          } else {
            toast.error(data.message || "Login failed ❌");
          }
        }
      } catch (err) {
        console.error("Login error:", err);
        toast.error("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else if (currentView === "signup") {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.fullName,
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok && data.message === "OTP sent to email") {
          toast.success("OTP has been sent to your email 📩");
          setCurrentView("emailOTP");
        } else if (
          data.message &&
          data.message.toLowerCase().includes("already")
        ) {
          toast.error("Email already exists. Please login instead.");
        } else {
          toast.error(data.message || "Signup failed ❌");
        }
      } catch (err) {
        console.error("Signup error:", err);
        toast.error("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else if (currentView === "emailOTP") {
      const otpCode = otp.join("");
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formData.email,
              otp: otpCode,
            }),
          }
        );

        const data = await response.json();

        if (response.ok && data.message === "User verified successfully") {
          toast.success("Email verified ✅ You can now log in");
          setCurrentView("login");
        } else {
          toast.error(data.message || "OTP verification failed ❌");
        }
      } catch (err) {
        console.error("OTP verification error:", err);
        toast.error("Network error. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else if (currentView === "resetOTP") {
      console.log("Reset OTP:", otp.join(""));
      toast.success("Password reset OTP verified ✅ (demo)");
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setCurrentView("resetOTP");
    setOtp(["", "", "", "", "", ""]);
  };

  const renderLoginForm = () => (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
          <p className="text-slate-400">Login to your account!</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email id"
              className="w-full pl-12 pr-4 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="text-left">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <button
                onClick={() => setCurrentView("signup")}
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSignupForm = () => (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400">Create your account</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            {errors.fullName && (
              <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email id"
              className="w-full pl-12 pr-4 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full pl-12 pr-12 py-4 bg-slate-700 border-0 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Verify"}
          </button>

          <div className="text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <button
                onClick={() => setCurrentView("login")}
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOTPForm = (title, subtitle, buttonText) => (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
          <p className="text-slate-400">{subtitle}</p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-12 h-12 bg-slate-700 border-0 rounded-xl text-white text-center text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : buttonText}
          </button>

          <div className="text-center">
            <button
              onClick={() => setCurrentView("login")}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return renderLoginForm();
      case "signup":
        return renderSignupForm();
      case "emailOTP":
        return renderOTPForm(
          "Email Verify OTP",
          "Enter the 6-digit code sent to your email id.",
          "Verify email"
        );
      case "resetOTP":
        return renderOTPForm(
          "Reset password OTP",
          "Enter the 6-digit code sent to your email id.",
          "Submit"
        );
      default:
        return renderLoginForm();
    }
  };

  useEffect(() => {
    if (
      (currentView === "emailOTP" || currentView === "resetOTP") &&
      otpRefs.current[0]
    ) {
      setTimeout(() => otpRefs.current[0].focus(), 100);
    }
  }, [currentView]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center p-4">
      {/* ✅ Toaster added here */}
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md">{renderCurrentView()}</div>
    </div>
  );
}
