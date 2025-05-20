import User from "../../models/User.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";
import generateAccessToken from "../../helper/generateAccessToken.js";
export const signupUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(new ApiError(403, "All fields are required."));
  }

  const checkUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (checkUser) {
    return next(new ApiError(409, "username or email are already exist."));
  }

  const user = new User({ username, email, password });
  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "User signed up successfully"));
});

export const signinUser = asyncHandler(async (req, res, next) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    return next(new ApiError(403, "All fields are required."));
  }

  const user = await User.findOne({
    $or: [{ username: emailOrUsername }, { email: emailOrUsername }],
  }).select("+password");

  if (!user) {
    return next(new ApiError(409, "Invalid email or username or password"));
  }

  const validatePassword = await user.matchPassword(password);
  if (!validatePassword) {
    return next(new ApiError(409, "Invalid email/username or password"));
  }

  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };

  const accessToken = await generateAccessToken(payload);

  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json(
      new ApiResponse(200, "Signed in successfully", {
        accessToken,
        user: payload,
      })
    );
});

export const checkAuth = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new ApiError(401, "Unauthorized access."));
  }
  const userData = await User.findById(user.id).select(
    "_id email username role"
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Authorized user", userData));
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  return res
    .status(200)
    .cookie("accessToken", "", {
      maxAge: 0,
    })
    .status(200)
    .json(new ApiResponse(200, "Logged out successfully"));
});
