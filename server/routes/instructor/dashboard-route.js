import express from "express";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { checkInstructorOrNot } from "../../helper/checkInstructorOrNot.js";
import { fetchDashboardAllData } from "../../controllers/instructor/dashboard-controller.js";

const route = express.Router();

route.get(
  "/fetch",
  isAuthenticated,
  checkInstructorOrNot,
  fetchDashboardAllData
);

export default route;
