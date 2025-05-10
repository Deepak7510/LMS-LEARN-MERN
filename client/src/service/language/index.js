import axiosInstance from "@/api/axiosInstance";

export async function createLanguage(formDta) {
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

export async function deleteLanguage(languageId) {
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

export async function updateLanguage(formData, languageId) {
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

export async function fetchLanguage() {
  try {
    const response = await axiosInstance.get("/api/instructor/language/fetch");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
