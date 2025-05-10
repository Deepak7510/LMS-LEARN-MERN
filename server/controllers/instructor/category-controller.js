import Category from "../../models/Category.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";
import slugify from "slugify";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, status } = req.body;

  if (!name) {
    return next(new ApiError(403, "Category name is required."));
  }
  const slug = slugify(name, {
    replacement: "-",
    lower: true,
  });

  const checkCategory = await Category.findOne({ slug });
  if (checkCategory) {
    return next(new ApiError(403, "Category is already exits."));
  }

  const newCategory = new Category({ name, slug, status });
  await newCategory.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Category created successfully.", newCategory));
});

export const deleteCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;

  if (!categoryId) {
    return next(new ApiError(401, "Category id is required."));
  }
  await Category.findByIdAndDelete(categoryId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Category deleted successfully"));
});

export const updateCategory = asyncHandler(async (req, res, next) => {
  const categoryId = req.params.id;
  const { name, status } = req.body;

  if (!categoryId || !name) {
    return next(new ApiError(401, "Category id and name is required."));
  }

  const slug = slugify(name, {
    replacement: "-",
    lower: true,
  });

  const existingCategory = await Category.findOne({ slug });

  if (
    existingCategory &&
    existingCategory._id.toString() !== categoryId.toString()
  ) {
    return next(new ApiError(403, "Category is already exits."));
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    return next(new ApiError(404, "Category not found."));
  }

  category.name = name;
  category.slug = slug;
  category.status = status;
  await category.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Category updated successfully"));
});

export const fetchCategory = asyncHandler(async (req, res, next) => {
  const categoryList = await Category.find();

  return res
    .status(200)
    .json(new ApiResponse(200, "Category fetched successfully", categoryList));
});

export const fetchActiveCategory = asyncHandler(async (req, res, next) => {
  const categoryList = await Category.find({ status: "Active" });
  return res
    .status(200)
    .json(new ApiResponse(200, "Category fetched successfully", categoryList));
});
