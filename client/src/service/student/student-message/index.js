import axiosInstance from "@/api/axiosInstance";

export async function createMessageService(formData) {
  try {
    const response = await axiosInstance.post(
      "/api/student/message/create",
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
