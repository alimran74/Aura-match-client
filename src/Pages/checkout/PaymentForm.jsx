import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PaymentForm = () => {
  const axios = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const { id } = useParams(); // biodata _id
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load biodata info
  const { data: biodata, isLoading } = useQuery({
    queryKey: ["biodata", id],
    queryFn: async () => {
      const res = await axios.get(`/biodatas/id/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Create payment intent
  useEffect(() => {
    axios
      .post("/create-payment-intent", { amount: 5 })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => {
        console.error("Payment Intent Error:", err);
        toast.error("Failed to initialize payment.");
      });
  }, [axios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !biodata || !clientSecret) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsSubmitting(true);

    try {
      // Step 1: Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        toast.error(error.message);
        setIsSubmitting(false);
        return;
      }

      // Step 2: Confirm payment
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              email: user?.email || "unknown",
            },
          },
        });

      if (confirmError) {
        toast.error(confirmError.message);
        setIsSubmitting(false);
        return;
      }

      // Step 3: Payment successful - save contact request
      if (paymentIntent.status === "succeeded") {
        const contactRequest = {
          biodataId: id,
          requesterEmail: user.email,
          paymentStatus: "paid",
          paymentId: paymentIntent.id,
          status: "pending",
          name: biodata.name,
          mobile: biodata.mobile,
          contactEmail: biodata.contactEmail,
        };

        const res = await axios.post("/contact-requests", contactRequest);
        if (res.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your contact request has been submitted.",
            timer: 2000,
            showConfirmButton: false,
          });
          navigate("/dashboard");
        } else {
          toast.error("Failed to save contact request.");
        }
      }
    } catch (err) {
      toast.error("Something went wrong during the process.");
      console.error(err);
    } finally {
      setIsSubmitting(false); // always reset at end
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
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
        disabled={!stripe || !clientSecret || !biodata || isSubmitting}
        className={`w-full bg-[#f19c79] text-white px-6 py-2 rounded-lg transition duration-300 ${
          isSubmitting
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-[#e6855f]"
        }`}
      >
        {isSubmitting ? "Processing..." : "Pay $5 and Submit Request"}
      </button>
    </form>
  );
};

export default PaymentForm;
