import express from "express";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { checkInstructorOrNot } from "../../helper/checkInstructorOrNot.js";
import {
  createLevel,
  deleteLevel,
  fetchActiveLevel,
  fetchLevel,
  updateLevel,
} from "../../controllers/instructor/level-controller.js";

const route = express.Router();

route.post("/create", isAuthenticated, checkInstructorOrNot, createLevel);
route.delete("/delete/:id", isAuthenticated, checkInstructorOrNot, deleteLevel);
route.put("/update/:id", isAuthenticated, checkInstructorOrNot, updateLevel);
route.get("/fetch", isAuthenticated, checkInstructorOrNot, fetchLevel);
route.get(
  "/fetch-active",
  isAuthenticated,
  checkInstructorOrNot,
  fetchActiveLevel
);

export default route;
