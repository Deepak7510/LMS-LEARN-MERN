import express from "express";
import {
  checkCourseBuyOrNot,
  createOrder,
  createRazorpayOrder,
  fetchMyCourseList,
} from "../../controllers/student/order-controller.js";
const route = express.Router();

import isAuthenticated from "../../middleware/isAuthenticated.js";

route.post("/create-razorpay-order", isAuthenticated, createRazorpayOrder);
route.post("/create", isAuthenticated, createOrder);
route.get("/fetch-my-courses", isAuthenticated, fetchMyCourseList);
route.get("/check-buy-status/:courseId", isAuthenticated, checkCourseBuyOrNot);

export default route;
