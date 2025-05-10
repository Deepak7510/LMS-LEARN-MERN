import Language from "../../models/Language.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";
import slugify from "slugify";

export const createLanguage = asyncHandler(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return next(new ApiError(403, "Language name is required."));
  }
  const slug = slugify(name, {
    replacement: "-",
    lower: true,
  });

  const checkLanguage = await Language.findOne({ slug });
  if (checkLanguage) {
    return next(new ApiError(403, "Language is already exits."));
  }

  const newLanguage = new Language({ name, slug, status });
  await newLanguage.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Language created successfully.", newLanguage));
});

export const deleteLanguage = asyncHandler(async (req, res, next) => {
  const languageId = req.params.id;

  if (!languageId) {
    return next(new ApiError(401, "Language id is required."));
  }
  await Language.findByIdAndDelete(languageId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Language deleted successfully"));
});

export const updateLanguage = asyncHandler(async (req, res, next) => {
  const languageId = req.params.id;
  const { name, status } = req.body;

  if (!languageId || !name) {
    return next(new ApiError(401, "Language id and name is required."));
  }

  const slug = slugify(name, {
    replacement: "-",
    lower: true,
  });

  const existingLanguage = await Language.findOne({ slug });
  if (
    existingLanguage &&
    existingLanguage._id.toString() !== languageId.toString()
  ) {
    return next(new ApiError(403, "Language is already exits."));
  }

  const language = await Language.findById(languageId);
  if (!language) {
    return next(new ApiError(404, "Language not found."));
  }

  language.name = name;
  language.slug = slug;
  language.status = status;
  await language.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Language updated successfully"));
});

export const fetchLanguage = asyncHandler(async (req, res, next) => {
  const languageList = await Language.find();
  return res
    .status(200)
    .json(new ApiResponse(200, "Language fetched successfully", languageList));
});

export const fetchActiveLanguage = asyncHandler(async (req, res, next) => {
  const languageList = await Language.find({ status: "Active" });
  return res
    .status(200)
    .json(new ApiResponse(200, "Language fetched successfully", languageList));
});
