import mongoose from "mongoose";

const lectureProgressSchema = new mongoose.Schema({
  lectureId: String,
  viewed: Boolean,
  dateViewed: Date,
});

const courseProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  completed: Boolean,
  complitionDate: Date,
  lectureProgress: [lectureProgressSchema],
});

const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
export default CourseProgress;
