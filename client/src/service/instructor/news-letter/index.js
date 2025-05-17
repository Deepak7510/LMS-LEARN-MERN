import axiosInstance from "@/api/axiosInstance";
export async function instructorFetchNewsLetterService() {
  try {
    const response = await axiosInstance.get(
      "/api/instructor/newsletter/fetch"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function instructorDeleteNewsLetterService(getNewsLetterId) {
  try {
    const response = await axiosInstance.delete(
      `/api/instructor/newsletter/delete/${getNewsLetterId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
