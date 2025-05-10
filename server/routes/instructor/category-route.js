import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchActiveCategory,
  fetchCategory,
  updateCategory,
} from "../../controllers/instructor/category-controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { checkInstructorOrNot } from "../../helper/checkInstructorOrNot.js";

const route = express.Router();

route.post("/create", isAuthenticated, checkInstructorOrNot, createCategory);
route.delete(
  "/delete/:id",
  isAuthenticated,
  checkInstructorOrNot,
  deleteCategory
);
route.put("/update/:id", isAuthenticated, checkInstructorOrNot, updateCategory);
route.get("/fetch", isAuthenticated, checkInstructorOrNot, fetchCategory);
route.get(
  "/fetch-active",
  isAuthenticated,
  checkInstructorOrNot,
  fetchActiveCategory
);

export default route;
