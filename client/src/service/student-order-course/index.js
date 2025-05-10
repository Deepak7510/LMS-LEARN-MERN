import axiosInstance from "@/api/axiosInstance";

export const createRazorpayOrder = async function (formData) {
  try {
    const response = await axiosInstance.post(
      "/api/student/order/create-razorpay-order",
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const createOrder = async function (formData) {
  try {
    const response = await axiosInstance.post(
      "/api/student/order/create",
      formData
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const fetchMyCourse = async function () {
  try {
    const response = await axiosInstance.post(
      "/api/student/order/fetch-my-courses"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
