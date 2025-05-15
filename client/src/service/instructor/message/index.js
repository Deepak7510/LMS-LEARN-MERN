import axiosInstance from "@/api/axiosInstance";

export async function instructorFetchMessageService() {
  try {
    const response = await axiosInstance.get("/api/instructor/message/fetch");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function instructorDeleteMessageService(messageId) {
  try {
    const response = await axiosInstance.delete(
      `/api/instructor/message/delete/${messageId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
