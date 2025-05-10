import razorpay from "../../config/razorpay.js";
import asyncHandler from "../../utils/async-handler.js";
import { ApiResponse } from "../../utils/api-response.js";
import { ApiError } from "../../utils/api-error.js";
import Order from "../../models/Order.js";
import Course from "../../models/Course.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

export const createRazorpayOrder = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const { amount, course } = req.body;
  if (!amount || !user || !course) {
    return next(new ApiError(401, "All data are required."));
  }

  const checkCourseAlreadyBuyOrNot = await Order.findOne({ user, course });
  if (checkCourseAlreadyBuyOrNot) {
    return next(new ApiError(400, "You have already enrolled."));
  }

  var options = {
    amount: amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    receipt: `LMS-LEARN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  };
  const order = await razorpay.orders.create(options);
  return res
    .status(200)
    .json(new ApiResponse(200, "Payment order created successfully", order));
});

export const createOrder = asyncHandler(async (req, res, next) => {
  const user = req.user.id;
  const {
    course,
    amount,
    currency,
    paymentMethod,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    receipt,
  } = req.body;

  if (
    !user ||
    !course ||
    !amount ||
    !currency ||
    !paymentMethod ||
    !razorpayPaymentId ||
    !razorpayOrderId ||
    !razorpaySignature ||
    !receipt
  ) {
    return next(new ApiError(403, "All data are required."));
  }
  validatePaymentVerification(
    { order_id: razorpayOrderId, payment_id: razorpayPaymentId },
    razorpaySignature,
    process.env.ROZERPAY_SECERET_KEY
  );
  const newOrder = new Order({
    user,
    course,
    amount,
    currency,
    paymentMethod,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
    receipt,
    paymentStatus: "paid",
  });
  await newOrder.save();

  const courseData = await Course.findById(course);
  if (courseData.students) {
    courseData.students = [{ studentId: user }];
  } else {
    courseData.students.push({ studentId: user });
  }
  await courseData.save();

  return res
    .status(201)
    .json(new ApiResponse(201, "Course enrolled successfully."));
});

export const fetchMyCourseList = asyncHandler(async (req, res, next) => {
  const user = req.user.id;

  if (!user) {
    return next(new ApiResponse(403, "User id is required"));
  }

  const myCourseList = await Order.find({ user })
    .select("course")
    .populate({
      path: "course",
      populate: {
        path: "instructor",
        select: "username",
      },
    });
  return res
    .status(201)
    .json(new ApiResponse(200, "My course fetch successfully.", myCourseList));
});
