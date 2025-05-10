import Language from "../../models/Language.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const studentFetchActiveLanguage = asyncHandler(
  async (req, res, next) => {
    const languageList = await Language.find({ status: "Active" });
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Language fetched successfully", languageList)
      );
  }
);
