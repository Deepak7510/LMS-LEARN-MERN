import express from "express";
import { studentFetchActiveLanguage } from "../../controllers/student/language-controller.js";
const route = express.Router();
route.get("/fetch-active", studentFetchActiveLanguage);

export default route;
