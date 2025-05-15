import axiosInstance from "@/api/axiosInstance";

export async function fetchFilterCourseService(filter, sort) {
  try {
    const query = new URLSearchParams({
      ...filter,
      sortBy: sort,
    });
    const response = await axiosInstance.get(
      `/api/student/course/fetch-filter?${query}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function fetchCourseDetailsService(courseId) {
  try {
    const response = await axiosInstance.get(
      `/api/student/course/fetch/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
