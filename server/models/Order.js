import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
    },
    razorpaySignature: {
      type: String,
      required: true,
    },
    receipt: {
      type: String,
    },
    paymentStatus: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
