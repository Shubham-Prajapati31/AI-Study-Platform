const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes from now
  return { otp, expiresAt };
};

export  {generateOtp};
