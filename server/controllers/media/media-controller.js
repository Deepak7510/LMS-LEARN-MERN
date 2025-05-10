import {
  destroyMediaToCloudinary,
  uploadMediaToCloudinary,
} from "../../config/cloudinary.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const uploadMedia = asyncHandler(async (req, res, next) => {
  const filePath = req.file.path;
  if (!filePath) {
    return next(new ApiError(403, "Somthing went worng."));
  }
  const result = await uploadMediaToCloudinary(filePath);
  res
    .status(200)
    .json(new ApiResponse(200, "File uploaded successfully", result));
});

export const deleteMedia = asyncHandler(async (req, res, next) => {
  const public_id = req.params.public_id;
  if (!public_id) {
    return next(new ApiError(403, "Somthing went worng."));
  }
  await destroyMediaToCloudinary(public_id);
  res.status(200).json(new ApiResponse(200, "File deleted successfully"));
});
