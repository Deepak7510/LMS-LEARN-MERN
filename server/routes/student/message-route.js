import express from "express";
import { createMessage } from "../../controllers/student/message-controller.js";

const route = express.Router();
route.post("/create", createMessage);

export default route;
