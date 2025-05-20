import Message from "../../models/Message.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const fetchMessageList = asyncHandler(async (req, res, next) => {
  const messageList = await Message.find().sort({ _id: -1 });
  res
    .status(200)
    .json(new ApiResponse(200, "Message fetched successfully.", messageList));
});

export const deleteMessage = asyncHandler(async (req, res, next) => {
  const { messageId } = req.params;
  if (!messageId) {
    return next(new ApiError(400, "Message id is required."));
  }
  await Message.findByIdAndDelete(messageId);

  res.status(200).json(new ApiResponse(200, "Message deleted successfully."));
});
