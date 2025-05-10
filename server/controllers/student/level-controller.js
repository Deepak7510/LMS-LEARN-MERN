import Level from "../../models/Level.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const studentFetchActiveLevel = asyncHandler(async (req, res, next) => {
  const levelList = await Level.find({ status: "Active" });
  return res
    .status(200)
    .json(new ApiResponse(200, "Level fetched successfully", levelList));
});
