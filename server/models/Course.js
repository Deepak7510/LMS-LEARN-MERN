import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    instructor: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    level: {
      type: mongoose.Types.ObjectId,
      ref: "Level",
      required: true,
    },
    primaryLanguage: {
      type: mongoose.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    pricing: {
      type: Number,
      required: true,
    },
    objectives: {
      type: String,
      required: true,
    },
    welcomemessage: {
      type: String,
      required: true,
    },
    students: [
      {
        studentId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    image: {
      image_url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },

    curriculum: [
      {
        title: {
          type: String,
          required: true,
        },
        freePreview: {
          type: Boolean,
          required: true,
        },
        videoUrl: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    isPublised: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
