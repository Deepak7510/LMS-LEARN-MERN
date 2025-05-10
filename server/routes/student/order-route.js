import express from "express";
import {
  createOrder,
  createRazorpayOrder,
  fetchMyCourseList,
} from "../../controllers/student/order-controller.js";
const route = express.Router();

import isAuthenticated from "../../middleware/isAuthenticated.js";

route.post("/create-razorpay-order", isAuthenticated, createRazorpayOrder);
route.post("/create", isAuthenticated, createOrder);
route.post("/fetch-my-courses", isAuthenticated, fetchMyCourseList);

export default route;
