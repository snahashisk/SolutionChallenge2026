import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Anonymous } from "../models/anonymous.model.js";

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const verifyEmail = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const anonymous = await Anonymous.findOne({ email });
  if (anonymous) {
    throw new ApiError(200, "Email is already registered");
  }

  const otp = generateOTP();

  if (!anonymous) {
    await sendEmail({
      to: email,
      subject: "New Crisis Report Verification",
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    }).then(async () => {
      await Anonymous.create({
        fullName,
        email,
        otp,
      });
    });
  } else {
    await Anonymous.updateOne(
      { email },
      {
        otp,
      },
    );
  }

  res.status(200).json(
    new ApiResponse(200, "Otp sent successfully", {
      email: anonymous?.email,
    }),
  );
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new ApiError(400, "Email and otp are required");
  }

  const anonymous = await Anonymous.findOne({ email });
  if (!anonymous) {
    throw new ApiError(404, "Anonymous not found");
  }

  if (anonymous.otp !== otp) {
    throw new ApiError(400, "Invalid OTP");
  } else {
    anonymous.isVerified = true;
    await anonymous.save();
  }

  res.status(200).json(
    new ApiResponse(200, "Otp verified successfully", {
      email: anonymous.email,
      isVerified: anonymous.isVerified,
    }),
  );
});

export { verifyEmail, verifyOtp };
