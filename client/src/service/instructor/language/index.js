import axiosInstance from "@/api/axiosInstance";

export async function createLanguageService(formDta) {
  try {
    const response = await axiosInstance.post(
      "/api/instructor/language/create",
      formDta
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function deleteLanguageService(languageId) {
  try {
    const response = await axiosInstance.delete(
      `/api/instructor/language/delete/${languageId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function updateLanguageService(formData, languageId) {
  try {
    const response = await axiosInstance.put(
      `/api/instructor/language/update/${languageId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function fetchLanguageService() {
  try {
    const response = await axiosInstance.get("/api/instructor/language/fetch");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
