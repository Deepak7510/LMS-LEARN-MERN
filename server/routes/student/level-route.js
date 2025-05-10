import express from "express";
import { studentFetchActiveLevel } from "../../controllers/student/level-controller.js";
const route = express.Router();
route.get("/fetch-active", studentFetchActiveLevel);

export default route;
