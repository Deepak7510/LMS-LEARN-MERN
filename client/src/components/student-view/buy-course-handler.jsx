import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  createOrderService,
  createRazorpayOrderService,
} from "@/service/student/student-order-course";

function BuyCourseHandler({ courseDetails }) {
  const navigate = useNavigate();
  const { authData } = useContext(AuthContext);

  async function handleBuyCourse() {
    if (!authData.isAuthenticated) {
      return toast.error("Please login for by the course");
    }
    const formData = {
      course: courseDetails._id,
      amount: courseDetails.pricing,
      paymentMethod: "Razorpay",
    };
    const razorpayOrderResult = await createRazorpayOrderService({
      amount: courseDetails.pricing,
      course: courseDetails._id,
    });

    if (razorpayOrderResult.success) {
      formData.receipt = razorpayOrderResult.data.receipt;
      formData.currency = razorpayOrderResult.data.currency;
      const options = {
        key: import.meta.env.VITE_ROZERPAY_SECERET_KEY, // Replace with your Razorpay key_id
        amount: razorpayOrderResult.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: razorpayOrderResult.data.currency,
        name: "Acme Corp",
        description: "Course Buy Test Transaction",
        order_id: razorpayOrderResult.data.id, // This is the order_id created in the backend
        handler: async function (response) {
          formData.razorpayPaymentId = response.razorpay_payment_id;
          formData.razorpayOrderId = response.razorpay_order_id;
          formData.razorpaySignature = response.razorpay_signature;
          const createOrderResult = await createOrderService(formData);
          console.log(createOrderResult);
          if (createOrderResult.success) {
            toast.success(createOrderResult.message);
            return navigate("/my-courses");
          } else {
            toast.error(createOrderResult.message);
          }
        },
        prefill: {
          name: authData?.user?.username,
          email: authData?.user?.email,
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } else {
      toast.error(razorpayOrderResult.message);
    }
  }

  return (
    <Button onClick={handleBuyCourse} size={"lg"} className={"w-full"}>
      Buy Now
    </Button>
  );
}

export default BuyCourseHandler;
