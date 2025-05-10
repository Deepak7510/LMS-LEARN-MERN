import express from "express";
import {
  fetchFilteCourse,
  studentFetchAllCourse,
  studentFetchCourseById,
} from "../../controllers/student/course-controller.js";
const route = express.Router();

route.get("/fetch", studentFetchAllCourse);
route.get("/fetch/:courseId", studentFetchCourseById);
route.get("/fetch-filter", fetchFilteCourse);

export default route;
