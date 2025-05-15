import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import handleGlobalError from "./middleware/handle-global-error.js";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URI,
    methods: ["GET", "POST", "DELETE", "PUT", "PETCH"],
    credentials: true,
    allowedHeaders: ["Content-type", "authorization"],
  })
);

// Router-------------------

import AuthRouter from "./routes/auth/auth-route.js";
import MediaRouter from "./routes/media/media-route.js";

import InstructorCategoryRouter from "./routes/instructor/category-route.js";
import InstructorLevelRouter from "./routes/instructor/level-route.js";
import InstructorLanguageRouter from "./routes/instructor/language-route.js";
import InstructorCourseRouter from "./routes/instructor/course-route.js";
import InstructorMessageRouter from "./routes/instructor/message-route.js";
import InstructorNewsLetterRouter from "./routes/instructor/news-letter-route.js";

import StudentCategoryRouter from "./routes/student/category-route.js";
import StudentLevelRouter from "./routes/student/level-route.js";
import StudentLanguageRouter from "./routes/student/language-route.js";
import StudentCourseRouter from "./routes/student/course-route.js";
import StudentCourseOrderRouter from "./routes/student/order-route.js";
import StudentCourseProgressRouter from "./routes/student/course-progress-route.js";
import StudentMessageRouter from "./routes/student/message-route.js";
import StudentNewsLetterRouter from "./routes/student/news-letter-route.js";

app.use("/api/auth", AuthRouter);
app.use("/api/media", MediaRouter);

// instructor -------------------------
app.use("/api/instructor/category", InstructorCategoryRouter);
app.use("/api/instructor/level", InstructorLevelRouter);
app.use("/api/instructor/language", InstructorLanguageRouter);
app.use("/api/instructor/course", InstructorCourseRouter);
app.use("/api/instructor/message", InstructorMessageRouter);
app.use("/api/instructor/newsletter", InstructorNewsLetterRouter);

// Student -------------------------
app.use("/api/student/category", StudentCategoryRouter);
app.use("/api/student/level", StudentLevelRouter);
app.use("/api/student/language", StudentLanguageRouter);
app.use("/api/student/course", StudentCourseRouter);
app.use("/api/student/order", StudentCourseOrderRouter);
app.use("/api/student/progress", StudentCourseProgressRouter);
app.use("/api/student/message", StudentMessageRouter);
app.use("/api/student/newsletter", StudentNewsLetterRouter);

app.use(handleGlobalError);
export default app;
