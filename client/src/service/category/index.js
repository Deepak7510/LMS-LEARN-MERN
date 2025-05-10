import axiosInstance from "@/api/axiosInstance";

export async function createCategory(formDta) {
  try {
    const response = await axiosInstance.post(
      "/api/instructor/category/create",
      formDta
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function deleteCategory(categoryId) {
  try {
    const response = await axiosInstance.delete(
      `/api/instructor/category/delete/${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function updateCategory(formData, categoryId) {
  try {
    const response = await axiosInstance.put(
      `/api/instructor/category/update/${categoryId}`,
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function fetchCategory() {
  try {
    const response = await axiosInstance.get("/api/instructor/category/fetch");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
