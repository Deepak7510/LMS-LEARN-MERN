import axiosInstance from "@/api/axiosInstance";

export const fetchCourseProgressService = async function (courseId) {
  try {
    const response = await axiosInstance.get(
      `/api/student/progress/fetch/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const markCurrentCourseProgressService = async function (
  courseId,
  lectureId
) {
  try {
    const response = await axiosInstance.post(
      `/api/student/progress/mark-lecture-viewed`,
      { courseId, lectureId }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const resetCourseProgressService = async function (courseId) {
  try {
    const response = await axiosInstance.post(`/api/student/progress/reset`, {
      courseId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
