import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
const razorpay = new Razorpay({
  key_id: process.env.ROZERPAY_TEST_KEY,
  key_secret: process.env.ROZERPAY_SECERET_KEY,
});

export default razorpay;
