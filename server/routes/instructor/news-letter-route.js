import express from "express";
import isAuthenticated from "../../middleware/isAuthenticated.js";

import { checkInstructorOrNot } from "../../helper/checkInstructorOrNot.js";
import {
  InstructorDeleteNewsLetter,
  InstructorFetchNewsLetterList,
} from "../../controllers/instructor/news-letter-controller.js";

const route = express.Router();
route.get(
  "/fetch",
  isAuthenticated,
  checkInstructorOrNot,
  InstructorFetchNewsLetterList
);
route.delete(
  "/delete/:newsLetterId",
  isAuthenticated,
  checkInstructorOrNot,
  InstructorDeleteNewsLetter
);

export default route;
