import { ApiError } from "../utils/api-error.js";
import asyncHandler from "../utils/async-handler.js";

export const checkInstructorOrNot = asyncHandler((req, res, next) => {
  if (req.user.role !== "instructor" && req.user.role !== "superAdmin") {
    return next(new ApiError(401, "Only instructor can access."));
  }
  next();
});
