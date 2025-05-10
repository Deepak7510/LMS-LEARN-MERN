import Category from "../../models/Category.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const studentFetchActiveCategory = asyncHandler(
  async (req, res, next) => {
    const categoryList = await Category.find({ status: "Active" });
    return res
      .status(200)
      .json(
        new ApiResponse(200, "Category fetched successfully", categoryList)
      );
  }
);
