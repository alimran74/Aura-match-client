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
   const { data: biodata, isLoading } = useQuery({
  queryKey: ["biodata", id],
  queryFn: async () => {
    const res = await axios.get(`/biodatas/id/${id}`);
    return res.data;
  },
  enabled: !!id,
});
     
  useEffect(() => {
    // Get payment intent client secret
    axios.post("/create-payment-intent", { amount: 5 }).then((res) => {
      setClientSecret(res.data.clientSecret);
    });
  }, [axios]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !biodata) return;

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
        payment_method: { card: elements.getElement(CardElement) },
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
         name: biodata.name,
        mobile: biodata.mobile,
        contactEmail: biodata.contactEmail,
      };

      try {
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
        disabled={!stripe || !clientSecret || !biodata}
        className="bg-[#f19c79] hover:bg-[#e6855f] text-white px-6 py-2 rounded-lg"
      >
        Pay $5 and Submit Request
      </button>
    </form>
  );
};

export default PaymentForm;
