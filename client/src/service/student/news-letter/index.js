import axiosInstance from "@/api/axiosInstance";
export async function instructorCreateNewsLetterService(formData) {
  try {
    const response = await axiosInstance.post(
      "/api/student/newsletter/create",
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
