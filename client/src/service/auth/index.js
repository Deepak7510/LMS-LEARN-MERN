import { default as axiosInstance } from "@/api/axiosInstance";

export async function signupUserService(formData) {
  try {
    const response = await axiosInstance.post("/api/auth/signup", formData);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function signinUserService(formData) {
  try {
    const response = await axiosInstance.post("/api/auth/signin", formData);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function checkAuthService() {
  try {
    const response = await axiosInstance.get("/api/auth/check-auth");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export async function logoutUserService() {
  try {
    const response = await axiosInstance.get("/api/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}
