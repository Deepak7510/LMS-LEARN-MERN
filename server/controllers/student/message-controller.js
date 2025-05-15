import asyncHandler from "../../utils/async-handler.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import Message from "../../models/Message.js";

export const createMessage = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new ApiError(403, "All fields are required."));
  }

  const newMessage = new Message({ name, email, message });
  await newMessage.save();

  return res
    .status(201)
    .json(new ApiResponse(200, "Message sent successfully"));
});
