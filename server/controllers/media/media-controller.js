import {
  destroyMediaToCloudinary,
  uploadMediaToCloudinary,
} from "../../config/cloudinary.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";
import fs from "fs";
export const uploadMedia = asyncHandler(async (req, res, next) => {
  const filePath = req.file.path;
  if (!filePath) {
    return next(new ApiError(403, "Somthing went worng."));
  }
  const result = await uploadMediaToCloudinary(filePath);
  if (result) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  res
    .status(200)
    .json(new ApiResponse(200, "File uploaded successfully", result));
});

export const deleteMedia = asyncHandler(async (req, res, next) => {
  const public_id = req.params.public_id;
  const folderName = req.params.folderName;
  const newPublicId = +folderName + "/" + public_id;
  if (!newPublicId) {
    return next(new ApiError(403, "Somthing went worng."));
  }
  await destroyMediaToCloudinary(newPublicId);
  res.status(200).json(new ApiResponse(200, "File deleted successfully"));
});
