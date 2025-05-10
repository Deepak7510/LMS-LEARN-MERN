import axiosInstance from "@/api/axiosInstance";

export async function createLevel(formDta) {
  try {
    const response = await axiosInstance.post(
      "/api/instructor/level/create",
      formDta
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function deleteLevel(levelId) {
  try {
    const response = await axiosInstance.delete(
      `/api/instructor/level/delete/${levelId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function updateLevel(formData, levelId) {
  try {
    const response = await axiosInstance.put(
      `/api/instructor/level/update/${levelId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function fetchLevel() {
  try {
    const response = await axiosInstance.get("/api/instructor/level/fetch");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
