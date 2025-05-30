import { destroyMediaToCloudinary } from "../../config/cloudinary.js";
import Course from "../../models/Course.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const createCourse = asyncHandler(async (req, res, next) => {
  const instructorId = req.user.id;
  const formData = { ...req.body, instructor: instructorId };
  const create = new Course(formData);
  const newCourse = await create.save();
  return res
    .status(201)
    .json(new ApiResponse(201, "Course created successfully", newCourse));
});

export const fetchCourse = asyncHandler(async (req, res, next) => {
  const courseList = await Course.find().sort({ _id: -1 });
  return res
    .status(201)
    .json(new ApiResponse(201, "Courses fetched successfully", courseList));
});

export const fetchCourseById = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  if (!courseId) {
    return next(new ApiError(400, "Course id is required."));
  }
  const course = await Course.findById(courseId);
  return res
    .status(201)
    .json(new ApiResponse(201, "Course fetch successfully", course));
});

export const deleteCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  if (!courseId) {
    return next(new ApiError(400, "Course id is required."));
  }
  const course = await Course.findByIdAndDelete(courseId);
  for (let curriculumItem of course.curriculum) {
    await destroyMediaToCloudinary(curriculumItem.public_id);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Course deleted successfully", course));
});

export const updateCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;

  if (!courseId) {
    return next(new ApiError(404, "Course id is required."));
  }
  const course = await Course.findByIdAndUpdate(
    courseId,
    { ...req.body },
    { new: true }
  );
  return res
    .status(201)
    .json(new ApiResponse(201, "Course updated successfully", course));
});
