import Level from "../../models/Level.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";
import slugify from "slugify";

export const createLevel = asyncHandler(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return next(new ApiError(403, "Level name is required."));
  }
  const slug = slugify(name, {
    replacement: "-",
    lower: true,
  });
  const checkLevel = await Level.findOne({ slug });
  if (checkLevel) {
    return next(new ApiError(403, "Level is already exits."));
  }

  const newLevel = new Level({ name, slug, status });
  await newLevel.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Level created successfully.", newLevel));
});

export const deleteLevel = asyncHandler(async (req, res, next) => {
  const levelId = req.params.id;

  if (!levelId) {
    return next(new ApiError(401, "Level id is required."));
  }
  await Level.findByIdAndDelete(levelId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Level deleted successfully"));
});

export const updateLevel = asyncHandler(async (req, res, next) => {
  const levelId = req.params.id;
  const { name, status } = req.body;

  if (!levelId || !name) {
    return next(new ApiError(401, "Level id and name is required."));
  }

  const slug = slugify(name, {
    replacement: "-",
    lower: true,
  });

  const existingLevel = await Level.findOne({ slug });
  if (existingLevel && existingLevel._id.toString() !== levelId.toString()) {
    return next(new ApiError(403, "Level is already exits."));
  }

  const level = await Level.findById(levelId);
  if (!level) {
    return next(new ApiError(403, "Level not found!."));
  }

  level.name = name;
  level.slug = slug;
  level.status = status;
  await level.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Level updated successfully"));
});

export const fetchLevel = asyncHandler(async (req, res, next) => {
  const levelList = await Level.find();
  return res
    .status(200)
    .json(new ApiResponse(200, "Level fetched successfully", levelList));
});

export const fetchActiveLevel = asyncHandler(async (req, res, next) => {
  const levelList = await Level.find({ status: "Active" });
  return res
    .status(200)
    .json(new ApiResponse(200, "Level fetched successfully", levelList));
});
