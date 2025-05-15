import express from "express";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import {
  deleteMessage,
  fetchMessageList,
} from "../../controllers/instructor/message-controller.js";
import { checkInstructorOrNot } from "../../helper/checkInstructorOrNot.js";

const route = express.Router();
route.get("/fetch", isAuthenticated, checkInstructorOrNot, fetchMessageList);
route.delete(
  "/delete/:messageId",
  isAuthenticated,
  checkInstructorOrNot,
  deleteMessage
);

export default route;
