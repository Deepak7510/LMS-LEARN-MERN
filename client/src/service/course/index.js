import axiosInstance from "@/api/axiosInstance";

export async function createCourse(formData) {
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

export async function fetchAllCourse() {
  try {
    const response = await axiosInstance.get("/api/instructor/course/fetch");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function fetchCourseById(courseId) {
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

export async function updateCourse(formData, id) {
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
