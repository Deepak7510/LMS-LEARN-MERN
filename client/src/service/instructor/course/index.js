import axiosInstance from "@/api/axiosInstance";

export async function createCourseService(formData) {
  try {
    const response = await axiosInstance.post(
      "/api/instructor/course/create",
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function fetchAllCourseService() {
  try {
    const response = await axiosInstance.get("/api/instructor/course/fetch");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function fetchCourseByIdService(courseId) {
  try {
    const response = await axiosInstance.get(
      `/api/instructor/course/fetch/details/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function updateCourseService(formData, id) {
  try {
    const response = await axiosInstance.put(
      `/api/instructor/course/update/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
