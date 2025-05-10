import axiosInstance from "@/api/axiosInstance";

export async function UploadMedia(formData) {
  try {
    const response = await axiosInstance.post("/api/media/upload", formData);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export async function deleteMedia(public_id) {
  try {
    const response = await axiosInstance.delete(
      `/api/media/delete/${public_id}`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}
