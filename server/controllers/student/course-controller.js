import Course from "../../models/Course.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const studentFetchAllCourse = asyncHandler(async (req, res, next) => {
  const courseList = await Course.find()
    .limit(8)
    .populate({
      path: "instructor",
      select: "username",
    })
    .sort({ _id: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, "Course fetched successfully", courseList));
});

export const studentFetchCourseById = asyncHandler(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await Course.findById(courseId)
    .populate({
      path: "instructor",
      select: "username",
    })
    .populate({
      path: "primaryLanguage",
      select: "name",
    })
    .populate({
      path: "level",
      select: "name",
    })
    .populate({
      path: "category",
      select: "name",
    });
  return res
    .status(200)
    .json(new ApiResponse(200, "Category fetched successfully", course));
});

export const fetchFilteCourse = asyncHandler(async (req, res, next) => {
  const {
    category = [],
    level = [],
    language = [],
    sortBy = "price-lowtohigh",
  } = req.query;

  const filter = {};
  if (category.length > 0) {
    filter.category = { $in: category.split(",") };
  }
  if (level.length > 0) {
    filter.level = { $in: level.split(",") };
  }
  if (language.length > 0) {
    filter.primaryLanguage = { $in: language.split(",") };
  }

  let sort = {};
  switch (sortBy) {
    case "price-lowtohigh":
      sort.pricing = 1;
      break;
    case "price-hightolow":
      sort.pricing = -1;
      break;
    case "title-atoz":
      sort.title = 1;
      break;
    case "title-ztoa":
      sort.title = -1;
      break;
    default:
      sort.price = 1;
      break;
  }

  const filterList = await Course.find(filter)
    .populate({
      path: "instructor",
      select: "username",
    })
    .sort(sort);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Filter Courses fetched successfully.", filterList)
    );
});
