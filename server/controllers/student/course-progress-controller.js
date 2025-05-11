// get course progress

import Course from "../../models/Course.js";
import CourseProgress from "../../models/CourseProgress.js";
import Order from "../../models/Order.js";
import { ApiError } from "../../utils/api-error.js";
import { ApiResponse } from "../../utils/api-response.js";
import asyncHandler from "../../utils/async-handler.js";

export const markCurrentLectureAsViewed = asyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const { courseId, lectureId } = req.body;

    let progress = await CourseProgress.findOne({ userId, courseId });

    if (!progress) {
      progress = new CourseProgress({
        userId,
        courseId,
        lectureProgress: [
          {
            lectureId,
            viewed: true,
            dateViewed: new Date(),
          },
        ],
      });

      await progress.save();
    } else {
      const lectureProgress = progress.lectureProgress.find(
        (item) => item.lectureId.toString() === lectureId.toString()
      );

      if (lectureProgress) {
        lectureProgress.viewed = true;
        lectureProgress.dateViewed = new Date();
      } else {
        progress.lectureProgress.push({
          lectureId,
          viewed: true,
          dateViewed: new Date(),
        });
      }
      await progress.save();
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new ApiError(404, "Course not found."));
    }

    const allLectureViewed =
      progress.lectureProgress.length === course.curriculum.length &&
      progress.lectureProgress.every((item) => item.viewed);
    if (allLectureViewed) {
      progress.completed = true;
      progress.complitionDate = new Date();
      await progress.save();
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Lecture marked as viewed", progress));
  }
);

export const fetchCourseProgressDetails = asyncHandler(
  async (req, res, next) => {
    const { courseId } = req.params;
    const userId = req.user.id;

    const checkCourseBuyOrNot = await Order.findOne({
      user: userId,
      course: courseId,
    });

    if (!checkCourseBuyOrNot) {
      return res.status(403).json(
        new ApiResponse(403, "Access denied. Course not purchased.", {
          isBuy: false,
        })
      );
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json(new ApiError(404, "Course not found."));
    }

    const currentUserCourseProgress = await CourseProgress.findOne({
      userId,
      courseId,
    });

    if (
      !currentUserCourseProgress ||
      currentUserCourseProgress.lectureProgress.length === 0
    ) {
      return res.status(200).json(
        new ApiResponse(200, "No progress data available yet.", {
          courseDetails: course,
          progress: [],
          isBuy: true,
        })
      );
    }

    return res.status(200).json(
      new ApiResponse(200, "Course progress retrieved successfully.", {
        courseDetails: course,
        progress: currentUserCourseProgress.lectureProgress,
        complated: currentUserCourseProgress.completed,
        isBuy: true,
        complationDate: currentUserCourseProgress.complitionDate,
      })
    );
  }
);

export const resetCurrentCourseProgress = asyncHandler(
  async (req, res, next) => {
    const userId = req.user.id;
    const { courseId } = req.body;
    const progress = await CourseProgress.findOne({ userId, courseId });
    if (!progress) {
      return next(new ApiError(404, "Course not found."));
    }
    progress.lectureProgress = [];
    progress.completed = false;
    progress.complitionDate = null;

    await progress.save();
    res
      .status(200)
      .json(
        new ApiResponse(200, "Course progress reset successfully.", progress)
      );
  }
);

// reset progress
