import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const axios = useAxios();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { id } = useParams(); // biodata _id
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Get payment intent client secret
    axios.post("/create-payment-intent", { amount: 5 }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      toast.error(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // Save contact request to backend
      const contactRequest = {
        biodataId: id,
        requesterEmail: user.email,
        paymentStatus: "paid",
        paymentId: paymentIntent.id,
        status: "pending",
      };

      try {
        const res = await axios.post("/contact-requests", contactRequest);
        if (res.data.insertedId) {
          Swal.fire({
  icon: "success",
  title: "Payment Successful!",
  text: "Your contact request has been submitted.",
  timer: 2000,
  showConfirmButton: false,
}).then(() => {
  navigate("/dashboard");
});
        } else {
          toast.error("Failed to save contact request.");
        }
      } catch (err) {
        toast.error("Something went wrong while saving request.");
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement
        className="border p-3 rounded"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#333",
            },
          },
        }}
      />
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="bg-[#f19c79] hover:bg-[#e6855f] text-white px-6 py-2 rounded-lg"
      >
        Pay $5 and Submit Request
      </button>
    </form>
  );
};

export default PaymentForm;
