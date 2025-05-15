import axiosInstance from "@/api/axiosInstance";

export const createRazorpayOrderService = async function (formData) {
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

export const createOrderService = async function (formData) {
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

export const fetchMyCourseSevice = async function () {
  try {
    const response = await axiosInstance.get(
      "/api/student/order/fetch-my-courses"
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export const checkCurseBuyStatusService = async function (courseId) {
  try {
    const response = await axiosInstance.get(
      `/api/student/order/check-buy-status/${courseId}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
