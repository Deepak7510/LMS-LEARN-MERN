import express from "express";
import { studentCreateNewsLetter } from "../../controllers/student/news-letter-controller.js";

const route = express.Router();
route.post("/create", studentCreateNewsLetter);

export default route;
