import express from "express";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { checkInstructorOrNot } from "../../helper/checkInstructorOrNot.js";
import {
  createCourse,
  deleteCourse,
  fetchCourse,
  fetchCourseById,
  updateCourse,
} from "../../controllers/instructor/course-controller.js";

const route = express.Router();

route.post("/create", isAuthenticated, checkInstructorOrNot, createCourse);
route.get("/fetch", fetchCourse);
route.get("/fetch/details/:courseId", fetchCourseById);
route.put(
  "/update/:courseId",
  isAuthenticated,
  checkInstructorOrNot,
  updateCourse
);
route.delete(
  "/delete/:courseId",
  isAuthenticated,
  checkInstructorOrNot,
  deleteCourse
);

export default route;
