import asyncHandler from "../../utils/async-handler.js";
import User from "../../models/User.js";
import Order from "../../models/Order.js";
import Category from "../../models/Category.js";
import Level from "../../models/Level.js";
import Language from "../../models/Language.js";
import { ApiResponse } from "../../utils/api-response.js";
import Newsletter from "../../models/Newsletter.js";
import Message from "../../models/Message.js";
import Course from "../../models/Course.js";

export const fetchDashboardAllData = asyncHandler(async (req, res, next) => {
  const totalStudents = await User.find({
    role: { $not: { $eq: "instructor" } },
  }).countDocuments();

  const totalCourses = await Course.countDocuments();
  const totalCategories = await Category.countDocuments();
  const totalLevels = await Level.countDocuments();
  const totalLanguages = await Language.countDocuments();
  const totatNewaLetters = await Newsletter.countDocuments();
  const totatEnrolledStudentList = await Order.find()
    .select("user course amount")
    .populate({
      path: "user",
      select: "username email",
    })
    .populate({
      path: "course",
      select: "title",
    });
  const totatEnrolledStudent = await Order.find().countDocuments();
  const totatMessage = await Message.find().countDocuments();

  res.status(200).json(
    new ApiResponse(200, "Dashboard all data fetched.", {
      totalStudents,
      totalCourses,
      totalCategories,
      totalLevels,
      totalLanguages,
      totatNewaLetters,
      totatEnrolledStudent,
      totatEnrolledStudentList,
      totatMessage,
    })
  );
});
