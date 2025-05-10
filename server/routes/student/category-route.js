import express from "express";
import { studentFetchActiveCategory } from "../../controllers/student/category-controller.js";
const route = express.Router();
route.get("/fetch-active", studentFetchActiveCategory);

export default route;
