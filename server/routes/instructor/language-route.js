import express from "express";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { checkInstructorOrNot } from "../../helper/checkInstructorOrNot.js";

import {
  createLanguage,
  deleteLanguage,
  fetchActiveLanguage,
  fetchLanguage,
  updateLanguage,
} from "../../controllers/instructor/language-controller.js";

const route = express.Router();

route.post("/create", isAuthenticated, checkInstructorOrNot, createLanguage);
route.delete(
  "/delete/:id",
  isAuthenticated,
  checkInstructorOrNot,
  deleteLanguage
);
route.put("/update/:id", isAuthenticated, checkInstructorOrNot, updateLanguage);
route.get("/fetch", isAuthenticated, checkInstructorOrNot, fetchLanguage);
route.get(
  "/fetch-active",
  isAuthenticated,
  checkInstructorOrNot,
  fetchActiveLanguage
);

export default route;
