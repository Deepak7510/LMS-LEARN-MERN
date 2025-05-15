import asyncHandler from "../../utils/async-handler.js";

import { ApiError } from "../../utils/api-error.js";
import Newsletter from "../../models/Newsletter.js";
import { ApiResponse } from "../../utils/api-response.js";

export const studentCreateNewsLetter = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ApiError(403, "Email is required"));
  }
  const newsletter = await Newsletter.findOne({ email });
  if (newsletter) {
    return next(new ApiError(403, "Email has already Subscribeed"));
  }
  const newNewsLetter = new Newsletter({ email });
  await newNewsLetter.save();
  res.status(201).json(new ApiResponse(201, "Subscribed Successfully"));
});
