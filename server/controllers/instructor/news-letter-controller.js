import Newsletter from "../../models/Newsletter.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const InstructorFetchNewsLetterList = asyncHandler(
  async (req, res, next) => {
    const newsLetterList = await Newsletter.find();
    res
      .status(200)
      .json(
        new ApiResponse(200, "Newsletter fetched successfully.", newsLetterList)
      );
  }
);

export const InstructorDeleteNewsLetter = asyncHandler(
  async (req, res, next) => {
    const { newsLetterId } = req.params;
    await Newsletter.findByIdAndDelete(newsLetterId);
    res
      .status(200)
      .json(new ApiResponse(200, "Newsletter Deleted successfully."));
  }
);
