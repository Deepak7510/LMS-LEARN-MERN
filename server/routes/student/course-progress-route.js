import express from "express";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import {
  fetchCourseProgressDetails,
  markCurrentLectureAsViewed,
  resetCurrentCourseProgress,
} from "../../controllers/student/course-progress-controller.js";

const route = express.Router();

route.get("/fetch/:courseId", isAuthenticated, fetchCourseProgressDetails);
route.post("/mark-lecture-viewed", isAuthenticated, markCurrentLectureAsViewed);
route.post("/reset", isAuthenticated, resetCurrentCourseProgress);

export default route;
